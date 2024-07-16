import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import {
  BASE_URL,
  CUSTOMER_ADD,
  CUSTOMER_DELETE,
  CUSTOMER_LIST,
} from '../../../constants/api.constants'
import {getAuth, setAuth} from '../../../modules/auth'
import {User, UsersQueryResponse} from './_models'

const auth = getAuth()

function getLocalAccessToken() {
  return auth && auth.user ? auth.user.access_token : ''
}
function getLocalRefreshToken() {
  return auth && auth.user ? auth.user.refresh_token : ''
}

axios.interceptors.request.use(
  (config: any) => {
    const token = getLocalAccessToken()

    if (token) {
      config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (res: any) => {
    // // console.log("resdd", res)
    const originalConfig: any = res.config
    if (res?.data.status_code === 602 && !originalConfig._retry) {
      originalConfig._retry = true
      try {
        const rs = await refreshToken()
        // console.log('rs', rs)
        if (rs.data.status_code === 200) {
          const {access_token} = rs.data

          auth.user.access_token = access_token
          setAuth(auth)

          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        }
      } catch (_error: any) {
        // console.log('_error', _error)
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data)
        }
        return Promise.reject(_error)
      }
    } else {
      return res
    }
    // return res;
  },
  async (err) => {
    // // console.log("err", err)
    const originalConfig = err.config
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const rs = await refreshToken()

          const {access_token} = rs.data
          auth.user.access_token = access_token
          setAuth(auth)

          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }
          return Promise.reject(_error)
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data)
      }
    }
    return Promise.reject(err)
  }
)

function refreshToken() {
  return axios.post(`${BASE_URL}/token/refresh`, {
    refresh_token: getLocalRefreshToken(),
  })
}
const getUsers = (query: any): Promise<UsersQueryResponse> => {
  return axios({
    method: 'get',
    url: `${CUSTOMER_LIST}?${query}`,
  }).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(CUSTOMER_ADD, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  return axios({
    method: 'delete',
    url: `${CUSTOMER_DELETE}/${userId}`,
  }).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) =>
    axios({
      method: 'delete',
      url: `${CUSTOMER_DELETE}/${id}`,
    })
  )
  return axios.all(requests).then(() => {})
}

export {createUser, deleteSelectedUsers, deleteUser, getUsers}
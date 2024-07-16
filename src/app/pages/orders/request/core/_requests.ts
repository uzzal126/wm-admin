import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {BASE_URL, ORDER_REQUEST_DETAILS, REQUEST_ORDER} from '../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../modules/auth'
import {TableModal, TableModalsQueryResponse} from './_models'

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

const getUsers = (query: string): Promise<TableModalsQueryResponse> => {
  return axios({
    method: 'get',
    url: `${REQUEST_ORDER}?${query}`,
  }).then((d: AxiosResponse<TableModalsQueryResponse>) => d.data)
}

const getRequestById = (id: ID): Promise<TableModal | undefined> => {
  return axios({
    method: 'get',
    url: `${ORDER_REQUEST_DETAILS}/${id}`,
  })
    .then((response: any) => response.data)
    .then((response: any) => response)
}
const getQueryRequest = (query: any): any => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/${query}`,
  })
    .then((response: any) => response.data)
    .then((response: any) => response)
}

const createUser = (user: TableModal): Promise<TableModal | undefined> => {
  return axios
    .put(REQUEST_ORDER, user)
    .then((response: AxiosResponse<Response<TableModal>>) => response.data)
    .then((response: Response<TableModal>) => response.data)
}

const updateUser = (user: TableModal): Promise<TableModal | undefined> => {
  return axios
    .post(`${REQUEST_ORDER}/${user.id}`, user)
    .then((response: AxiosResponse<Response<TableModal>>) => response.data)
    .then((response: Response<TableModal>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${REQUEST_ORDER}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${REQUEST_ORDER}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  createUser,
  deleteSelectedUsers,
  deleteUser,
  getQueryRequest,
  getRequestById,
  getUsers,
  updateUser,
}

import axios, {AxiosResponse} from 'axios'
// import {setupCache} from 'axios-cache-adapter'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../../modules/auth'
import {Comment, CommentsQueryResponse} from './_models'

const USER_URL = `${BASE_URL}/appearance/blog/list`
const GET_COMMENTS = `${BASE_URL}/sms/settings`
const DELETE_COMMENT = `${BASE_URL}/sms/settings`
const UPDATE_USER = `${BASE_URL}/sms/settings`

const auth = getAuth()

function getLocalAccessToken() {
  return auth && auth.user ? auth.user.access_token : ''
}
function getLocalRefreshToken() {
  return auth && auth.user ? auth.user.refresh_token : ''
}
// export const cache = setupCache({maxAge: 15 * 60 * 100, exclude: {query: false}})

axios.interceptors.request.use(
  (config: any) => {
    const token = getLocalAccessToken()
    // config.adapter = cache.adapter

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
const getUsers = (query: any): Promise<CommentsQueryResponse> => {
  return axios({
    method: 'get',
    url: `${GET_COMMENTS}?${query}`,
  }).then((d: AxiosResponse<CommentsQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Comment | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Comment>>) => response.data)
    .then((response: Response<Comment>) => response.data)
}

const createUser = (user: Comment): Promise<Comment | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<Comment>>) => response.data)
    .then((response: Response<Comment>) => response.data)
}

const updateUser = (data: any): Promise<any | undefined> => {
  return axios
    .put(`${UPDATE_USER}/${data?.id}`, {settings: data})
    .then((response: AxiosResponse<Response<Comment>>) => response.data)
    .then((response: Response<Comment>) => response.data)
}

const deleteUser = async (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'delete',
    url: `${DELETE_COMMENT}/${userId}`,
  })
  return data
}

const restoreUser = async (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'put',
    url: `${DELETE_COMMENT}/${userId}`,
  })
  return data
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) =>
    axios({
      method: 'delete',
      url: `${DELETE_COMMENT}/${id}`,
    })
  )
  return axios.all(requests).then(() => {})
}
const updateAllUsers = (settings: Array<any>): Promise<void> => {
  const requests = settings.map((setting) =>
    axios({
      method: 'put',
      url: `${UPDATE_USER}/${setting?.id}`,
      data: {
        settings: setting,
      },
    })
  )
  return axios.all(requests).then(() => {})
}

export {
  createUser,
  deleteSelectedUsers,
  deleteUser,
  getUserById,
  getUsers,
  restoreUser,
  updateAllUsers,
  updateUser,
}

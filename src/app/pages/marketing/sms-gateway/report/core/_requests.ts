import axios, {AxiosResponse} from 'axios'
// import {setupCache} from 'axios-cache-adapter'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../../modules/auth'
import {Bundle, BundlesQueryResponse} from './_models'

const USER_URL = `${BASE_URL}/sms/create/bundle-request`
const GET_TEMPLATES = `${BASE_URL}/sms/report/redeem`
const GET_TEMPLATE = `${BASE_URL}/sms/template`
const DELETE_TEMPLATE = `${BASE_URL}/sms/delete/template`
const APPROVE_REQUEST = `${BASE_URL}/sms/approve/bundle-request`
const CANCEL_REQUEST = `${BASE_URL}/sms/decline/bundle-request`
const GET_REPORT_SUMMARY = `${BASE_URL}/sms/report/redeem/summary`

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
const getUsers = (query: any): Promise<BundlesQueryResponse> => {
  return axios({
    method: 'get',
    url: `${GET_TEMPLATES}?${query}`,
  }).then((d: AxiosResponse<BundlesQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Bundle | undefined> => {
  return axios
    .get(`${GET_TEMPLATES}/${id}`)
    .then((response: AxiosResponse<Response<Bundle>>) => response.data)
    .then((response: Response<Bundle>) => response.data)
}

const getBalanceReportSummary = (): Promise<Bundle | undefined> => {
  return axios
    .get(`${GET_REPORT_SUMMARY}`)
    .then((response: AxiosResponse<Response<Bundle>>) => response.data)
    .then((response: Response<Bundle>) => response.data)
}

const createUser = (user: Bundle): Promise<any> => {
  return axios.post(USER_URL, user).then((response: AxiosResponse<any>) => response.data)
}

const updateUser = (user: Bundle): Promise<any> => {
  return axios
    .put(`${GET_TEMPLATES}/${user.id}`, user)
    .then((response: AxiosResponse<any>) => response.data)
}

const approveRequest = (user: Bundle): Promise<any> => {
  return axios
    .put(`${APPROVE_REQUEST}/${user.id}`, user)
    .then((response: AxiosResponse<any>) => response.data)
}
const cancelRequest = (user: Bundle): Promise<any> => {
  return axios
    .put(`${CANCEL_REQUEST}/${user.id}`, user)
    .then((response: AxiosResponse<any>) => response.data)
}

const approveSelectedRequests = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) =>
    axios({
      method: 'put',
      url: `${APPROVE_REQUEST}/${id}`,
    })
  )
  return axios.all(requests).then(() => {})
}

const deleteUser = async (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'delete',
    url: `${GET_TEMPLATES}/${userId}`,
  })
  return data
}

const restoreUser = async (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'put',
    url: `${DELETE_TEMPLATE}/${userId}`,
  })
  return data
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) =>
    axios({
      method: 'delete',
      url: `${GET_TEMPLATES}/${id}`,
    })
  )
  return axios.all(requests).then(() => {})
}

export {
  approveRequest,
  approveSelectedRequests,
  cancelRequest,
  createUser,
  deleteSelectedUsers,
  deleteUser,
  getBalanceReportSummary,
  getUserById,
  getUsers,
  restoreUser,
  updateUser,
}

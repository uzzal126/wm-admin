import axios, {AxiosResponse} from 'axios'
// import {setupCache} from 'axios-cache-adapter'
import {ID, Response} from '../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../modules/auth'
import {Payment, PaymentsQueryResponse} from './_models'

const USER_URL = `${BASE_URL}/sms/create/template`
const GET_TEMPLATES = `${BASE_URL}/webmanza-payment/payment-notification-list-webmanza`
const GET_TEMPLATE = `${BASE_URL}/sms/template`
const DELETE_TEMPLATE = `${BASE_URL}/sms/delete/template`
const REFUND_PAYMENT = `${BASE_URL}/webmanza-payment/refund-request`

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
const getUsers = (query: any): Promise<PaymentsQueryResponse> => {
  return axios({
    method: 'get',
    url: `${GET_TEMPLATES}?${query}`,
  }).then((d: AxiosResponse<PaymentsQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Payment | undefined> => {
  return axios
    .get(`${GET_TEMPLATE}/${id}`)
    .then((response: AxiosResponse<Response<Payment>>) => response.data)
    .then((response: Response<Payment>) => response.data)
}

const createUser = (user: Payment): Promise<any> => {
  return axios.post(USER_URL, user).then((response: AxiosResponse<any>) => response.data)
}

const updateUser = (user: Payment): Promise<any> => {
  return axios
    .post(`${GET_TEMPLATE}/${user.id}`, user)
    .then((response: AxiosResponse<any>) => response.data)
}

const deleteUser = async (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'delete',
    url: `${DELETE_TEMPLATE}/${userId}`,
  })
  return data
}

const refundUser = async (user: Payment): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'post',
    url: `${REFUND_PAYMENT}`,
    data: {...user},
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
      url: `${DELETE_TEMPLATE}/${id}`,
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
  refundUser,
  restoreUser,
  updateUser,
}

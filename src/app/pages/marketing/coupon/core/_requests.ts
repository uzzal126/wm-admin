import axios, {AxiosResponse} from 'axios'
import {toast} from 'react-toastify'
import {ID, Response} from '../../../../../_metronic/helpers'
import {
  GET_COUPON,
  GET_COUPON_DETAILS_NEW,
  POST_ADD_COUPON_NEW,
  POST_DELETE_COUPON_NEW,
  PUT_UPDATE_COUPON_NEW,
  TOKEN_REFRESH,
} from '../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../modules/auth'
import {omitByKeys} from '../../../../modules/helper/misc'
import {Coupon, CouponsQueryResponse} from './_models'

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
        // console.log("rs", rs)
        if (rs.data.status_code === 200) {
          const {access_token} = rs.data

          auth.user.access_token = access_token
          setAuth(auth)

          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        }
      } catch (_error: any) {
        // console.log("_error", _error)
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
  return axios.post(TOKEN_REFRESH, {
    refresh_token: getLocalRefreshToken(),
  })
}

const getUsers = (query: any): Promise<CouponsQueryResponse> => {
  return axios({
    method: 'get',
    url: `${GET_COUPON}?${query}`,
  }).then((d: AxiosResponse<CouponsQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Coupon | undefined> => {
  return axios
    .get(`${GET_COUPON_DETAILS_NEW}/${id}`)
    .then((response: AxiosResponse<Response<Coupon>>) => response.data)
    .then((response: Response<Coupon>) => response.data)
}

const createCoupon = (data: Coupon): Promise<Coupon | undefined> => {
  return axios
    .post(POST_ADD_COUPON_NEW, data)
    .then((response: AxiosResponse<Response<Coupon>>) => response.data)
    .then((response: any) => {
      if (response?.success) {
        toast.success('Coupon added !')
      }
      if (!response?.success) {
        toast.error(response?.message)
      }
      return response
    })
}

const updateCoupon = (data: Coupon): Promise<Coupon | undefined> => {
  const reqBody = {
    ...omitByKeys(data, ['id', 'coupon_id', 'total_discount', 'total_order']),
  }
  return axios
    .put(`${PUT_UPDATE_COUPON_NEW}/${data?.id}`, reqBody)
    .then((response: AxiosResponse<Response<Coupon>>) => response.data)
    .then((response: any) => {
      if (response?.success) {
        toast.success('Coupon updated !')
      }
      if (!response?.success) {
        toast.error(response?.message)
      }
      return response
    })
}

const deleteCoupon = (id: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  return axios({
    method: 'delete',
    url: `${POST_DELETE_COUPON_NEW}/${id}`,
    data: {
      coupon_id: id,
    },
  }).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) =>
    axios({
      method: 'delete',
      url: `${POST_DELETE_COUPON_NEW}/${id}`,
      data: {
        coupon_id: id,
      },
    })
  )
  return axios.all(requests).then(() => {})
}

export {createCoupon, deleteCoupon, deleteSelectedUsers, getUserById, getUsers, updateCoupon}

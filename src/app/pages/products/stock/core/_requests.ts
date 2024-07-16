import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../modules/auth'
import {StockModal, StockModalQueryResponse} from './_models'

const GET_PRODUCT = `${BASE_URL}/product/stock/list`
const UPDATE_URL = `${BASE_URL}/product/stock/update`
const HISTORY_URL = `${BASE_URL}/product/stock/history`

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

const getStocks = (query: any): Promise<StockModalQueryResponse> => {
  return axios({
    method: 'get',
    url: `${GET_PRODUCT}?${query}`,
  }).then((d: AxiosResponse<StockModalQueryResponse>) => d.data)
}

const getStockHistory = (data: any): Promise<StockModalQueryResponse> => {
  return axios({
    method: 'post',
    url: `${HISTORY_URL}`,
    data: {
      ...data,
    },
  }).then((d: AxiosResponse<StockModalQueryResponse>) => d.data)
}

const updateStock = async (data: any) => {
  return await axios({
    method: 'post',
    url: `${UPDATE_URL}`,
    data: {
      ...data,
    },
  })
    .then((response: AxiosResponse<Response<StockModal>>) => response.data)
    .then((response: Response<StockModal>) => response)
}

export {getStockHistory, getStocks, updateStock}

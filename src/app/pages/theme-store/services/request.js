import axios from 'axios'
import { BASE_URL, THEME_URL } from '../../../constants/api.constants'
import { getAuth, setAuth } from '../../../modules/auth'

const auth = getAuth()

function getLocalAccessToken() {
  return auth && auth.user ? auth.user.access_token : ''
}
function getLocalRefreshToken() {
  return auth && auth.user ? auth.user.refresh_token : ''
}

axios.interceptors.request.use(
  (config) => {
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
  async (res) => {
    // // console.log("resdd", res)
    const originalConfig = res.config
    if (res?.data.status_code === 602 && !originalConfig._retry) {
      originalConfig._retry = true
      try {
        const rs = await refreshToken()
        // console.log("rs", rs)
        if (rs.data.status_code === 200) {
          const { access_token } = rs.data

          auth.user.access_token = access_token
          setAuth(auth)

          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        }
      } catch (_error) {
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
          const { access_token } = rs.data

          auth.user.access_token = access_token
          setAuth(auth)

          axios.defaults.headers['x-access-token'] = access_token
          return axios(originalConfig)
        } catch (_error) {
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

export const getThemes = async () => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: THEME_URL,
    })

    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}
export const queryRequestPost = async (url, data) => {
  try {
    const { data: response } = await axios({
      method: 'POST',
      url: url,
      data: data,
    })
    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}
export const queryRequestGet = async (url) => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: url,
    })
    return response
  } catch (err) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    }
  }
}

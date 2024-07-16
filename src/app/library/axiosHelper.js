import {BASE_URL} from '../constants/api.constants'
import {setAuth} from '../modules/auth'

export async function axiosHelper(axios, auth, token, refresh) {
  // console.log("refresh", refresh, token)

  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['x-access-token'] = `${token}`
      } else {
        config.headers['x-access-token'] = ''
      }

      return config
    },
    (err) => Promise.reject(err)
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
            const {access_token} = rs.data
            auth.user.access_token = access_token
            setAuth(auth)
            axios.defaults.headers['x-access-token'] = access_token
            // console.log("config-oup", axios.defaults.headers)
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
            const {access_token} = rs.data

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

  async function refreshToken() {
    return await axios.post(`${BASE_URL}/token/refresh`, {
      refresh_token: refresh,
    })
  }

  // return axios
}

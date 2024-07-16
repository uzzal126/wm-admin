import axios, {AxiosResponse} from 'axios'
// import {setupCache} from 'axios-cache-adapter'
import {ID, Response} from '../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../modules/auth'
import {Job, JobsQueryResponse} from './_models'

const USER_URL = `${BASE_URL}/appearance/job`
const GET_JOB = `${BASE_URL}/appearance/job`
const DELETE_JOB = `${BASE_URL}/appearance/job`

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
const getUsers = (query: any): Promise<JobsQueryResponse> => {
  return axios({
    method: 'get',
    url: `${GET_JOB}?${query}`,
  }).then((d: AxiosResponse<JobsQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Job | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Job>>) => response.data)
    .then((response: Response<Job>) => response.data)
}

const createUser = (user: Job): Promise<Job | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<Job>>) => response.data)
    .then((response: Response<Job>) => response.data)
}

const updateUser = (user: Job): Promise<Job | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Job>>) => response.data)
    .then((response: Response<Job>) => response.data)
}

const deleteUser = async (userId: ID): Promise<void> => {
  // return axios.delete(`${USER_URL}/${userId}`).then(() => { })
  const {data} = await axios({
    method: 'delete',
    url: `${DELETE_JOB}/${userId}`,
  })
  return data
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) =>
    axios({
      method: 'delete',
      url: `${DELETE_JOB}/${id}`,
    })
  )
  return axios.all(requests).then(() => {})
}

export {createUser, deleteSelectedUsers, deleteUser, getUserById, getUsers, updateUser}

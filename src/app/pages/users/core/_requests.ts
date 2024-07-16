import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_metronic/helpers'
import {BASE_URL} from '../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'
import {User, UsersQueryResponse} from './_models'

const USER_URL = `${BASE_URL}/auth/users`

const getUsers = (query: any): Promise<UsersQueryResponse> => {
  return getQueryRequest(`${USER_URL}?${query}`)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return queryRequest(`${USER_URL}/${userId}`, {}, 'delete')

  // axios({
  //   method: 'post',
  //   url: `${DELETE_PRODUCT}`,
  //   data: {
  //     cstmr_id: userId,
  //   },
  // }).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => queryRequest(`${USER_URL}/${id}`, {}, 'delete'))
  return axios.all(requests).then(() => {})
}

export {createUser, deleteSelectedUsers, deleteUser, getUserById, getUsers, updateUser}

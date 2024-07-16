import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {CUSTOMER_CARE_MUTATION, GET_STP_LIST} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {STP, STPsQueryResponse} from './_models'

const USER_URL = `${CUSTOMER_CARE_MUTATION}`

const getUsers = (query: any): Promise<STPsQueryResponse> => {
  return getQueryRequest(`${GET_STP_LIST}?${query}`)
}

const getUserById = (id: ID): Promise<STP | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<STP>>) => response.data)
    .then((response: Response<STP>) => response.data)
}

const createUser = (user: STP): Promise<any> => {
  return axios
    .put(`${USER_URL}/7421`, user)
    .then((response: AxiosResponse<Response<STP>>) => response.data)
  // .then((response: Response<STP>) => response.data)
}

const updateUser = (user: STP): Promise<any> => {
  return axios
    .put(`${USER_URL}/${user?.setting_data?.setting_id}`, user)
    .then((response: AxiosResponse<Response<STP>>) => response.data)
  // return axios
  //   .post(`${USER_URL}/${user.id}`, user)
  //   .then((response: AxiosResponse<Response<STP>>) => response.data)
  // .then((response: Response<STP>) => response.data)
}

const deleteUser = (user: STP): Promise<any> => {
  return axios
    .put(`${USER_URL}/${user?.setting_data?.setting_id}`, user)
    .then((response: AxiosResponse<Response<STP>>) => response.data)
  // return axios
  //   .post(`${USER_URL}/${user.id}`, user)
  //   .then((response: AxiosResponse<Response<STP>>) => response.data)
  // .then((response: Response<STP>) => response.data)
}
const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => queryRequest(`${USER_URL}/${id}`, {}, 'delete'))
  return axios.all(requests).then(() => {})
}

export {createUser, deleteSelectedUsers, deleteUser, getUserById, getUsers, updateUser}

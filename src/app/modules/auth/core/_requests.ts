import axios from 'axios'
import {FORGOT_PASSWORD_URL, REGISTER_URL, TOKEN_REFRESH} from '../../../constants/api.constants'
import {UserModel} from './_models'

// Server should return AuthModel

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(FORGOT_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(TOKEN_REFRESH, {
    refresh_token: token,
  })
}

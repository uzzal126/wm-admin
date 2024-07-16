export interface AuthModel {
  access_token: string
  user: any
  shop_info: any
  expired: any
  refresh_token?: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserModel {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  fullname?: string
  phone?: string
  roles?: Array<number>
  avatar?: String
  address?: UserAddressModel
}

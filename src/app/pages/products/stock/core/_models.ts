import {ID, Response} from '../../../../../_metronic/helpers'

export type StockModal = {
  id?: ID
  pid?: string
  name?: string
  slug?: string
  thumbnail?: string
  variants?: any
  total_added?: string
  sold?: string
  committed?: string
  stock?: string
}

export type Attributes = {
  id?: ID
  cost_price?: string
  selling_price?: string
  weight_class_id?: string
  weight?: string
  width?: string
  height?: string
  total_added?: string
  sold?: string
  committed?: string
  stock?: string
  thumbnail_url?: string
  length?: string
  option?: string
  value?: string
  option2?: string
  value2?: string
  option3?: string
  value3?: string
}

export type StockModalQueryResponse = Response<Array<StockModal>>
export type AttributesQueryResponse = Array<Attributes>

export const initialProduct: StockModal = {
  thumbnail: '',
  name: '',
}

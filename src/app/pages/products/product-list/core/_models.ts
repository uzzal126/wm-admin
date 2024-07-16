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
}

export type Product = {
  id?: ID
  name?: string
  prod_id?: string
  attributes?: string
  pd_category?: string
  status?: string
  total_added?: number
  sold?: number
  committed?: number
  date_available?: string
  thumbnail?: any
  categories?: any
  variant_count?: any
  sku?: string
  in_stock?: string
  product_status?: any
  created_at?: string
}

export type ProductsQueryResponse = Response<Array<Product>>

export const initialProduct: Product = {
  attributes: '',
  name: '',
  prod_id: '',
}

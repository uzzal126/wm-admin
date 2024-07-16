import {ID, Response} from '../../../../../../_metronic/helpers'

export type Product = {
  id?: ID
  sku?: string
  prod_id?: string
  thumbnail?: any
  name?: string
  price?: any
  product_status?: string
}

export type ProductsQueryResponse = Response<Array<Product>>

export const initialProduct: Product = {
  thumbnail: {},
  name: '',
  prod_id: '',
}

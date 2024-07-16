import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  id?: string
  prod_id?: string
  product_id?: any
  product_name?: string
  sku?: string
  NAME?: string
  thumbnail?: any
  brand?: string
  price?: string
  discount?: string
  categories?: string
  in_stock?: string
  customer?: any
  total_review?: any
  avg_rating?: any
  email?: string
  msisdn?: string
  created_at?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

import {ID, Response} from '../../../../../_metronic/helpers'

export type TableModal = {
  id?: ID
  prod_id?: string
  sku?: string
  name?: string
  brand?: string
  price?: any
  categories?: any
  tags?: any
  thumbnail?: any
  status?: string
  in_stock?: number
  variant_count?: number
  wishlist_cnt?: number
  customer?: string
  on_sale?: boolean
  product_type?: any
  created_at?: number
}
export type TableModalsQueryResponse = Response<Array<TableModal>>

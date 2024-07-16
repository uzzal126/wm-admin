import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  name?: string
  prod_id?: string
  id?: string
  sku?: string
  total_variant?: string
  total_added?: string
  delivered?: string
  committed?: string
  returned?: string
  canceled?: string
  in_stock?: string
  cost_price?: string
  selling_price?: string
  variant_name?: string
  sold?: string
  variants?: any
  thumbnail?: any
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

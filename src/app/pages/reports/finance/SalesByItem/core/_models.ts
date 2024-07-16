import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  product_id?: string
  prod_id?: string
  net_sales?: string
  item_name?: string
  variant?: string
  quantity_sold?: string
  gross_sales?: string
  discount?: string
  tax?: string
  variant_name?: string
  attribute_id?: string
  sku?: string
  variant_count?: any
  variants?: any
  thumbnail?: any
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

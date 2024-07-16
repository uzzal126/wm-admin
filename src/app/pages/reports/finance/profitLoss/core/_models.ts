import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  id?: string
  order_id?: string
  payment_method?: string
  order_type?: string
  gross_sales?: string
  revenue?: string
  net_revenue?: string
  cogs?: string
  delivery_cost?: string
  gross_profit?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

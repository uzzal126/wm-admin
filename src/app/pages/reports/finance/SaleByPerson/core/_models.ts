import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  name?: string
  invoice_count?: string
  qty?: string
  gross_sales?: string
  discount?: string
  tax?: string
  net_sales?: string
  total_cost?: string
  gross_profit?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

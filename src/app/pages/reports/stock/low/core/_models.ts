import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  prod_id?: string
  id?: string
  in_stock?: string
  thumbnail?: any
  name?: string
  sku?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

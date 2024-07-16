import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  id?: string
  prod_id?: string
  name?: string
  sku?: string
  thumbnail?: any
  qty?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

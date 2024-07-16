import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  name?: string
  email?: string
  msisdn?: string
  profile?: string
  status?: string
  country?: string
  order_count?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

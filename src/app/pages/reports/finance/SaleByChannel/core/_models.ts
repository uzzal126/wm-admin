import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  date?: string
  manual?: string
  pos?: string
  website?: string
  facebook?: string
  store?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

import { ID, Response } from "../../../../../../_metronic/helpers"

export type TableModal = {
  id?: ID
  page_type?: string
  page_name?: string
  page_route?: string
  data?: any
  created_at?: string
  status?: number
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

export const initiaTableModal: TableModal = {
  page_name: '',
  page_route: ''
}

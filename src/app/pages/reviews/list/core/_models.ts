import { ID, Response } from "../../../../../_metronic/helpers"

export type TableModal = {
  id?: ID
  orderId?: string
  name?: string
  customerMobile?: string
  amount?: string
  paymentMethod?: string
  orderType?: string
  status?: string
  orderDate?: string
  initials?: {
    label: string
    state: string
  }
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

export const initiaTableModal: TableModal = {
  name: 'jone',
  customerMobile: 'Administrator',
  amount: '',
  paymentMethod: '',
}

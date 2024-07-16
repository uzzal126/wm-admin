import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Date' />,
    id: 'orderDate',
    accessor: 'orderDate',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order Id' />,
    id: 'orderid',
    accessor: 'orderId',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' />,
    id: 'name',
    accessor: 'name',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Mobile' />
    ),
    id: 'mobile',
    accessor: 'customerMobile',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Amount' />
    ),
    id: 'amount',
    accessor: 'amount',
  },
]

export {modalColumns}

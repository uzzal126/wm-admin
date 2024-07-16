import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' />,
    id: 'name',
    accessor: 'name',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Invoice Count' />,
    id: 'invoice_count',
    accessor: 'invoice_count',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Gross Sales(৳)' />,
    id: 'gross_sales',
    accessor: 'gross_sales',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Discount(-)' />,
    id: 'discount',
    accessor: 'discount',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Tax(+)' />,
    id: 'tax',
    accessor: 'tax',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Net Sales(৳)' />,
    id: 'net_sales',
    accessor: 'net_sales',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Total Cost(৳)' />,
    id: 'total_cost',
    accessor: 'total_cost',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Gross Profit(৳)' />,
    id: 'gross_profit',
    accessor: 'gross_profit',
  },
]

export {modalColumns}

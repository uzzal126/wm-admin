import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'
import ActionCell from './actionCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Item Name' className='min-w-125px' />
    ),
    id: 'item_name',
    Cell: ({...props}) => <ActionCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Unit Sold' />,
    id: 'quantity_sold',
    accessor: 'quantity_sold',
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
]

export {modalColumns}

import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'
// import {ImageCell} from './ImageCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Product' className='min-w-125px' />,
    id: 'name',
    // Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
    accessor: 'name',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Cost Price' />,
    id: 'cost_price',
    accessor: 'cost_price',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Selling Price' />,
    id: 'selling_price',
    accessor: 'selling_price',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='In Stock' />,
    id: 'in_stock',
    accessor: 'in_stock',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Delivered' />,
    id: 'delivered',
    accessor: 'delivered',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Committed' />,
    id: 'committed',
    accessor: 'committed',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Returned' />,
    id: 'returned',
    accessor: 'returned',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Canceled' />,
    id: 'canceled',
    accessor: 'canceled',
  },
]

export {modalColumns}

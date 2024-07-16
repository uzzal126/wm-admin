import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'
import {ImageCell} from './ImageCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Product' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Current Stock' />,
    id: 'in_stock',
    accessor: 'in_stock',
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Stock Threshold' />,
  //   id: 'selling_price',
  //   accessor: 'selling_price',
  // },
]

export {modalColumns}

import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'
import {ImageCell} from './ImageCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Item Name' className='min-w-125px' />
    ),
    id: 'name',
    // accessor: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='In Stock' />,
    id: 'qty',
    accessor: 'qty',
  },
]

export {modalColumns}

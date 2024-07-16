import {Column} from 'react-table'
import {TableModal} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Product' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Avg. Rating' />,
    id: 'rating',
    accessor: 'avg_rating',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Total Review' />,
    id: 'customers',
    Cell: ({...props}) => <>{props.data[props.row.index]?.total_review || 0}</>,
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='	Mobile Number' />,
  //   id: 'msisdn',
  //   accessor: 'msisdn',
  // },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='	Email' />,
  //   id: 'email',
  //   accessor: 'email',
  // },
]

export {modalColumns}

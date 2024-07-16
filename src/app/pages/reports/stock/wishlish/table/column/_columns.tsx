import {Column} from 'react-table'
import {betterParse} from '../../../../../../modules/helper/misc'
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
    Header: (props) => <CustomHeader tableProps={props} title='In Stock' />,
    id: 'in_stock',
    accessor: 'in_stock',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='	Whitelisted User' />,
    id: 'customer',
    Cell: ({...props}) => <>{betterParse(props.data[props.row.index].customer).length || 0}</>,
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

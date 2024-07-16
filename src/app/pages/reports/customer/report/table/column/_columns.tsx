import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Customer Name' className='min-w-125px' />
    ),
    id: 'name',
    accessor: 'name',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' />,
    id: 'email',
    accessor: 'email',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Mobile' />,
    id: 'msisdn',
    accessor: 'msisdn',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Country' />,
    id: 'country',
    accessor: 'country',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order' />,
    id: 'order_count',
    accessor: 'order_count',
  },
]

export {modalColumns}

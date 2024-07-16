import {Column} from 'react-table'
import {UserActionsCell} from './UserActionsCell'
import {SelectionCell} from './SelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {dateReadable} from '../../../../../../../../modules/helper/misc'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Store Name' className='' />,
    accessor: 'store_name',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Contact Name' className='' />,
    accessor: 'contact_name',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Mobile' className='' />,
    id: 'contact_number',
    accessor: 'contact_number',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Address' className='' />,
    id: 'address',
    accessor: 'address',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Default' className='' />,
    id: 'is_default',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].is_default === 1 ? (
          <span className='badge badge-success'>Default</span>
        ) : null}
      </>
    ),
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Date' className='' />,
    id: 'createdat',
    Cell: ({...props}) => <>{dateReadable(props.data[props.row.index].createdat)}</>,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell storeId={props.data[props.row.index].id} />,
  },
]

export {usersColumns}

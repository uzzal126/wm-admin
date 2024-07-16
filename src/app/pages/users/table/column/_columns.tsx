import {Column} from 'react-table'
import {User} from '../../core/_models'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {ActionsCell} from './actionsCell.js'

const productColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Mobile' className='' />,
    accessor: 'msisdn',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' className='' />,
    id: 'email',
    accessor: 'email',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Domain' className='' />,
    id: 'domain',
    accessor: 'domain',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Roles' className='' />,
    id: 'roles',
    Cell: ({...props}) => <BadgeCell roles={props.data[props.row.index].roles} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {productColumns}

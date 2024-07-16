import {Column} from 'react-table'
import {ImageCell} from './ImageCell'
import {BadgeCell} from './BadgeCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {User} from '../../core/_models'
import { ActionsCell } from './actionsCell.js'

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
    Header: (props) => (
      <CustomHeader tableProps={props} title='Email' className='' />
    ),
    id: 'email',
    accessor: 'email',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Type' className='' />
    ),
    id: 'type',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].type} />,
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

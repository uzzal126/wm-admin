import { Column } from 'react-table'
import { CustomHeader } from './CustomHeader'
import { TableModal } from '../../core/_models'
import { SelectionHeader } from './SelectionHeader'
import { SelectionCell } from './SelectionCell'
import { BadgeCell } from './BadgeCell'
import { ActionsCell } from './actionsCell'
import { PageActionsCell } from './pageActionsCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <SelectionCell data={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Page Title' />,
    id: 'page_name',
    Cell: ({ ...props }) => <PageActionsCell data={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='URL' />
    ),
    id: 'page_route',
    accessor: 'page_route',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Status' className='' />
    ),
    id: 'status',
    Cell: ({ ...props }) => <BadgeCell badge={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-150px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ActionsCell data={props.data[props.row.index]} />,
  },
]

export { modalColumns }

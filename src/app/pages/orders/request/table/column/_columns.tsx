import { Column } from 'react-table'
import { BadgeCell } from './BadgeCell'
import { ActionsCell } from './actionsCell'
import { SelectionCell } from './SelectionCell'
import { CustomHeader } from './CustomHeader'
import { SelectionHeader } from './SelectionHeader'
import { TableModal } from '../../core/_models'
import { Link } from 'react-router-dom'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order Id' />,
    id: 'request_id',
    Cell: ({ ...props }) => <Link to={`edit/${props.data[props.row.index].id}`}>{props.data[props.row.index].request_id}</Link>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Customer Name' />,
    id: 'customer_name',
    accessor: 'customer_name',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Mobile' />
    ),
    id: 'customer_msisdn',
    accessor: 'customer_msisdn',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Status' className='w-100px' />
    ),
    id: 'is_order_accepted',
    Cell: ({ ...props }) => <BadgeCell badge={props.data[props.row.index].is_order_accepted} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Received At' />
    ),
    id: 'created_at',
    accessor: 'created_at',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-120px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export { modalColumns }

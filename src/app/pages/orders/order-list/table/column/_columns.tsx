import {Column} from 'react-table'
import {dateUnixReadable} from '../../../../../modules/helper/misc'
import {TableModal} from '../../core/_models'
import {ActionsCell} from './actionsCell'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import Invoice from './invoice'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => (
      <SelectionCell
        id={props.data[props.row.index].invoice_id}
        disable={props.data[props.row.index].channel.includes('Website')}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order Id' />,
    id: 'invoice_id',
    Cell: ({...props}) => (
      <>
        <Invoice
          id={props.data[props.row.index].id || 0}
          invoice_id={props.data[props.row.index].invoice_id || ''}
        />
      </>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Customer Name' />,
    id: 'customer_name',
    // accessor: 'customer_name',
    Cell: ({...props}) => (
      <>
        {typeof props.data[props.row.index].shipping_address === 'string'
          ? JSON.parse(props.data[props.row.index].shipping_address)?.name
          : props.data[props.row.index].customer_name}
      </>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Mobile' />,
    id: 'msisdn',
    accessor: 'msisdn',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Amount' />,
    id: 'total',
    Cell: ({...props}) => <>{parseFloat(props.data[props.row.index].total).toFixed(2)}</>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Payment Method' />,
    id: 'payment_channel',
    // accessor: 'payment_channel',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].payment_method === 'Cash on Delivery(COD)'
          ? 'COD'
          : props.data[props.row.index].payment_method}
      </>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order Type' />,
    id: 'channel',
    accessor: 'channel',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='w-100px' />,
    id: 'order_status',
    Cell: ({...props}) => (
      <BadgeCell
        badge={props.data[props.row.index].order_status}
        color={props.data[props.row.index].order_status_id}
      />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Received At' />,
    id: 'created_at',
    Cell: ({...props}) => (
      <>{dateUnixReadable(props.data[props.row.index].created_at, 'DD/MM/YY h:mm:s A')}</>
    ),
    // accessor: 'created_at',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-120px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        invoice_id={props.data[props.row.index].invoice_id}
        channel={props.data[props.row.index].channel}
      />
    ),
  },
]

export {modalColumns}

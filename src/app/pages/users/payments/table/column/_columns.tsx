import {Column} from 'react-table'
import {dateReadable} from '../../../../../modules/helper/misc'
import {Payment} from '../../core/_models'
import {ActionsCell} from './actionsCell.js'
import {CustomHeader} from './CustomHeader'

const jobColumns: ReadonlyArray<Column<Payment>> = [
  // {
  //   Header: (props: any) => <SelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Domain' className='' />,
    id: 'domain',
    Cell: ({...props}) => <>{props.data[props.row.index].domain}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Mobile' className='' />,
    id: 'mobile',
    Cell: ({...props}) => <>{props.data[props.row.index].msisdn}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Email' className='' />,
    id: 'email',
    Cell: ({...props}) => <>{props.data[props.row.index].email}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Payment Id' className='' />,
    id: 'paymentId',
    Cell: ({...props}) => <>{props.data[props.row.index].payment_id}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Amount' className='' />,
    id: 'amount',
    Cell: ({...props}) => <>{props.data[props.row.index].amount}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Date' className='' />,
    id: 'payment_date',
    Cell: ({...props}) => (
      <>{dateReadable(props.data[props.row.index].created_at, 'MM/DD/YY h:mmA')}</>
    ),
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Payment Partner' className='' />
    ),
    id: 'payment_partner',
    Cell: ({...props}) => <>{props.data[props.row.index].payment_partner_id}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Payment Status' className='' />,
    id: 'status',
    Cell: ({...props}) => <>{props.data[props.row.index].payment_status}</>,
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        slug={props.data[props.row.index].id}
        payment={props.data[props.row.index]}
      />
    ),
  },
]

export {jobColumns}

import moment from 'moment'
import {Column} from 'react-table'
import {getLocal} from '../../../../../../modules/helper/misc'
import {Bundle} from '../../core/_models'
import {AttachmentCell} from './AttachmentCell'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {UserSL} from './UserSL'
import {ActionsCell} from './actionsCell.js'

const auth = getLocal('user')
const Columns: ReadonlyArray<Column<Bundle>> = auth?.user?.role_id_string?.includes('1')
  ? [
      {
        Header: (props: any) => <SelectionHeader tableProps={props} />,
        id: 'selection',
        Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
      },
      {
        Header: (props) => <CustomHeader tableProps={props} title='SL' />,
        id: 'id',
        Cell: ({...props}) => <UserSL sl={props.row.index} />,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Number of SMS' className='' />
        ),
        id: 'number_of_sms',
        Cell: ({...props}) => <>{props.data[props.row.index].number_of_sms}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Pricing(BDT)' className='' />
        ),
        id: 'pricing',
        Cell: ({...props}) => <>{`${props.data[props.row.index].pricing} `}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Total Price(BDT)' className='' />
        ),
        id: 'total_price',
        Cell: ({...props}) => <>{`${props.data[props.row.index].total_price} `}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Account Type' className='' />
        ),
        id: 'account_type',
        Cell: ({...props}) => <>{`${props.data[props.row.index].account_type}`}</>,
      },
      {
        Header: (props: any) => <CustomHeader tableProps={props} title='Status' className='' />,
        id: 'status',
        Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].status} />,
      },

      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Attachments' className='' />
        ),
        id: 'attachments',
        Cell: ({...props}) => (
          <AttachmentCell attachments={props.data[props.row.index].attachments} />
        ),
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Submission Time' className='' />
        ),
        id: 'created_at',
        Cell: ({...props}) => <>{moment(props.data[props.row.index].created_at).format('llll')}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Requestor Name' className='' />
        ),
        id: 'requested_by',
        Cell: ({...props}) => <>{props.data[props.row.index].requested_by}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Approve Time' className='' />
        ),
        id: 'approved_at',
        Cell: ({...props}) => (
          <>
            {props.data[props.row.index].approved_at
              ? moment(props.data[props.row.index].approved_at).format('llll')
              : 'Not approved yet!'}
          </>
        ),
      },
      {
        Header: (props: any) => <CustomHeader tableProps={props} title='Remarks' className='' />,
        id: 'remarks',
        Cell: ({...props}) => <span className=''>{props.data[props.row.index].remarks || ''}</span>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
        ),
        id: 'actions',
        Cell: ({...props}) => (
          <ActionsCell id={props.data[props.row.index].id} item={props.data[props.row.index]} />
        ),
      },
    ]
  : [
      {
        Header: (props) => <CustomHeader tableProps={props} title='SL' />,
        id: 'id',
        Cell: ({...props}) => <UserSL sl={props.row.index} />,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Number of SMS' className='' />
        ),
        id: 'number_of_sms',
        Cell: ({...props}) => <>{props.data[props.row.index].number_of_sms}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Pricing(BDT)' className='' />
        ),
        id: 'pricing',
        Cell: ({...props}) => <>{`${props.data[props.row.index].pricing}`}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Total Price(BDT)' className='' />
        ),
        id: 'total_price',
        Cell: ({...props}) => <>{`${props.data[props.row.index].total_price} `}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Account Type' className='' />
        ),
        id: 'account_type',
        Cell: ({...props}) => <>{`${props.data[props.row.index].account_type}`}</>,
      },
      {
        Header: (props: any) => <CustomHeader tableProps={props} title='Status' className='' />,
        id: 'status',
        Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].status} />,
      },

      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Attachments' className='' />
        ),
        id: 'attachments',
        Cell: ({...props}) => (
          <AttachmentCell attachments={props.data[props.row.index].attachments} />
        ),
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Submission Time' className='' />
        ),
        id: 'created_at',
        Cell: ({...props}) => <>{moment(props.data[props.row.index].created_at).format('llll')}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Requestor Name' className='' />
        ),
        id: 'requested_by',
        Cell: ({...props}) => <>{props.data[props.row.index].requested_by}</>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Approve Time' className='' />
        ),
        id: 'approved_at',
        Cell: ({...props}) => (
          <>
            {props.data[props.row.index].approved_at
              ? moment(props.data[props.row.index].approved_at).format('llll')
              : 'Not approved yet!'}
          </>
        ),
      },
      {
        Header: (props: any) => <CustomHeader tableProps={props} title='Remarks' className='' />,
        id: 'remarks',
        Cell: ({...props}) => <span className=''>{props.data[props.row.index].remarks || ''}</span>,
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
        ),
        id: 'actions',
        Cell: ({...props}) => (
          <ActionsCell id={props.data[props.row.index].id} item={props.data[props.row.index]} />
        ),
      },
    ]

export {Columns}

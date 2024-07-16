import moment from 'moment'
import {Column} from 'react-table'
import {Bundle} from '../../core/_models'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import {UserSL} from './UserSL'

const Columns: ReadonlyArray<Column<Bundle>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='SL' />,
    id: 'id',
    Cell: ({...props}) => <UserSL sl={props.row.index} />,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Batch Id' className='' />,
    id: 'batch_id',
    Cell: ({...props}) => <>{props.data[props.row.index].batch_id}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Audience' className='' />,
    id: 'audience',
    Cell: ({...props}) => <> {props.data[props.row.index].audience} </>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='SMS Text' className='' />,
    id: 'sms_text',
    Cell: ({...props}) => <>{props.data[props.row.index].sms_text} </>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Number of SMS' className='' />,
    id: 'number_of_sms',
    Cell: ({...props}) => <>{props.data[props.row.index].number_of_sms}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Cost Price' className='' />,
    id: 'total_price',
    Cell: ({...props}) => <>{`${props.data[props.row.index].total_price} `}</>,
  },

  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Schedule Time' className='' />,
    id: 'scheduled_at',
    Cell: ({...props}) => <>{moment(props.data[props.row.index].scheduled_at).format('llll')}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Status' className='' />,
    id: 'status',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].status} />,
  },

  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Submission Time' className='' />
    ),
    id: 'created_at',
    Cell: ({...props}) => <>{moment(props.data[props.row.index].created_at).format('llll')}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Type' className='' />,
    id: 'account_type',
    Cell: ({...props}) => <>{`${props.data[props.row.index].account_type}`}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Initiated By' className='' />,
    id: 'requested_by',
    Cell: ({...props}) => <>{props.data[props.row.index].requested_by}</>,
  },
]

export {Columns}

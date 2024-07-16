import {Column} from 'react-table'
import {dateReadable} from '../../../../../modules/helper/misc'
import {Coupon} from '../../core/_models'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {ActionsCell} from './actionsCell.js'

const productColumns: ReadonlyArray<Column<Coupon>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='CODE' className='' />,
    accessor: 'promo_code',
    Cell: ({...props}) => <ImageCell coupon={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Discount' className='' />,
    id: 'amount',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].amount
          ? props.data[props.row.index].amount + '৳'
          : props.data[props.row.index].percent + '%'}
      </>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Max Discount Limit' className='' />,
    accessor: 'max_discount_limit',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='MAX APPLY Limit' className='' />,
    accessor: 'max_use_limit',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Min Order Value' className='' />,
    accessor: 'min_order_value',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].percent
          ? props.data[props.row.index].min_order_value + '৳'
          : 'N/A'}
      </>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='MAX APPLY Limit/ USER' className='' />
    ),
    accessor: 'per_user_limit',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='START DATE' className='' />,
    id: 'start_in',
    Cell: ({...props}) => (
      <>{dateReadable(parseInt(props.data[props.row.index].start_in) * 1000)}</>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='END DATE' className='' />,
    id: 'end_in',
    Cell: ({...props}) => <>{dateReadable(parseInt(props.data[props.row.index].end_in) * 1000)}</>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='w-100px' />,
    id: 'active_status',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-80px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {productColumns}

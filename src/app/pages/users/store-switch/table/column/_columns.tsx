import {Column} from 'react-table'
import {check_date_expiry, dateUnixReadable} from '../../../../../modules/helper/misc'
import {TableModal} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {ActionsCell} from './actionsCell'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Store Details' className='' />,
    id: 'domain',
    Cell: ({...props}) => <ImageCell store={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Category' className='text-start' />,
    id: 'store_category',
    accessor: 'store_category',
    Cell: ({...props}) => (
      <span
        className={
          check_date_expiry(props.data[props.row.index].expire_time, Date.now() / 1000)
            ? ''
            : 'text-danger'
        }
      >
        {props.data[props.row.index].store_category}
      </span>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='E-Mail' className='text-start' />,
    id: 'email',
    accessor: 'email',
    Cell: ({...props}) => (
      <span
        className={
          check_date_expiry(props.data[props.row.index].expire_time, Date.now() / 1000)
            ? ''
            : 'text-danger'
        }
      >
        {props.data[props.row.index].email}
      </span>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Active Time' className='text-start' />
    ),
    id: 'active_time',
    accessor: 'active_time',
    Cell: ({...props}) => (
      <span
        className={
          check_date_expiry(props.data[props.row.index].expire_time, Date.now() / 1000)
            ? ''
            : 'text-danger'
        }
      >
        {dateUnixReadable(props.data[props.row.index].active_time, 'DD/MM/YY')}
      </span>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='text-start' />,
    id: 'publish_status',
    accessor: 'publish_status',
    Cell: ({...props}) => (
      <span
        className={
          props.data[props.row.index].publish_status === 'Published'
            ? 'text-success'
            : 'text-danger'
        }
      >
        {props.data[props.row.index].publish_status}
      </span>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Expiry Time' className='text-start' />
    ),
    id: 'expire_time',
    accessor: 'expire_time',
    Cell: ({...props}) => (
      <span
        className={
          check_date_expiry(props.data[props.row.index].expire_time, Date.now() / 1000)
            ? ''
            : 'text-danger'
        }
      >
        {dateUnixReadable(props.data[props.row.index].expire_time)}
      </span>
    ),
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='SID' className='text-center' />,
  //   id: 'sid',
  //   accessor: 'sid',
  // },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-center w-80px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell store={props.data[props.row.index]} />,
  },
]

export {modalColumns}

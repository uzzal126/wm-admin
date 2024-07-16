import {Column} from 'react-table'
import {getAuth} from '../../../../../modules/auth'
import {TableModal} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import ActionCell from './actionCell'
const user = getAuth()

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Category' />,
    id: 'categories',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index]?.categories &&
          props.data[props.row.index]?.categories.toString()}
      </>
    ),
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={`Price (${user?.shop_info?.currency || ''})`}
        className='text-center'
      />
    ),
    id: 'price',
    Cell: ({...props}) => (
      <div className='text-center min-w-75px'>
        {props.data[props.row.index].price?.min === props.data[props.row.index].price?.max
          ? props.data[props.row.index].price?.min
          : `${props.data[props.row.index].price?.min} - ${props.data[props.row.index].price?.max}`}
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='In Stock' className='' />,
    id: 'in_stock',
    Cell: ({...props}) => <>{props.data[props.row.index].in_stock}</>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Whitelisted User' />,
    id: 'wishlist_cnt',
    Cell: ({...props}) => (
      <>{props.data[props.row.index].customer && props.data?.[props.row?.index ?? '']?.customer?.length}</>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='View' className='w-50px' />,
    id: 'id',
    Cell: ({...props}) => <ActionCell user={props.data[props.row.index]} />,
  },
]

export {modalColumns}

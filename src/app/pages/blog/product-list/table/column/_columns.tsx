import {Link} from 'react-router-dom'
import {Column} from 'react-table'
import {toast} from 'react-toastify'
import {getAuth} from '../../../../../modules/auth/index.js'
import {dateUnixReadable} from '../../../../../modules/helper/misc'
import {Product} from '../../core/_models'
import {BadgeCell} from './BadgeCell'
import {CategoryCell} from './CategoryCell'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {ActionsCell} from './actionsCell.js'

const copyToClipboard = (textToCopy: string) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() =>
      toast.success('Post URL Copied!', {
        position: 'top-right',
        theme: 'light',
      })
    )
    .catch((err) => toast.error('Error in copying text: ', err))
}

const user = getAuth()

const productColumns: ReadonlyArray<Column<Product>> = [
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
    Header: (props) => <CustomHeader tableProps={props} title='Category' className='text-center' />,
    id: 'category',
    Cell: ({...props}) => <CategoryCell category={props.data[props.row.index].category} />,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='View' className='' />,
    id: 'visitors',
    Cell: ({...props}) => <>{`${props.data[props.row.index].visitors}`}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Comments' className='' />,
    id: 'comments',
    Cell: ({...props}) => (
      <Link to={`/blogs/${props.data[props.row.index].slug}/comments`}>
        {`(${props.data[props.row.index].comments})`}
      </Link>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='' />,
    id: 'status',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].status_id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Publish Date' className='' />,
    id: 'created_at',
    Cell: ({...props}) => (
      <span>{dateUnixReadable(props.data[props.row.index].created_at, 'DD/MM/YY')}</span>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='URL' className='text-end w-45px' />,
    id: 'slug',
    Cell: ({...props}) =>
      props.data[props.row.index].status_id === 1 && (
        <i
          className='fa fa-copy mx-2'
          style={{fontSize: 22, cursor: 'pointer'}}
          onClick={() =>
            copyToClipboard(
              `https://${user?.shop_info?.domain}/blog/${props.data[props.row.index].slug}`
            )
          }
        />
      ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell id={props.data[props.row.index].id} pid={props.data[props.row.index].slug} />
    ),
  },
]

export {productColumns}

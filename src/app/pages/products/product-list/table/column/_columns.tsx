import {Column} from 'react-table'
import {getAuth} from '../../../../../modules/auth'
import {Product} from '../../core/_models'
import {AttributeCell} from './AttributeCell'
import {BadgeCell} from './BadgeCell'
import {CategoryCell} from './CategoryCell'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {ActionsCell} from './actionsCell.js'

const user = getAuth()

const productColumns: ReadonlyArray<Column<Product>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => (
      <SelectionCell id={props.data[props.row.index].id} product={props.data[props.row.index]} />
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Categories' className='text-center' />
    ),
    id: 'category',
    Cell: ({...props}) => <CategoryCell categories={props.data[props.row.index]?.categories} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Variants' className='text-end' />,
    id: 'variant',
    Cell: ({...props}) => <AttributeCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='In Stock' className='text-center' />,
    id: 'in_stock',
    Cell: ({...props}) => <div className='text-center'>{props.data[props.row.index].in_stock}</div>,
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
        {(props.data[props.row.index] as any).price?.min ===
        (props.data[props.row.index] as any).price?.max
          ? (props.data[props.row.index] as any).price?.min
          : `${(props.data[props.row.index] as any).price?.min} - ${
              (props.data[props.row.index] as any).price?.max
            }`}
      </div>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='' />,
    id: 'status',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].product_status} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell
        id={props.data[props.row.index].id}
        pid={props.data[props.row.index].prod_id}
        checkout={props.data[props.row.index].checkout_url}
        status={props.data[props.row.index].product_status}
      />
    ),
  },
]

export {productColumns}

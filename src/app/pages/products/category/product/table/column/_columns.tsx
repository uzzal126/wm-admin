import {Column} from 'react-table'
import {Product} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'

const productColumns: ReadonlyArray<Column<Product>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={(props.data[props.row.index] as any).id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='' />,
    id: 'pd_title',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' className='text-center' />,
    id: 'price',
    Cell: ({...props}) => (
      <div className='text-center'>
        {props.data[props.row.index].price?.min === props.data[props.row.index].price?.max
          ? props.data[props.row.index].price?.min
          : `${props.data[props.row.index].price?.min} - ${props.data[props.row.index].price?.max}`}
      </div>
    ),
  },
]

export {productColumns}

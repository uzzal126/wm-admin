import {Column} from 'react-table'
import {ImageCell} from './ImageCell'
import {CustomHeader} from './CustomHeader'
import {StockModal} from '../../core/_models'
import {ActionsCell} from './actionsCell.js'
import {UpdateStock} from './UpdateStock.js'
import AttributeGenerate from './AttributeGenerate'

const productColumns: ReadonlyArray<Column<StockModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Products' className='' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Variants' className='' />,
    id: 'variant',
    Cell: ({...props}) => <AttributeGenerate att={props.data[props.row.index]?.variants} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='In Stock' className='' />,
    id: 'total_added',
    accessor: 'total_added',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='COMMITTED' className='' />,
    id: 'committed',
    accessor: 'committed',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='AVAILABLE' />,
    id: 'stock',
    accessor: 'stock',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='ADD STOCK' className='text-end ' />,
    id: 'update_stock',
    Cell: ({...props}): any =>
      props.data[props.row.index]?.variants && props.data[props.row.index]?.variants.length <= 0 ? (
        <UpdateStock proId={props.data[props.row.index].pid} attrId='' />
      ) : (
        ''
      ),
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Details' className='text-end w-60px' />
    ),
    id: 'actions',
    Cell: ({...props}) =>
      props.data[props.row.index]?.variants && props.data[props.row.index]?.variants.length <= 0 ? (
        <ActionsCell id={(props.data[props.row.index] as any).pd_id} attrId='' />
      ) : (
        ''
      ),
  },
]

export {productColumns}

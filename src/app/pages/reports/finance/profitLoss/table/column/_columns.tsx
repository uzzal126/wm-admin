import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order Id' className='min-w-125px' />,
    id: 'order_id',
    accessor: 'order_id',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Payment Method' />,
    id: 'payment_method',
    accessor: 'payment_method',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Order Type' />,
    id: 'order_type',
    accessor: 'order_type',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Revenue' />,
    id: 'revenue',
    accessor: 'revenue',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Delivery Cost(-)' />,
    id: 'delivery_cost',
    accessor: 'delivery_cost',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Net Revenue(৳)' />,
    id: 'net_revenue',
    accessor: 'net_revenue',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='COGS(-)' />,
    id: 'cogs',
    accessor: 'cogs',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Gross Profit(৳)' />,
    id: 'gross_profit',
    accessor: 'gross_profit',
  },
]

export {modalColumns}

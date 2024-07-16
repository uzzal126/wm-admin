import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'
import {dateReadable} from '../../../../../../modules/helper/misc'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Date' />,
    id: 'date',
    Cell: ({...props}) => <>{dateReadable(props.data[props.row.index].date)}</>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Invoice ID' />,
    id: 'invoice_id',
    accessor: 'invoice_id',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Product Name' />,
    id: 'product_name',
    accessor: 'product_name',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Customer Name' />,
    id: 'customer_name',
    accessor: 'customer_name',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='RETURN DATE' />,
    id: 'return_date',
    Cell: ({...props}) => <>{dateReadable(props.data[props.row.index].return_date)}</>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='STATUS' />,
    id: 'status',
    accessor: 'status',
  },
]

export {modalColumns}

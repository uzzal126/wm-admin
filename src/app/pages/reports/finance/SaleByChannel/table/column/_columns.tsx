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
    Header: (props) => <CustomHeader tableProps={props} title='Web' />,
    id: 'website',
    accessor: 'website',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Facebook' />,
    id: 'facebook',
    accessor: 'facebook',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Manual' />,
    id: 'manual',
    accessor: 'manual',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Shop/Store' />,
    id: 'pos',
    accessor: 'pos',
  },
]

export {modalColumns}

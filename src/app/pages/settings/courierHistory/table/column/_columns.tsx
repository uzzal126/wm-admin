import {Column} from 'react-table'
import {CustomHeader} from './CustomHeader'
import {TableModal} from '../../core/_models'
import {dateReadable} from '../../../../../modules/helper/misc'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Location' />,
    id: 'location',
    accessor: 'location',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price Per KG' />,
    id: 'price_for_merchants_per_kg',
    accessor: 'price_for_merchants_per_kg',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Additional Per KG' />,
    id: 'additional_charge_per_kg',
    accessor: 'additional_charge_per_kg',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='COD Charge' />,
    id: 'cash_on_delivery_percentage',
    accessor: 'cash_on_delivery_percentage',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' />,
    id: 'status',
    Cell: ({...props}) => (
      <>
        {parseInt(props.data?.[props.row?.index]?.status ?? '0') === 1 ? (
          <span className='badge badge-light-success'>Active</span>
        ) : (
          <span></span>
        )}
      </>
    ),
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Activation Start' />,
    id: 'active_time',
    Cell: ({...props}) => <>{dateReadable(props.data[props.row.index].active_time)}</>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Expire' />,
    id: 'expire_time',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].expire_time
          ? dateReadable(props.data[props.row.index].expire_time)
          : ''}
      </>
    ),
  },
]

export {modalColumns}

import {Column} from 'react-table'
import {STP} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {ActionsCell} from './actionsCell'

const productColumns: ReadonlyArray<Column<STP>> = [
  // {
  //   Header: (props) => <SelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <SelectionCell id={props.data[props.row.index]['Sl. No.']} />,
  // },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Name' className='' />,
  //   id: 'name',
  //   Cell: ({...props}) => <ImageCell product={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Branch' className='' />,
    accessor: 'Branch',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Service Hour' className='' />,
    id: 'Service Hour',
    accessor: 'Service Hour',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Weekend' className='' />,
    id: 'Weekend',
    accessor: 'Weekend',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Address_Bangla' className='' />,
    id: 'Address_Bangla',
    accessor: 'Address_Bangla',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Address_English' className='' />,
    id: 'Address_English',
    accessor: 'Address_English',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell id={props.data[props.row.index]['Sl. No.']} data={props.data[props.row.index]} />
    ),
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Roles' className='' />,
  //   id: 'roles',
  //   Cell: ({...props}) => <BadgeCell roles={props.data[props.row.index].roles} />,
  // },
  // {
  //   Header: (props) => (
  //     <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {productColumns}

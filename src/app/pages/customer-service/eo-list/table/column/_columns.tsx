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
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='SL' className='' />,
  //   id: 'SL',
  //   accessor: 'Sl. No.',
  // },
  {
    Header: (props) => <CustomHeader tableProps={props} title='District' className='' />,
    id: 'District',
    accessor: 'District',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='RetailerName' className='' />,
    id: 'RetailerName',
    accessor: 'RetailerName',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Address' className='' />,
    id: 'Address',
    accessor: 'Address',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Contact' className='' />,
    id: 'Contact',
    accessor: 'Contact',
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Address_English' className='' />,
  //   id: 'Address_English',
  //   accessor: 'Address_English',
  // },
  // {
  //   Header: (props) => (
  //     <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => (
  //     <ActionsCell id={props.data[props.row.index]['Sl. No.']} data={props.data[props.row.index]} />
  //   ),
  // },
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
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell id={props.data[props.row.index]['Contact']} data={props.data[props.row.index]} />
    ),
  },
]

export {productColumns}

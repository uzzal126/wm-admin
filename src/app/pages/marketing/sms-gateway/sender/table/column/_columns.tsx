import {Column} from 'react-table'
import {Template} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {ActionsCell} from './actionsCell.js'

const jobColumns: ReadonlyArray<Column<Template>> = [
  {
    Header: (props: any) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Template Name' className='' />,
    id: 'name',
    Cell: ({...props}) => <>{props.data[props.row.index].name}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='SMS Text' className='' />,
    id: 'text',
    Cell: ({...props}) => <>{props.data[props.row.index].text}</>,
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <ActionsCell id={props.data[props.row.index].id} slug={props.data[props.row.index].slug} />
    ),
  },
]

export {jobColumns}

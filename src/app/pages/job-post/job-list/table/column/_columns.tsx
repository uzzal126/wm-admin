import moment from 'moment'
import {Link} from 'react-router-dom'
import {Column} from 'react-table'
import {Job} from '../../core/_models'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import {ImageCell} from './ImageCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import {ActionsCell} from './actionsCell.js'

const jobColumns: ReadonlyArray<Column<Job>> = [
  {
    Header: (props: any) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Title' className='' />,
    id: 'name',
    Cell: ({...props}) => <ImageCell job={props.data[props.row.index]} />,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Job Type' className='' />,
    id: 'employment_status',
    Cell: ({...props}) => <>{props.data[props.row.index].employment_status}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Vacancy' className='' />,
    id: 'vacancy',
    Cell: ({...props}) => <>{props.data[props.row.index].vacancy}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Experience' className='' />,
    id: 'experience',
    Cell: ({...props}) => <>{props.data[props.row.index].experience}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Gender' className='' />,
    id: 'gender',
    Cell: ({...props}) => <>{props.data[props.row.index].gender}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Age' className='' />,
    id: 'age',
    Cell: ({...props}) => <>{props.data[props.row.index].age}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Location' className='' />,
    id: 'location',
    Cell: ({...props}) => <>{props.data[props.row.index].location}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Salary' className='' />,
    id: 'salary',
    Cell: ({...props}) => <>{props.data[props.row.index].salary}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Deadline' className='' />,
    id: 'deadline',
    Cell: ({...props}) => <>{moment.unix(Number(props.data[props.row.index].deadline)).format('LLL')}</>,
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Applicants' className='' />,
    id: 'number_of_applicants',
    Cell: ({...props}) => (
      <Link to={`/career/jobs/${props.data[props.row.index].slug}/applicants`}>{`(${
        props.data[props.row.index].number_of_applicants
      })`}</Link>
    ),
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Status' className='' />,
    id: 'status',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].status_id} />,
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

import {DatatableFilter} from '../../../table/toolbar/DataTableFilter'

export default function CardHeader({applications}: any) {
  return (
    <div className='card-header border-0 pt-5'>
      <h3 className='card-title align-items-start flex-column'>
        <span className='card-label fw-bold text-dark'>{`${applications} Application${
          applications > 1 ? 's' : ''
        }`}</span>
        {/* <span className='text-muted mt-1 fw-semibold fs-7'>Avg. 72% completed lessons</span> */}
      </h3>
      {/*begin::Toolbar*/}
      <div className='card-toolbar'>
        {/* <a href='#' className='btn btn-sm btn-light'>
          All Applications
        </a> */}
        <DatatableFilter />
      </div>
      {/*end::Toolbar*/}
    </div>
  )
}

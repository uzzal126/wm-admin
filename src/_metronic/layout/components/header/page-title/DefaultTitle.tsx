import React, {FC} from 'react'
import {Link} from '../../../../../app/modules/helper/linkHandler'
import DateRange from '../../../../partials/content/forms/dateRangePicker'
import {useLayout} from '../../../core/LayoutProvider'
import {usePageData} from '../../../core/PageData'

const DefaultTitle: FC = () => {
  const {pageTitle, pageDescription, datePicker, backLink, setdatePickerData} = usePageData()
  const {config} = useLayout()
  return (
    <>
      {/* begin::Title */}
      {pageTitle && (
        <div className='d-flex align-items-center text-dark fw-bolder my-1 fs-3'>
          {backLink && (
            <div className='me-3'>
              {Array.from(backLink).map((item, index) => (
                <Link to={item.path} key={index} className='btn btn-sm btn-light'>
                  <i className='fas fa-arrow-left'></i>
                  <span className='d-none d-lg-inline'>{item.title}</span>
                </Link>
              ))}
            </div>
          )}
          {pageTitle}
          {pageDescription && config.pageTitle && config.pageTitle.description && (
            <>
              <span className='h-20px border-gray-200 border-start ms-3 mx-2 me-3'></span>
              <small className='text-muted fs-7 fw-bold my-1 ms-1'>{pageDescription}</small>
            </>
          )}
          {datePicker && (
            <div className='ms-3 d-none d-lg-block'>
              <div className='position-relative' id='date-range-ref'>
                <DateRange hideTitle={true} onChange={(e: any) => setdatePickerData(e)} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export {DefaultTitle}

import {useEffect, useRef, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../_metronic/helpers'
import DateRange from '../../../../../../_metronic/partials/content/forms/dateRangePicker'
import {useQueryResponse} from '../../../../products/product-list/core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import CatSelect from './helperComponents/catSelect'
import StatusSelect from './helperComponents/statusSelect'

const DatatableFilter = () => {
  const {updateState, state} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [status, setStatus] = useState<any>(null)
  const [cat, setCat] = useState<any>(null)
  const [startDate, setStartDate] = useState<any>(undefined)
  const [endDate, setEndDate] = useState<any>(undefined)
  const buttonRef: any = useRef<any>(null)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
    setStatus(null)
  }

  const filterData = () => {
    const oldState: any = state
    const filter = {
      ...oldState?.filter,
      start_date: startDate,
      end_date: endDate,
      expiration_status: status,
      store_category_id: cat,
    }
    updateState({
      filter: filter,
      ...initialQueryState,
    })
  }

  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        ref={buttonRef}
        className='btn btn-light-primary btn-sm mx-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div
        className='menu menu-sub menu-sub-dropdown w-300px w-md-300px p-2'
        data-kt-menu='true'
        id='filter-menu'
      >
        {/* begin::Header */}
        <div className='px-3 py-2'>
          <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-3 py-2' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          <div className='mb-5'>
            <>
              <div>
                <DateRange
                  onChange={(e: any) => {
                    setStartDate(e?.start_date)
                    setEndDate(e?.end_date)
                    buttonRef?.current.click()
                    buttonRef?.current.click()
                  }}
                />
              </div>
            </>
            <label className='form-label fs-6 fw-bold'>Status:</label>
            <StatusSelect
              className={''}
              callBack={(val: any) => setStatus(val)}
              selectedStatus={status}
            />
            <label className='form-label fs-6 fw-bold'>Category:</label>
            <CatSelect className={''} setSelectedCat={setCat} selectedCat={cat} />
          </div>

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-3'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-3'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
      </div>
    </>
  )
}

export {DatatableFilter}

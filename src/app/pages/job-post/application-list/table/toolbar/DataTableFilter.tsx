import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../../../products/product-list/core/QueryResponseProvider'
import StatusSelect from '../../components/applicant-list/card/statusSelect'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const DatatableFilter = () => {
  const {updateState, state} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [status, setStatus] = useState<any>(null)

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
      status: status,
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
        className='btn btn-light-primary btn-sm mx-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-200px' data-kt-menu='true'>
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
            <label className='form-label fs-6 fw-bold'>Status:</label>
            <StatusSelect
              className={''}
              callBack={(val: any) => setStatus(val)}
              selectedStatus={status}
            />
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

import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../_metronic/helpers'
import DateRange from '../../../../../../_metronic/partials/content/forms/dateRangePicker'
import PaymentMethodSelect from '../../../../../../_metronic/partials/content/forms/method'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatatableFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [state, setState] = useState<any>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const updateLocalState = (prop: any, value: any) => {
    setState({...state, [prop]: value})
  }

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    // //// console.log('state from data table filter: ', state)
    updateState({
      filter: {
        category: state?.category,
        status: state?.status,
        brand: state?.brand,
        start_date: state?.start_date,
        end_date: state?.end_date,
      },
      ...initialQueryState,
    })
  }

  const updateRange = (e: any) => {
    // //// console.log(e)
    setState({...state, ...e})
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
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-5'>
            <div className='time position-relative' id='date-range-ref'>
              <DateRange onChange={(e: any) => updateRange(e)} />
            </div>
          </div>
          {/* <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Category:</label>
            <CategorySelect callBack={(e: any) => updateLocalState('category', e.id)} />
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Brand:</label>
            <BrandSelect callBack={(e: any) => updateLocalState('brand', e.id)} />
          </div> */}
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Payment:</label>
            <PaymentMethodSelect callBack={(e: any) => updateLocalState('payment_method', e)} />
          </div>
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {DatatableFilter}

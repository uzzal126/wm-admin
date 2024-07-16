import moment from 'moment'
import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../../_metronic/helpers'
import DateRange from '../../../../../../../_metronic/partials/content/forms/dateRangePicker'
import PaymentMethodSelect from '../../../../../../../_metronic/partials/content/forms/method'
import {ORDER_PAYMENT_METHODS} from '../../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../../library/api.helper'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatatableFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [state, setState] = useState<any>()
  const [cod, setCod] = useState<string | undefined>()
  const [paymentOptions, setPaymentOptions] = useState([])

  useEffect(() => {
    getPaymentOptions()
  }, [])

  const getPaymentOptions = async () => {
    const res = await getQueryRequest(ORDER_PAYMENT_METHODS)
    if (res?.success) {
      setPaymentOptions(res?.data)
    }
  }

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setCod(''), updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {
        payment_method_id: state?.payment_method,
        start_date: state?.start_date || moment(new Date()).format('yyyy-MM-DD'),
        end_date: state?.end_date || moment(new Date()).format('yyyy-MM-DD'),
        payment_method: cod,
        label:
          state && state.selected && Object.keys(state.selected).length > 0
            ? state.selected.label
            : `today`,
      },
      ...initialQueryState,
    })
  }

  const updateRange = (e: any) => {
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
      <div
        className='menu menu-sub menu-sub-dropdown w-300px w-md-325px'
        data-kt-menu='true'
        id='kt_menu_63b3b3ba02686'
      >
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-5'>
            <div className='time position-relative' id='date-range-ref'>
              <DateRange onChange={(e: any) => updateRange(e)} />
            </div>
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Payment:</label>
            <PaymentMethodSelect paymentOptions={paymentOptions} cod={cod} setCod={setCod} />
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
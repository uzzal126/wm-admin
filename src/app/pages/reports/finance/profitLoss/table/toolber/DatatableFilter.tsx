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

  /* const updateLocalState = (prop: any, value: any) => {
    setState({...state, [prop]: value})
  } */

  const resetData = () => {
    setCod(''), updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    /* const startDate = state?.start_date || moment(new Date()).format('yyyy-MM-DD')
    const endDate = state?.end_date || moment(new Date()).format('yyyy-MM-DD') */
    updateState({
      filter: {
        payment_method_id: state?.payment_method || '',
        payment_method: cod,
        start_date: state?.start_date || moment(new Date()).format('yyyy-MM-DD'),
        end_date: state?.end_date || moment(new Date()).format('yyyy-MM-DD'),
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
            <label className='form-label fs-6 fw-bold'>Payment Methods:</label>
            {/* <PaymentMethodSelect callBack={(e: any) => updateLocalState('payment_method', e)} /> */}
            <PaymentMethodSelect paymentOptions={paymentOptions} cod={cod} setCod={setCod} />
            {/* <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='paymentMethod'
              data-hide-search='true'
              onChange={(e) => setCod(e.target.value)}
              value={cod}
            >
              <option value={''}>Select Payment Method</option>
              {Array.isArray(paymentOptions) && paymentOptions?.length > 0
                ? paymentOptions.map((item: any, indx: any) => (
                    <option value={item?.id} key={indx} selected={item?.id === cod}>
                      {item?.name || item?.title}
                    </option>
                  ))
                : ''}
            </select> */}
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
        </div>
      </div>
    </>
  )
}

export {DatatableFilter}

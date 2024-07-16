import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../_metronic/helpers'
import DateRange from '../../../../../../_metronic/partials/content/forms/dateRangePicker'
import {ORDER_PAYMENT_METHODS} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatatableFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [cod, setCod] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()
  const [date, setDate] = useState<any>({end_date: '', start_date: ''})
  const [paymentOptions, setPaymentOptions] = useState([])

  useEffect(() => {
    MenuComponent.reinitialization()
    getPaymentOptions()
  }, [])

  const getPaymentOptions = async () => {
    const res = await getQueryRequest(ORDER_PAYMENT_METHODS)
    if (res?.success) {
      setPaymentOptions(res?.data)
    }
  }

  const resetData = () => {
    setCod('0')
    setStatus('0')
    setDate({end_date: '', start_date: ''})
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {payment_method: cod, status: status, ...date},
      ...initialQueryState,
    })
  }
  const status_ids = [
    {
      id: 1,
      title: 'Order Placed',
    },
    {
      id: 2,
      title: 'Draft',
    },
    {
      id: 3,
      title: 'Confirmed',
    },
    {
      id: 4,
      title: 'Send to Courier',
    },
    {
      id: 5,
      title: 'Delivery In Progress',
    },
    {
      id: 7,
      title: 'Canceled',
    },
    {
      id: 9,
      title: 'Delivered',
    },
    {
      id: 10,
      title: 'Returned',
    },
  ]

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
        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-5'>
            <DateRange onChange={(e: any) => setDate(e)} />
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Payment Method:</label>
            <select
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
            </select>
          </div>

          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Status:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='status'
              data-hide-search='true'
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value={''}>Select Status </option>
              {status_ids.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.title}
                </option>
              ))}
              <option value='draft'>Draft</option>
            </select>
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

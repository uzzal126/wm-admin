import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../_metronic/helpers'
import DateRange from '../../../../../../_metronic/partials/content/forms/dateRangePicker'
import {getVisibilityStatusList} from '../../../../../../_metronic/partials/content/forms/publish-status/StatusHelper'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatatableFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [jobType, setJobType] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()
  const [date, setDate] = useState<any>({end_date: '', start_date: ''})
  const [statusList, setStatusList] = useState([])

  useEffect(() => {
    MenuComponent.reinitialization()
    getPaymentOptions()
  }, [])

  const getPaymentOptions = async () => {
    const status: any = await getVisibilityStatusList()
    setStatusList(status)
  }

  const resetData = () => {
    setJobType('')
    setStatus('')
    setDate({end_date: '', start_date: ''})
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {job_type: jobType, status: status, ...date},
      ...initialQueryState,
    })
  }

  const job_types = [
    {
      id: 1,
      title: 'Full-Time',
      value: 'Full-Time',
    },
    {
      id: 2,
      title: 'Part-Time',
      value: 'Part-Time',
    },
    {
      id: 3,
      title: 'Contractual',
      value: 'Contractual',
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
            <DateRange onChange={(e: any) => setDate(e)} title=' Deadline' />
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Job Type:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='paymentMethod'
              data-hide-search='true'
              onChange={(e) => setJobType(e.target.value)}
              value={jobType}
            >
              <option value={''}>Select Payment Method</option>
              {Array.isArray(job_types) && job_types?.length > 0
                ? job_types.map((item: any, indx: any) => (
                    <option value={item?.value} key={indx} selected={item?.value === jobType}>
                      {item?.title}
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
              {statusList.map((item: any, i: any) => (
                <option key={i} value={item.id}>
                  {item.title}
                </option>
              ))}
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

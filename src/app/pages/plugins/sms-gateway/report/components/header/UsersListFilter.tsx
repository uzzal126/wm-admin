import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../../../_metronic/helpers'
import DateRange from '../../../../../../../_metronic/partials/content/forms/dateRangePicker'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const UsersListFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [status, setStatus] = useState<any>()
  const [accountType, setAccountType] = useState<any>()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const [date, setDate] = useState<any>({end_date: '', start_date: ''})

  const statusList = [
    {
      id: 1,
      title: 'Pending',
      slug: 'pending',
    },
    {
      id: 2,
      title: 'Delivered',
      slug: 'delivered',
    },
    {
      id: 3,
      title: 'Canceled',
      slug: 'canceled',
    },
    {
      id: 4,
      title: 'Partially Delivered',
      slug: 'partially delivered',
    },
    {
      id: 5,
      title: 'Failed',
      slug: 'failed',
    },
    {
      id: 6,
      title: 'Submitted',
      slug: 'submitted',
    },
  ]

  const AccountTypes = [
    {
      id: 1,
      title: 'Non-Masking',
      slug: 'Non-Masking',
    },
    {
      id: 2,
      title: 'Masking',
      slug: 'masking',
    },
  ]

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setStatus('')
    setDate({end_date: '', start_date: ''})
    setAccountType(null)
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {
        account_type: accountType,
        status: status,
        ...date,
      },
      ...initialQueryState,
    })
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
        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-5'>
            <DateRange onChange={(e: any) => setDate(e)} title='(Submission Time)' />
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
              onChange={(e: any) => setStatus(e.target.value)}
              value={status}
            >
              <option>Select Status...</option>
              {statusList.map((item, i) => (
                <option key={i} value={item.slug} selected={item?.slug === status}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Account Type:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='status'
              data-hide-search='true'
              onChange={(e: any) => setAccountType(e.target.value)}
              value={accountType}
            >
              <option>Select Account Type...</option>
              {AccountTypes.map((item, i) => (
                <option key={i} value={item.slug} selected={item?.slug === accountType}>
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

export {UsersListFilter}

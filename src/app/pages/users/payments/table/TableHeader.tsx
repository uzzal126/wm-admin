import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {KTSVG, initialQueryState} from '../../../../../_metronic/helpers'
import DateRange from '../../../../../_metronic/partials/content/forms/dateRangePicker'
import {useQueryRequest} from '../core/QueryRequestProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'

const TableHeader = () => {
  const {updateState, state} = useQueryRequest()
  console.log('🚀 ~ file: TableHeader.tsx:10 ~ TableHeader ~ state:', state)
  const {isLoading} = useQueryResponse()
  const [role, setRole] = useState<number>(1)
  const [date, setDate] = useState<any>({end_date: '', start_date: ''})

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setDate({end_date: '', start_date: ''})
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {...date},
      ...initialQueryState,
    })
  }
  return (
    <>
      <div className='card-toolbar'>
        <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
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
        </div>
      </div>
    </>
  )
}

export {TableHeader}

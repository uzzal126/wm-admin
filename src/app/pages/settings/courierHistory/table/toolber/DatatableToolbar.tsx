import {useCallback} from 'react'
import swal from 'sweetalert'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {getCurrentSalesReport} from '../../../../../library/api.helper'
import {DatatableFilter} from './DatatableFilter'

const DatatableToolbar = () => {
  const exportData = useCallback((value: any) => {
    const callApi = async () => {
      const resp = await getCurrentSalesReport(value)
      if (resp.success) {
        window.open(resp.dump_file_url, '_blank', 'noopener,noreferrer')
      } else {
        swal('Sorry!', resp.message, 'error')
      }
    }
    callApi()
  }, [])

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <DatatableFilter />

      {/* begin::Export */}
      <div className='action'>
        <button
          type='button'
          className='btn btn-light-primary btn-sm me-3'
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-start'
        >
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
          Export
          <i className='fas fa-angle-down'></i>
        </button>
        <div
          className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4'
          data-kt-menu='true'
        >
          <div className='menu-item px-3'>
            <span className='menu-link px-3' onClick={() => exportData('excel')}>
              Excel
            </span>
          </div>
          <div className='menu-item px-3'>
            <span className='menu-link px-3' onClick={() => exportData('csv')}>
              CSV
            </span>
          </div>
        </div>
      </div>
      {/* end::Export */}
    </div>
  )
}

export {DatatableToolbar}

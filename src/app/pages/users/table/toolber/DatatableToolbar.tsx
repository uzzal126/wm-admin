import {KTSVG} from '../../../../../_metronic/helpers'
import {Can} from '../../../../../_metronic/redux/ability'
import {useListView} from '../../core/ListViewProvider'

const DatatableToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* begin::Export */}
      <Can access='Export' group='users'>
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
              <a href='#' className='menu-link px-3'>
                Excel
              </a>
            </div>
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                CSV
              </a>
            </div>
          </div>
        </div>
      </Can>
      {/* end::Export */}
      <Can access='User Add' group='users'>
        <button type='button' className='btn btn-sm btn-light-success' onClick={openAddUserModal}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Add User
        </button>
      </Can>
    </div>
  )
}

export {DatatableToolbar}

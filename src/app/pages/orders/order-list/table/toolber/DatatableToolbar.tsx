import {KTSVG} from '../../../../../../_metronic/helpers'
import {Can} from '../../../../../../_metronic/redux/ability'
import {Link} from '../../../../../modules/helper/linkHandler'
import {useListView} from '../../core/ListViewProvider'
import {DatatableFilter} from './DatatableFilter'
import ExcelExport from './excelExport'

const DatatableToolbar = () => {
  const {selected} = useListView()
  return (
    <div className='d-flex justify-content-end'>
      <div data-kt-user-table-toolbar='base'>
        <DatatableFilter />
      </div>
      {/* begin::Export */}
      <Can access='Export Order' group='orders'>
        <div className='action'>
          <button
            type='button'
            className='btn btn-light-primary btn-sm ms-3'
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
            {selected.length > 0 && (
              <>
                <div className='menu-item px-3'>
                  <Link
                    target={'_blank'}
                    // state={{oid: selected}}
                    onClick={() => localStorage.setItem('oid', JSON.stringify(selected))}
                    to={`/orders/bulkinvoice`}
                    className='menu-link px-3'
                  >
                    Generate Invoice
                  </Link>
                </div>
                <div className='menu-item px-3'>
                  <Link
                    // state={{oid: selected}}
                    target={'_blank'}
                    onClick={() => localStorage.setItem('ids', JSON.stringify(selected))}
                    to={`/orders/shipping-label`}
                    className='menu-link px-3'
                  >
                    Generate Label
                  </Link>
                </div>
              </>
            )}
            <ExcelExport />
          </div>
        </div>
      </Can>
      {/* end::Export */}
    </div>
  )
}

export {DatatableToolbar}

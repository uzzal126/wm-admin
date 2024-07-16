import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTSVG} from '../../../../../_metronic/helpers'
import StatusSelect from '../../../../../_metronic/partials/content/forms/publish-status'
import {useQueryResponse} from '../../../products/product-list/core/QueryResponseProvider'
import {useQueryRequest} from '../core/QueryRequestProvider'
import BlogCategorySelect from './BlogCategorySelect'

const BlogDataTableFilter = () => {
  const {updateState, state} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [role, setRole] = useState(null)
  const [catId, setCatId] = useState(null)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    const oldState: any = state
    const filter = {
      ...oldState?.filter,
      status: role,
      category_id_set: catId,
    }
    updateState({
      filter: filter,
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
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Status:</label>
            <StatusSelect className={''} callBack={(e: any) => setRole(e.id)} />
          </div>
          <div className='mb-5'>
            <label className='form-label fs-6 fw-bold'>Category:</label>

            <BlogCategorySelect callBack={(e: any) => setCatId(e.id)} catId={catId} />
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

export {BlogDataTableFilter}

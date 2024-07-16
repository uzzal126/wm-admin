/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../../../../_metronic/assets/ts/components'
import {SET_DEFAULT_COURIER} from '../../../../../../../../constants/api.constants'
import {queryRequest} from '../../../../../../../../library/api.helper'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const UserActionsCell = ({storeId}) => {
  const {id} = useParams()
  const {refetch} = useQueryResponse()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const setDefault = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to switch your default address!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (c) => {
      if (c) {
        const res = await queryRequest(SET_DEFAULT_COURIER, {
          db_courier_store_id: storeId,
          courier_partner_id: id,
        })
        if (res.message && res.status_code === 200) {
          toast.success(res.message)
          refetch()
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  return (
    <>
      <a
        href='#'
        className='btn-action rounded fw-bold bg-transparent border-transparent mx-3 min-w-25px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='fas fa-ellipsis-vertical text-black' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={() => setDefault()}>
            Set Default
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}

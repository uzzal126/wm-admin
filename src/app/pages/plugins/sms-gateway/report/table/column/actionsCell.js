/* eslint-disable jsx-a11y/anchor-is-valid */
import {Fragment, useEffect} from 'react'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {getLocal} from '../../../../../../modules/helper/misc'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {approveRequest, cancelRequest, deleteUser} from '../../core/_requests'

const ActionsCell = ({id, item}) => {
  const {setItemIdForUpdate, itemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const auth = getLocal('user')

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      refetch()
    },
  })
  const approve = useMutation({
    mutationFn: () => approveRequest({id}),
    onSuccess: () => {
      refetch()
    },
  })
  const cancel = useMutation({
    mutationFn: () => cancelRequest({id}),
    onSuccess: () => {
      refetch()
    },
  })

  const handleApprove = async () => {
    Swal.fire({
      title: 'Approve',
      text: 'Are you sure you want to approve the request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await approve.mutateAsync()
          if (res?.success) {
            toast.success(res?.message || 'Successfully approved request!')
          } else {
            toast.error(res?.message || 'Sorry! An error occured.')
          }
        } catch (err) {
          toast.error(err?.message || 'Sorry! An error occured.')
        }
      }
    })
  }
  const handleCancel = async () => {
    Swal.fire({
      title: 'Cancel',
      text: 'Are you sure you want to cancel the request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await cancel.mutateAsync()
          if (res?.success) {
            toast.success(res?.message || 'Successfully canceled request!')
          } else {
            toast.error(res?.message || 'Sorry! An error occured.')
          }
        } catch (err) {
          toast.error(err?.message || 'Sorry! An error occured.')
        }
      }
    })
  }

  const handlerDelete = async () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover the data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await deleteItem.mutateAsync()
          if (res.success && res.status_code) {
            toast.success(res?.message || 'Successfully deleted purchase request!')
          } else {
            toast.error(res.message)
          }
        } catch (err) {
          toast.error(err?.message || 'Sorry! An error occured.')
        }
      }
    })
  }

  return auth?.user?.role_id_string?.includes('1') ? (
    <>
      <button
        disabled={false}
        type='button'
        className='btn-action rounded fw-bold bg-transparent border-transparent mx-3 min-w-25px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='fas fa-ellipsis-vertical text-black' />
      </button>
      <div className='menu menu-sub text-start menu-sub-dropdown w-175px p-2' data-kt-menu='true'>
        {item?.status === 'Pending' && (
          <div onClick={openEditModal} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-primary'>
              <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit
            </span>
          </div>
        )}

        {item?.status === 'Pending' && (
          <div onClick={handleApprove} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-success'>
              <i className='fas fa-check fs-3 text-success'></i> Approve
            </span>
          </div>
        )}
        {item?.status === 'Pending' && (
          <div onClick={handleCancel} className='text-start btn btn-sm btn-light mb-2'>
            <span className='text-warning'>
              <i className='fas fa-window-close fs-3 text-warning'></i> Cancel
            </span>
          </div>
        )}
        {/* </Can> */}
        {/* <Can access='Delete Post' group='post'> */}
        <button className='text-start btn btn-sm btn-light' onClick={() => handlerDelete()}>
          <span className='text-danger'>
            <i className='la la-trash-o fs-3 text-danger'></i> Delete
          </span>
        </button>
        {/* </Can> */}
      </div>
    </>
  ) : (
    <>
      <button
        disabled={item?.status !== 'Pending'}
        type='button'
        className='btn-action rounded fw-bold bg-transparent border-transparent mx-3 min-w-25px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='fas fa-ellipsis-vertical text-black' />
      </button>
      <div className='menu menu-sub text-start menu-sub-dropdown w-175px p-2' data-kt-menu='true'>
        {item?.status === 'Pending' && (
          <Fragment>
            <div onClick={openEditModal} className='text-start btn btn-sm btn-light mb-2'>
              <span className='text-primary'>
                <i className='fas fa-pencil-alt fs-3 text-primary'></i> Edit
              </span>
            </div>

            <button className='text-start btn btn-sm btn-light' onClick={() => handlerDelete()}>
              <span className='text-danger'>
                <i className='la la-trash-o fs-3 text-danger'></i> Delete
              </span>
            </button>
          </Fragment>
        )}
      </div>
    </>
  )
}

export {ActionsCell}

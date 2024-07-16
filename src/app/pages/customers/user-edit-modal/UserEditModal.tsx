import {useEffect} from 'react'
import {UserEditModalHeader} from './UserEditModalHeader'
import {UserEditModalFormWrapper} from './UserEditModalFormWrapper'

const UserEditModal = () => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <UserEditModalHeader />
            {/* begin::Modal body */}
            <div className='modal-body mx-5'>
              <UserEditModalFormWrapper />
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}

export {UserEditModal}

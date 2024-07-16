import {useEffect} from 'react'
import {CouponEditModalFormWrapper} from './CouponEditModalFormWrapper'
import {CouponEditModalHeader} from './CouponEditModalHeader'

const CouponEditModal = () => {
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
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <CouponEditModalHeader />
            <div className='modal-body'>
              <CouponEditModalFormWrapper />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {CouponEditModal}

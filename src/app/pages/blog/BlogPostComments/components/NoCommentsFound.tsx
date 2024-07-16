import {Link} from 'react-router-dom'

export default function NoCommentsFound() {
  return (
    <div className='card-body p-0'>
      <div className='card-px text-center py-20 my-10'>
        <h2 className='fs-2x fw-bold mb-10'>No Comments Found</h2>
        <p className='text-gray-400 fs-4 fw-semibold mb-10'>
          Seems no comments had been added for this post yet.
        </p>
        <Link
          to='/blogs/index'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#kt_modal_add_customer'
        >
          Go Back
        </Link>
      </div>
      {/* <div className='text-center px-4'>
        <img className='mw-100 mh-300px' alt='' src='/media/illustrations/sketchy-1/2.png' />
      </div> */}
    </div>
  )
}

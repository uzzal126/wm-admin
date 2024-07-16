import React from 'react'

export function Overview() {
  return (
    <div className='card mb-5 mb-xxl-8'>
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bold mb-2 text-dark'>Activities</span>
          <span className='text-muted fw-semibold fs-7'>890,344 Sales</span>
        </h3>
      </div>
      <div className='card-body pt-5'>
        <div className='timeline-label'>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>08:42</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-warning fs-1'></i>
            </div>
            <div className='fw-mormal timeline-content text-muted ps-3'>
              Outlines keep you honest. And keep structure
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>10:00</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            <div className='timeline-content d-flex'>
              <span className='fw-bold text-gray-800 ps-3'>AEOL meeting</span>
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>14:37</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            <div className='timeline-content fw-bold text-gray-800 ps-3'>
              Make deposit
              <a href='#' className='text-primary'>
                USD 700
              </a>
              . to ESL
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>16:50</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Indulging in poorly driving and keep structure keep great
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>21:03</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            <div className='timeline-content fw-semibold text-gray-800 ps-3'>
              New order placed
              <a href='#' className='text-primary'>
                #XF-2356
              </a>
              .
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>16:50</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Indulging in poorly driving and keep structure keep great
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>21:03</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            <div className='timeline-content fw-semibold text-gray-800 ps-3'>
              New order placed
              <a href='#' className='text-primary'>
                #XF-2356
              </a>
              .
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>10:30</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Finance KPI Mobile app launch preparion meeting
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

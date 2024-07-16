import React, {FC} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useLayout} from '../../../../_metronic/layout/core'
import {useAuth} from '../../auth'

const Error500: FC = () => {
  const {currentUser} = useAuth()
  const {config} = useLayout()
  const {aside} = config

  return (
    <div className='d-flex flex-column flex-root'>
      {/*begin::Authentication - Error 500 */}
      <div className='d-flex flex-column flex-column-fluid'>
        {/*begin::Content*/}
        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-15'>
          {/*begin::Logo*/}
          <div className='mb-10 pt-lg-10'>
            {aside.theme === 'dark' && (
              <img
                alt='Logo'
                className='h-40px w-auto mb-5'
                src={
                  currentUser?.logo?.light_logo ||
                  toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo.png')
                }
              />
            )}
            {aside.theme === 'light' && (
              <img
                alt='Logo'
                className='h-40px w-auto mb-5'
                src={
                  currentUser?.logo?.dark_logo ||
                  toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo-white.png')
                }
              />
            )}
          </div>
          {/*end::Logo*/}
          {/*begin::Wrapper*/}
          <div className='pt-lg-10 mb-10'>
            {/*begin::Logo*/}
            <h1 className='fw-bolder fs-2qx text-gray-800 mb-10'>System Error</h1>
            {/*end::Logo*/}
            {/*begin::Message*/}
            <div className='fw-bold fs-3 text-muted mb-15'>
              Something went wrong!
              <br />
              Please try again later.
            </div>
            {/*end::Message*/}
            <button className='btn btn-sm btn-primary' onClick={() => window.location.replace('/')}>
              Back to Home
            </button>
          </div>
          {/*end::Wrapper*/}

          {/*begin::Illustration*/}
          <div
            className='d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px'
            style={{
              backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/sketchy-1/17.png')}')`,
            }}
          ></div>
          {/*end::Illustration*/}
        </div>
        {/*end::Content*/}
      </div>
      {/*end::Authentication - Error 500*/}
    </div>
  )
}

export {Error500}

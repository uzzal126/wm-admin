/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link, Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const ErrorsLayout = ({errors, btn = {}}) => {
  return (
    <div className='d-flex flex-column flex-root'>
      <div
        className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
        style={{backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/progress-hd.png')}')`}}
      >
        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
          <div className='pt-lg-10 mb-10'>
            <Outlet />
            <h1 className='fw-bolder fs-3x text-gray-700 mb-10'>
              We're sorry, Something went wrong
            </h1>

            <div className='fw-bold fs-2x text-gray-400 mb-15'>
              {errors || "We couldn't find the page, you looked for!"}
            </div>
            {btn && Object.keys(btn).length > 0 && (
              <Link
                className='btn btn-primary btn-sm'
                to={btn.url}
                onClick={() => {
                  if (btn.isRefresh) {
                    window.location.reload()
                  } else {
                    return null
                  }
                }}
              >
                {btn.text}
              </Link>
            )}
          </div>
          <div
            className='
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        '
            style={{
              backgroundImage: `url('${toAbsoluteUrl(
                '/media/illustrations/sigma-1/15-dark.png'
              )}')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const ErrorMessagesInPage = ({errors, btn = {}}) => <ErrorsLayout errors={errors} btn={btn} />

export {ErrorMessagesInPage}

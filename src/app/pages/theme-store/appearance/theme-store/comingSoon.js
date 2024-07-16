import {Can} from '../../../../../_metronic/redux/ability'
import {betterParse} from '../../../../modules/helper/misc'

const ComingSoon = ({data, themeChange, installTheme, btnLoading}) => {
  let screen_shot = betterParse(data?.screen_shot)

  return (
    <div className='col'>
      <div className='theme scroll-window p-4 shadow rounded-3 theme-item'>
        <div className='me-n9 ribbon ribbon-top ribbon-end ribbon-clip'>
          <div className='ribbon-label'>
            Coming Soon
            <span className='ribbon-inner bg-warning'></span>
          </div>
        </div>
        <h3 className='fs-5'>{data?.tittle}</h3>
        <div className='pt-5'>
          <img src={screen_shot?.desktop_view} alt='' className='img-fluid rounded' />
        </div>
        <div className='theme-action mt-6'>
          <div className='text-center'>
            <a
              href={data.live_link || ''}
              target='_blank'
              className='btn btn-sm btn-info me-4'
              rel='noreferrer'
            >
              Live Demo
            </a>
            {data?.installation_status === 0 ? (
              <Can access='Theme Install' group='shop'>
                <button
                  onClick={() => installTheme(data?.tid)}
                  className='btn btn-sm btn-danger'
                  disabled={btnLoading ? true : false}
                >
                  {!btnLoading && <span className='indicator-label'>Install Now</span>}
                  {btnLoading && (
                    <span className='indicator-progress d-block'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </Can>
            ) : (
              <Can access='Theme Customize' group='shop'>
                <button
                  onClick={() => themeChange(data?.tid)}
                  className='btn btn-sm btn-primary'
                  disabled={btnLoading ? true : false}
                >
                  {!btnLoading && <span className='indicator-label'>Customize theme</span>}
                  {btnLoading && (
                    <span className='indicator-progress d-block'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </Can>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon

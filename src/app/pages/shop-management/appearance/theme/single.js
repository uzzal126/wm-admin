import {Can} from '../../../../../_metronic/redux/ability'
import {betterParse} from '../../../../modules/helper/misc'
import PopupDetails from './popupDetails'

const Single = ({item, themeChange, installTheme, btnLoading}) => {
  let screen_shot = betterParse(item?.screen_shot)

  return (
    <div className='col'>
      <div
        className={`theme scroll-window p-4 shadow rounded-3 theme-item ${
          item?.installation_status === 1 && item?.is_active === 1 ? 'bg-light-primary' : ''
        }`}
      >
        <div className='me-n9 ribbon ribbon-top ribbon-end ribbon-clip'>
          <div className='ribbon-label'>
            {item?.payment_type}
            <span className='ribbon-inner bg-success'></span>
          </div>
        </div>
        <h3 className='fs-5'>{item?.tittle}</h3>
        <div className='pt-5'>
          <img src={screen_shot?.desktop_view} alt='' className='img-fluid rounded' />
        </div>
        <div className='theme-action mt-6'>
          <div className='text-center'>
            <a
              href={item.live_link || ''}
              target='_blank'
              className='btn btn-sm btn-info me-4'
              rel='noreferrer'
            >
              Live Demo
            </a>
            {item?.installation_status === 0 ? (
              <Can access='Theme Install' group='shop'>
                <button
                  onClick={() => installTheme(item?.tid)}
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
                  onClick={() => themeChange(item?.tid)}
                  className={`btn btn-sm  ${
                    item?.installation_status === 1 && item?.is_active === 0
                      ? 'btn-danger'
                      : 'btn-primary'
                  }`}
                  disabled={btnLoading ? true : false}
                >
                  {!btnLoading && (
                    <span className='indicator-label'>
                      {' '}
                      {item?.installation_status === 1 && item?.is_active === 1
                        ? 'Customize theme'
                        : item?.installation_status === 1 && item?.is_active === 0
                        ? 'Active Theme'
                        : 'Install Theme'}
                    </span>
                  )}
                  {btnLoading && (
                    <span className='indicator-progress d-block'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </Can>
            )}
            <PopupDetails item={item} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single

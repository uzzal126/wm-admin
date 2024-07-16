import {useRef} from 'react'
import {Can} from '../../../../../_metronic/redux/ability'
import {useAuth} from '../../../../modules/auth'
import {betterParse} from '../../../../modules/helper/misc'
import PopupDetails from './popupDetails'

const Single = ({item, themeChange, installTheme, btnLoading}) => {
  let screen_shot = betterParse(item?.screen_shot)
  const popupRef = useRef(null)
  const {auth} = useAuth()

  const themeBuyUrl = `https://www.webmanza.com/theme-buy` //https://www.webmanza.com/theme-buy

  return (
    <div className='col'>
      <div className='theme scroll-window p-4 shadow rounded-3 theme-item'>
        <div className='me-n9 ribbon ribbon-top ribbon-end ribbon-clip'>
          <div className='ribbon-label bg-transparent'>
            {item?.payment_type}
            <span
              className={`ribbon-inner ${
                item?.payment_type === 'FREE' ? 'bg-warning' : 'bg-primary'
              }`}
            ></span>
          </div>
        </div>
        <div className='pt-5'>
          <img
            src={screen_shot?.desktop_view}
            alt=''
            className='img-fluid rounded'
            style={{cursor: 'pointer'}}
            onClick={() => popupRef?.current?.click()}
          />
        </div>
        <div className='d-xl-flex flex-row my-3'>
          <div>
            <h5>{item?.tittle}</h5>
            <h6 className='my-1'>
              {item?.payment_type === 'FREE' ? item?.payment_type : `BDT ${item?.price}`}
            </h6>
          </div>
          <div className='theme-action my-2 ml-auto' style={{marginLeft: 'auto'}}>
            <div className='text-center d-flex flex-row align-items-center'>
              <PopupDetails item={item} className='me-3' />
              <a
                href={item.live_link || ''}
                target='_blank'
                className='live-demo-btn me-4'
                rel='noreferrer'
              >
                Live Demo
              </a>
              {item?.installation_status === 0 ? (
                <Can access='Theme Install' group='shop'>
                  {auth?.user?.role_id_string?.includes('1') && (
                    <button
                      onClick={() => installTheme(item?.tid)}
                      className='install-btn'
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
                  )}
                  {!auth?.user?.role_id_string?.includes('1') && item?.payment_type === 'FREE' ? (
                    <button
                      onClick={() => installTheme(item?.tid)}
                      className='install-btn'
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
                  ) : null}
                  {!auth?.user?.role_id_string?.includes('1') && item?.payment_type !== 'FREE' && (
                    <a
                      href={`${themeBuyUrl}?info=${JSON.stringify({
                        themeName: item?.tittle,
                        themePrice: item?.price,
                      })}`}
                      className='install-btn'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {<span className='indicator-label'>Buy Now</span>}
                    </a>
                  )}
                </Can>
              ) : (
                <Can access='Theme Customize' group='shop'>
                  <button
                    onClick={() => themeChange(item?.tid)}
                    className='btn btn-sm btn-danger'
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
              {/* <PopupDetails item={item} ref={popupRef} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single

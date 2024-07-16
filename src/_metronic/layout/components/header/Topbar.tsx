import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {getAuth} from '../../../../app/modules/auth'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu} from '../../../partials/layout/header-menus/HeaderNotificationsMenu'
import {HeaderUserMenu} from '../../../partials/layout/header-menus/HeaderUserMenu'
import {ThemeModeSwitcher} from '../../../partials/layout/theme-mode/ThemeModeSwitcher'
import {useLayout} from '../../core'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

type Props = {
  setFullScreen?: any
  isFullscreen?: any
}

const Topbar: FC<Props> = ({isFullscreen, setFullScreen}) => {
  const {config} = useLayout()
  const auth = getAuth()

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='d-flex align-items-center'>
        <a
          href={`https://${auth?.shop_info?.domain}`}
          target='_blank'
          className='btn btn-icon topbar-item px-3 px-lg-5'
          title='Visit Site'
          rel='noreferrer'
        >
          <i className='fas fa-globe fs-2 text-primary'></i>

          <span className='pulse-ring'></span>
        </a>
      </div>
      <div className='d-none d-lg-flex align-items-center'>
        <button
          className='btn btn-icon topbar-item px-3 px-lg-5'
          onClick={() => setFullScreen(!isFullscreen)}
        >
          <i className='fas fa-expand fs-2'></i>
        </button>
      </div>
      <div className='d-flex align-items-center'>
        <Link className='btn btn-icon topbar-item px-3 px-lg-5' to={'/support'}>
          <i className='fas fa-question-circle fs-2'></i>
          <span className='pulse-ring'></span>
        </Link>
      </div>
      <div className='align-items-center d-none d-lg-flex'>
        <ThemeModeSwitcher
          toggleBtnClass={'btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'}
        />
      </div>

      {/* NOTIFICATIONS */}
      {/* <div className={clsx('d-none d-lg-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary btn-custom',
            toolbarButtonHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen022.svg'
            className={toolbarButtonIconSizeClass}
          />
        </div>
        <HeaderNotificationsMenu />
      </div> */}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol border', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img src={auth?.user.avatar || toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}

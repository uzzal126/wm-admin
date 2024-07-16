/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useAuth } from '../../../../app/modules/auth'
import { Link } from '../../../../app/modules/helper/linkHandler'
import { toAbsoluteUrl } from '../../../helpers'
import { ThemeModeSwitcher } from '../theme-mode/ThemeModeSwitcher'
import { HeaderNotificationsMenu } from './HeaderNotificationsMenu'

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth()

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img
              alt='Logo'
              src={currentUser?.user.avatar || toAbsoluteUrl('/media/avatars/300-1.jpg')}
            />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>{currentUser?.user.name}</div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.user.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/profile'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      <div className='menu-item px-5 my-1'>
        <Link to='/profile/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>
      <div className="d-lg-none">
        <div className='separator my-2'></div>
        <div className="menu-item px-5 my-1 position-relative ">
          <ThemeModeSwitcher toggleBtnClass={'justify-content-start px-3 w-100 text-start'} label />
        </div>
        <div className={'menu-item px-5 my-1'}>
          <div
            className='px-4 '
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            Notifications
          </div>
          <HeaderNotificationsMenu />
        </div>
      </div>
      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }


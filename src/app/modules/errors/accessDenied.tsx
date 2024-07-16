import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {HeaderUserMenu} from '../../../_metronic/partials/layout/header-menus/HeaderUserMenu'
import {useAuth} from '../auth'
import {Link} from '../helper/linkHandler'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const AccessDenied = ({userPermission}: {userPermission: any}) => {
  const route = userPermission && userPermission.length > 0 ? userPermission[0].group_route : '/'
  const name =
    userPermission && userPermission.length > 0 ? userPermission[0].group_name : 'homepage'
  const {currentUser} = useAuth()

  return (
    <>
      <div className='container-fluid d-flex align-items-center justify-content-between px-8 py-3 bg-white'>
        <div className=''>
          <img
            alt='Logo'
            src={
              currentUser?.logo?.light_logo ||
              toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo.png')
            }
            className='h-50px'
          />
        </div>
        <div className=''>
          <div
            className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
            id='kt_header_user_menu_toggle'
          >
            {/* begin::Toggle */}
            <div
              className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
            >
              <img
                src={currentUser?.user.avatar || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                alt='user'
              />
            </div>
            <HeaderUserMenu />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-center flex-column vh-100'>
          <img src='/media/illustrations/access_denied.png' alt='' className='img-fluid' />

          <div className='pt-lg-10'>
            <div className='text-center'>
              <Link to={route} className='btn btn-lg btn-primary fw-bolder'>
                Go to {name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccessDenied

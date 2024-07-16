/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { useAuth } from '../../../../../app/modules/auth'
import { Link } from '../../../../../app/modules/helper/linkHandler'
import { toAbsoluteUrl } from '../../../../helpers'
import { useLayout } from '../../../core'
import { AsideMenu } from './AsideMenu'

const AsideDefault: FC = () => {
  const { config, classes } = useLayout()
  const { currentUser } = useAuth()
  const { aside } = config

  document.body.classList.add('aside-minimum-wrap')

  return (
    <div
      id='kt_aside'
      className={clsx('aside pb-5 pt-5 pt-lg-0 ', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'80px', '190px': '190px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto d-flex h-55px h-lg-65px px-8 align-items-center justify-content-center' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px logo'
              src={
                currentUser?.logo?.light_logo ||
                toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo-white.png')
              }
            />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px logo'
              src={
                currentUser?.logo?.dark_logo ||
                toAbsoluteUrl('/media/logos/Web-Manza-Final-Logo-white.png')
              }
            />
          </Link>
        )}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div
        className='aside-menu flex-column-fluid'
        style={{
          borderTop: '0.001rem solid rgb(83, 83, 83)',
        }}
      >
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}
    </div>
  )
}

export { AsideDefault }


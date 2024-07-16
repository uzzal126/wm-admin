/* eslint-disable react/jsx-no-target-blank */
import {Fragment} from 'react'
import {useSelector} from 'react-redux'
import {useMarketingTools} from '../../../../../app/hooks/useMarketingTools'
import {useAuth} from '../../../../../app/modules/auth'
import {Can} from '../../../../redux/ability'
import {RootState} from '../../../../redux/store'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'

const menuItems = [
  {
    menu_name: 'Dashboard',
    icon: '/media/aside-icons/dashboard-new.svg',
    icon_select: '/media/aside-icons/dashboard-new-select.svg',
    icon_type: 'svg',
    route: '/dashboard',
  },
  {
    menu_name: 'Manage Order',
    icon: '/media/aside-icons/manage-order.svg',
    icon_select: '/media/aside-icons/manage-order-select.svg',
    // icon_type: 'svg',
    route: '/orders/index',
  },
  // {
  //   menu_name: 'Wishlist',
  //   // icon: '/media/svg/webmanza/wishlist.svg',
  //   icon: '/media/aside-icons/Wishlist.svg',
  //   icon_select: '/media/aside-icons/Wishlist_Select.svg',
  //   icon_type: 'svg',
  //   route: '/wishlist/index',
  // },
  // {
  //   menu_name: 'Reviews',
  //   // icon: '/media/svg/webmanza/review.svg',
  //   icon: '/media/aside-icons/Review.svg',
  //   icon_select: '/media/aside-icons/Review_Select.svg',
  //   icon_type: 'svg',
  //   route: '/reviews/index',
  // },
  {
    menu_name: 'Customers',
    // icon: '/media/svg/webmanza/customers.svg',
    icon: '/media/aside-icons/customers.svg',
    icon_select: '/media/aside-icons/customers-select.svg',
    icon_type: 'svg',
    route: '/customers/index',
  },
  {
    menu_name: 'Reports',
    // icon: '/media/svg/webmanza/report.svg',
    icon: '/media/aside-icons/report.svg',
    icon_select: '/media/aside-icons/report-select.svg',
    icon_type: 'svg',
    route: '/reports',
  },
  {
    menu_name: 'Products',
    // icon: '/media/svg/webmanza/basket.svg',
    icon: '/media/aside-icons/products-new.svg',
    icon_select: '/media/aside-icons/products-new-select.svg',
    icon_type: 'svg',
    route: '/products/index',
  },
  {
    menu_name: 'Blog',
    // icon: '/media/svg/webmanza/blogicon.svg',
    icon: '/media/aside-icons/blog-new.svg',
    icon_select: '/media/aside-icons/blog-new-select.svg',
    icon_type: 'svg',
    route: '/blogs/index',
  },
  {
    menu_name: 'Theme Design',
    // icon: '/media/svg/webmanza/shop.svg',
    icon: '/media/aside-icons/theme-design.svg',
    icon_select: '/media/aside-icons/theme-design-select.svg',
    icon_type: 'svg',
    route: '/shop/theme',
  },
  {
    menu_name: 'Theme Store',
    // icon: '/media/svg/webmanza/shop.svg',
    icon: '/media/aside-icons/theme-store.svg',
    icon_select: '/media/aside-icons/theme-store-select.svg',
    icon_type: 'svg',
    route: '/theme-store',
  },
  {
    menu_name: 'Marketing',
    // icon: '/media/svg/webmanza/promotions.svg',
    icon: '/media/aside-icons/marketing-new.svg',
    icon_select: '/media/aside-icons/marketing-new-select.svg',
    icon_type: 'svg',
    route: '/marketing',
  },
  // {
  //   menu_name: 'Plugins',
  //   // icon: '/media/svg/webmanza/shop.svg',
  //   icon: '/media/aside-icons/plugins.svg',
  //   icon_select: '/media/aside-icons/plugins-select.svg',
  //   icon_type: 'svg',
  //   route: '/plugins',
  // },
  {
    menu_name: 'Settings',
    // icon: '/media/svg/webmanza/settings.svg',
    icon: '/media/aside-icons/settings.svg',
    icon_select: '/media/aside-icons/settings-select.svg',
    icon_type: 'svg',
    route: '/settings',
  },
  {
    menu_name: 'Users',
    // icon: '/media/svg/webmanza/users.svg',
    icon: '/media/aside-icons/users-new.svg',
    icon_select: '/media/aside-icons/users-new-select.svg',
    icon_type: 'svg',
    route: '/users',
  },
  {
    menu_name: 'Customer Support',
    // icon: '/media/svg/webmanza/users.svg',
    icon: '/media/aside-icons/users-new.svg',
    icon_select: '/media/aside-icons/users-new-select.svg',
    icon_type: 'svg',
    route: '/customer-support',
  },
  {
    menu_name: 'Job Portal',
    // icon: '/media/icons/duotune/general/gen005.svg',
    icon: '/media/aside-icons/job-portal.svg',
    icon_select: '/media/aside-icons/job-portal-select.svg',
    icon_type: 'svg',
    route: '/career/jobs/index',
  },
  {
    menu_name: 'SMS Gateway',
    // icon: '/media/icons/duotune/general/gen005.svg',
    icon: '/media/aside-icons/sms-gateway.svg',
    icon_select: '/media/aside-icons/sms-gateway-selected.svg',
    icon_type: 'svg',
    route: '/marketing/sms-gateway/index',
  },
  {
    menu_name: 'Profile',
    // icon: '/media/svg/webmanza/user.svg',
    icon: '/media/aside-icons/users-new.svg',
    icon_select: '/media/aside-icons/users-new-select.svg',
    icon_type: 'svg',
    route: '/profile',
  },
]

export function AsideMenuMain() {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {marketingTools} = useMarketingTools()

  const showJobPortal = () => {
    const el = marketingTools.filter((e: any) => e.slug === 'career')[0]
    if (el) {
      return el?.installation_status === 1
    }

    return false
  }

  const showSmsGateway = () => {
    const el = marketingTools.filter((e: any) => e?.slug?.includes('sms'))[0]
    if (el) {
      return el?.installation_status === 1
    }

    return false
  }

  const {data}: any = response || {}
  const {data: userPermission} = data || []
  const {auth} = useAuth()

  return (
    <>
      {userPermission &&
        userPermission.length > 0 &&
        userPermission.map((menu: any, i: any) => {
          const menuItem = menuItems.find((f) => f.route.includes(menu?.group_route))
          return (
            menuItem && (
              <Fragment key={i}>
                {menuItem.route === '/profile' ? (
                  <></>
                ) : menuItem.route === '/customer-support' ? (
                  <AsideMenuItemWithSub
                    to={menuItem?.route}
                    title={menuItem?.menu_name}
                    fontIcon='bi-chat-left'
                    icon={menuItem?.icon}
                    iconSelect={menuItem.icon_select}
                    iconType={menuItem.icon_type}
                  >
                    <AsideMenuItem
                      to={'/customer-support/stp-list'}
                      title={'Customer Support'}
                      hasBullet={true}
                      className='flex-row'
                    />
                    <AsideMenuItem
                      to={'/customer-support/eo-list'}
                      title={'EO List'}
                      hasBullet={true}
                      className='flex-row'
                    />
                  </AsideMenuItemWithSub>
                ) : menuItem.route === '/users' ? (
                  <AsideMenuItemWithSub
                    to={menuItem?.route}
                    title={
                      menuItem?.menu_name.includes('Shop Design')
                        ? 'Theme Design'
                        : menuItem?.menu_name
                    }
                    fontIcon='bi-chat-left'
                    icon={menuItem?.icon}
                    iconSelect={menuItem.icon_select}
                    iconType={menuItem.icon_type}
                  >
                    <Can access='User list' group='users'>
                      <AsideMenuItem
                        to={'/users/index'}
                        title={'Manage User'}
                        hasBullet={true}
                        className='flex-row'
                      />
                    </Can>
                    {auth?.user?.role_id_string?.includes('1') && (
                      <AsideMenuItem
                        to={'/users/store-switch'}
                        title={'Store Switch'}
                        hasBullet={true}
                        className='flex-row'
                      />
                    )}
                    {auth?.user?.role_id_string?.includes('1') && (
                      <AsideMenuItem
                        to={'/users/payments'}
                        title={'Payments'}
                        hasBullet={true}
                        className='flex-row'
                      />
                    )}

                    <Can access='Permissions List' group='users'>
                      <AsideMenuItem
                        to={'/users/permissions'}
                        title={'Permissions'}
                        hasBullet={true}
                        className='flex-row'
                      />
                    </Can>
                    <Can access='Roles List' group='users'>
                      <AsideMenuItem
                        to={'/users/roles'}
                        title={'Roles'}
                        hasBullet={true}
                        className='flex-row'
                      />
                    </Can>
                  </AsideMenuItemWithSub>
                ) : menuItem.route === '/career/jobs/index' ? (
                  showJobPortal() ? (
                    <AsideMenuItem
                      key={i}
                      to={menuItem?.route}
                      icon={menuItem?.icon}
                      iconSelect={menuItem?.icon_select}
                      iconType={menuItem?.icon_type}
                      title={menuItem?.menu_name}
                      fontIcon='bi-app-indicator'
                    />
                  ) : (
                    <></>
                  )
                ) : menuItem.route === '/marketing/sms-gateway/index' ? (
                  showSmsGateway() ? (
                    <AsideMenuItem
                      key={i}
                      to={menuItem?.route}
                      icon={menuItem?.icon}
                      iconSelect={menuItem?.icon_select}
                      iconType={menuItem?.icon_type}
                      title={menuItem?.menu_name}
                      fontIcon='bi-app-indicator'
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <AsideMenuItem
                    key={i}
                    to={menuItem?.route}
                    icon={menuItem?.icon}
                    iconType={menuItem.icon_type}
                    iconSelect={menuItem.icon_select}
                    title={
                      menuItem?.menu_name.includes('Theme Design')
                        ? auth?.shop_info?.store_cat_id === 20
                          ? 'Blog Design'
                          : menuItem?.menu_name
                        : menuItem?.menu_name
                    }
                    fontIcon='bi-app-indicator'
                  />
                )}
                {menu?.group_route.includes('/dashboard') && (
                  <div className='menu-item'>
                    <div
                      className='menu-content'
                      style={{
                        borderTop: '0.001rem solid rgb(83, 83, 83)',
                      }}
                    />
                  </div>
                )}
              </Fragment>
            )
          )
        })}
      {/* <AsideMenuItem
        to={'/profile'}
        icon={'/media/aside-icons/Profile.svg'}
        iconSelect={'/media/aside-icons/Profile_Select.svg'}
        iconType='svg'
        title={'Profile'}
        fontIcon='bi-app-indicator'
      /> */}
    </>
  )
}

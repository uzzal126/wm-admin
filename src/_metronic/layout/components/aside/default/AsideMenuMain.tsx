/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen025.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>eCommerce</span>
        </div>
      </div>
      <AsideMenuItem
        to='/products/index'
        icon='/media/icons/duotune/ecommerce/ecm002.svg'
        title='Products'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/orders'
        icon='/media/icons/duotune/general/gen032.svg'
        title='Orders'
        fontIcon='bi-layers'
      />
      {/* <AsideMenuItem
        to='/inventory'
        icon='/media/icons/duotune/ecommerce/ecm008.svg'
        title='Inventory'
        fontIcon='bi-layers'
      /> */}

      <AsideMenuItemWithSub
        to='/reports'
        title='Reports'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/graphs/gra008.svg'
      >
        <AsideMenuItem to='/reports/order' title='Sales Reports' hasBullet={true} />
        <AsideMenuItem to='/reports/stock' title='Inventory Reports' hasBullet={true} />
        <AsideMenuItem to='/reports/statistics' title='Statistics' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Shop Management</span>
        </div>
      </div>
      {/* <AsideMenuItem
        to='/pages'
        icon='/media/icons/duotune/layouts/lay001.svg'
        title='Pages'
        fontIcon='bi-layers'
      /> */}
      <AsideMenuItemWithSub
        to='/appearance'
        title='Appearance'
        icon='/media/icons/duotune/abstract/abs027.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/appearance/theme' title='Theme' hasBullet={true} />
        <AsideMenuItem to='/appearance/pages' title='Pages' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/settings'
        icon='/media/icons/duotune/coding/cod001.svg'
        title='Settings'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/marketing'
        icon='/media/icons/duotune/ecommerce/ecm011.svg'
        title='Marketing'
        fontIcon='bi-layers'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>User Management</span>
        </div>
      </div>

      <AsideMenuItem
        to='/wishlist'
        icon='/media/icons/duotune/general/gen030.svg'
        title='Wishlist'
        fontIcon='bi-layers'
      />

      <AsideMenuItem
        to='/reviews'
        icon='/media/icons/duotune/abstract/abs024.svg'
        title='Reviews'
        fontIcon='bi-layers'
      />

      <AsideMenuItem
        to='/customers'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Customers'
        fontIcon='bi-layers'
      />

      <AsideMenuItemWithSub
        to='/users'
        title='Users'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com014.svg'
      >
        <AsideMenuItem to='/users/all' title='All Users' hasBullet={true} />
        <AsideMenuItem to='/users/permissions' title='Permissions' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItem
        to='/profile'
        icon='/media/icons/duotune/communication/com013.svg'
        title='Profile'
        fontIcon='bi-layers'
      />
    </>
  )
}

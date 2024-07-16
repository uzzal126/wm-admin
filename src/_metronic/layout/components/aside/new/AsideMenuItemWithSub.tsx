import clsx from 'clsx'
import React, {useState} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {useLocation} from 'react-router'
import {KTSVG, checkIsActive} from '../../../../helpers'
import {useLayout} from '../../../core'

type Props = {
  to: string
  title: string
  icon?: string
  iconSelect?: string
  iconType?: string
  fontIcon?: string
  hasBullet?: boolean
  children: any
}

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  iconSelect,
  iconType,
  fontIcon,
  hasBullet,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const [hoveredElementId, setHoveredElementId] = useState(null)
  const {config} = useLayout()
  const {aside} = config

  const handleMouseEnter = (event: any, id: any) => {
    setHoveredElementId(id)
  }

  const handleMouseLeave = () => {
    setHoveredElementId(null)
  }

  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      onMouseEnter={(event) => handleMouseEnter(event, to)}
      onMouseLeave={handleMouseLeave}
      data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
    >
      <>
        <span className='menu-link'>
          {hasBullet && (
            <span className='menu-bullet'>
              <span className='bullet bullet-dot'></span>
            </span>
          )}
          {icon &&
            aside.menuIcon === 'svg' &&
            (iconType === 'image' ? (
              <span className='menu-icon me-0 mb-1 w-40px'>
                <img
                  src={
                    isActive && iconSelect
                      ? iconSelect
                      : hoveredElementId === to
                      ? iconSelect
                      : icon
                  }
                  height={30}
                  width={30}
                  alt='aside-menu-item'
                />
              </span>
            ) : (
              <span className='menu-icon me-0 mb-1 w-40px'>
                <KTSVG
                  path={
                    isActive && iconSelect
                      ? iconSelect
                      : hoveredElementId === to
                      ? iconSelect
                      : icon
                  }
                  className='svg-icon-2x'
                />
              </span>
            ))}
          {fontIcon && aside.menuIcon === 'font' && (
            <span className='menu-icon me-0'>
              <i className={clsx('bi', fontIcon, 'fs-2')}></i>
            </span>
          )}
          <span className='menu-title'>{title}</span>
        </span>
      </>

      <div
        className={clsx(
          'menu-sub menu-sub-dropdown menu-sub-indention px-2 py-4 w-250px mh-75 overflow-auto',
          {'menu-active-bg': isActive}
        )}
      >
        {children}
      </div>
    </div>
  )
}

export {AsideMenuItemWithSub}

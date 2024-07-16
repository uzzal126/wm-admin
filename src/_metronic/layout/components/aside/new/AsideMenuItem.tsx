import clsx from 'clsx'
import React, {useState} from 'react'
import {useLocation} from 'react-router'
import {Link} from '../../../../../app/modules/helper/linkHandler'
import {isActiveMenuItem, KTSVG} from '../../../../helpers'
import {useLayout} from '../../../core'

type Props = {
  to: string
  title: string
  icon?: string
  iconSelect?: string
  iconType?: string
  fontIcon?: string
  className?: string
  hasBullet?: boolean
  children?: any
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  iconSelect,
  iconType,
  fontIcon,
  className,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const isActive = isActiveMenuItem(pathname, to)
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
      className='menu-item'
      onMouseEnter={(event) => handleMouseEnter(event, to)}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        className={clsx(`menu-link w-100 ${className || 'flex-column'}`, {
          active: isActive,
        })}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon &&
          aside.menuIcon === 'svg' &&
          (iconType === 'image' ? (
            <span className='menu-icon'>
              <img
                src={
                  isActive && iconSelect ? iconSelect : hoveredElementId === to ? iconSelect : icon
                }
                height={30}
                width={30}
                alt='aside-menu-item'
              />
            </span>
          ) : (
            <span className='menu-icon'>
              <KTSVG
                path={
                  isActive && iconSelect ? iconSelect : hoveredElementId === to ? iconSelect : icon
                }
                className='svg-icon-2x'
              />
            </span>
          ))}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title' style={{color: hasBullet ? 'auto' : '#ffffff'}}>
          {title}
        </span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}

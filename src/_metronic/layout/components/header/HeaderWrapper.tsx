/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import { Link } from '../../../../app/modules/helper/linkHandler'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { Topbar } from './Topbar'
import { DefaultTitle } from './page-title/DefaultTitle'

type Props = {
  setFullScreen?: any
  isFullscreen?: any
}

export const HeaderWrapper: React.FC<Props> = ({ isFullscreen, setFullScreen, }) => {
  const { config, classes, attributes } = useLayout()
  const { header, aside } = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/svg/webmanza/Burgermenu.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-0'>
            <Link to='/dashboard' className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/Web-Manza-Fabicon.png')}
                className='h-30px'
              />
            </Link>
          </div>
        )}
        {/* end::Logo */}


        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-grow-1'>
          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar
              isFullscreen={isFullscreen}
              setFullScreen={setFullScreen}
            />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}

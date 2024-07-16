import React, {PropsWithChildren, useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '../core'
import {DrawerComponent} from '../../assets/ts/components'

interface ChildrenProps {
  children?: any;
}

const Content: React.FC<PropsWithChildren<ChildrenProps>> = ({ children } :any) => {
  const {classes} = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className={clsx('px-4', classes.contentContainer.join(' '))}>
      {children}
    </div>
  )
}

export {Content}

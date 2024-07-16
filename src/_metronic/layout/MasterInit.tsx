import {useEffect, useRef} from 'react'
import {getAuth} from '../../app/modules/auth'
import {packageValid} from '../../app/modules/helper/expire'
import {setLinksEnabled} from '../../app/modules/helper/linkHandler'
import {
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
  SwapperComponent,
} from '../assets/ts/components'

import {useLayout} from './core'

export function MasterInit() {
  const {config} = useLayout()
  const auth = getAuth()
  const isFirstRun = useRef(true)
  const pluginsInitialization = () => {
    isFirstRun.current = false
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
    }, 500)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      pluginsInitialization()
    }
    setLinksEnabled(packageValid(auth?.shop_info?.expire_time))
  }, [config])

  return <></>
}

import {Suspense, useEffect, useState} from 'react'
import {CookiesProvider} from 'react-cookie'
import {Helmet} from 'react-helmet'
import {Outlet, useLocation} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'

import {ThemeModeProvider} from '../_metronic/partials/layout/theme-mode/ThemeModeProvider'

import {authApi} from '../_metronic/redux/slices/auth'
import {useAppDispatch} from '../_metronic/redux/store'
import {AuthInit, useAuth} from './modules/auth'
import {packageValid} from './modules/helper/expire'

const App = () => {
  const {currentUser, logout} = useAuth()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if (currentUser && !packageValid(currentUser?.shop_info?.expire_time)) {
      if (location.pathname !== '/profile/renew' && !location.pathname.includes('payment'))
        window.location.href = '/profile/renew'
    }
    const userPartitions = async () => {
      if (!currentUser) {
        const res = await dispatch(
          authApi.endpoints.getUserPermissions.initiate(undefined)
        ).unwrap()
        setLoading(false)
        if (res && !res?.success && (res.status_code === 601 || res.status_code === 602)) {
          console.log(res)
          logout()
        }
      }
    }
    userPartitions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <CookiesProvider>
      <Suspense fallback={<LayoutSplashScreen visible={!loading} />}>
        {currentUser?.shop_info && (
          <Helmet>
            <title>{currentUser?.shop_info.business_name || 'WebManza Admin'}</title>
            <meta
              name='description'
              content={
                `${currentUser?.shop_info?.business_name} ${currentUser?.shop_info.store_name}` ||
                ''
              }
            />
            <link rel='shortcut icon' href={currentUser?.logos?.fav_icon} />
          </Helmet>
        )}
        <I18nProvider>
          <ThemeModeProvider>
            <LayoutProvider>
              <AuthInit>
                <Outlet />
                <MasterInit />
              </AuthInit>
            </LayoutProvider>
          </ThemeModeProvider>
        </I18nProvider>
      </Suspense>
    </CookiesProvider>
  )
}

export {App}

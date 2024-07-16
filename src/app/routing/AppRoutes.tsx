/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {useSelector} from 'react-redux'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {RootState} from '../../_metronic/redux/store'
import {App} from '../App'
import {AuthPage, Logout, useAuth} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import AccessDenied from '../modules/errors/accessDenied'
import {packageValid} from '../modules/helper/expire'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import StoreOnboard from '../pages/onboard'
import PaymentPage from '../pages/payment'
import {PrivateRoutes} from './PrivateRoutes'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()

  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='onboard/*' element={<StoreOnboard />} />
          <Route path='payment/*' element={<PaymentPage />} />
          {currentUser ? (
            <>
              <Route
                path='/access-denied'
                element={<AccessDenied userPermission={userPermission} />}
              />
              <Route path='/*' element={<PrivateRoutes />} />
              {packageValid(currentUser?.shop_info?.expire_time) ? (
                <>
                  
                  <Route
                    index
                    element={
                      <Navigate
                        to={
                          (userPermission &&
                            userPermission.length > 0 &&
                            userPermission[0].group_route) ||
                          '/dashboard'
                        }
                      />
                    }
                  />
                </>
              ) : (
                <>
                  <Route element={<MasterLayout />}>
                    <Route path='/dashboard' element={<DashboardWrapper />} />
                    <Route path='auth/*' element={<DashboardWrapper />} />
                    <Route
                      index
                      element={
                        <Navigate
                          to={
                            (userPermission &&
                              userPermission.length > 0 &&
                              userPermission[0].group_route) ||
                            '/dashboard'
                          }
                        />
                      }
                    />
                  </Route>
                </>
              )}
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}

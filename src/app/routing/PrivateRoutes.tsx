import {FC, lazy, PropsWithChildren, Suspense} from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {RootState} from '../../_metronic/redux/store'
import Blogs from '../pages/blog/blogPage'
import CustomerSupportPage from '../pages/customer-service'
import Customers from '../pages/customers'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import Jobs from '../pages/job-post'
import MarketingPage from '../pages/marketing'
import InvoiceManagement from '../pages/orders/pdfViewer'
import Bulkinvoice from '../pages/orders/pdfViewer/bulkinvoice'
import GeneralInvoice from '../pages/orders/pdfViewer/GeneralInvoice'
import GenerateLabel from '../pages/orders/pdfViewer/GenerateLabel'
import PluginsgPage from '../pages/plugins'
import ProfilePage from '../pages/profile'
import ReportPages from '../pages/reports/ReportsPages'
import ReviewPage from '../pages/reviews'
import Settings from '../pages/settings'
import Appearance from '../pages/shop-management/appearance'
import SupportPage from '../pages/support'
import AppearanceThemeStore from '../pages/theme-store/appearance'
import UsersPage from '../pages/users'
import WishlistPage from '../pages/wishlist'

const PrivateRoutes = () => {
  const ProductPage = lazy(() => import('../pages/products/ProductPage'))
  const OrderPage = lazy(() => import('../pages/orders/OrderPage'))

  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []

  /* console.log(
    'theme store',
    userPermission?.filter((f: any) => f.group_route.includes('dashboard'))
  ) */

  if (userPermission && userPermission.length <= 0) {
    window.location.href = '/access-denied'
  }
  return (
    userPermission &&
    userPermission.length > 0 && (
      <Routes>
        <Route path='orders/template' element={<InvoiceManagement />} />

        <Route path='orders/invoice' element={<GeneralInvoice />} />
        <Route path='orders/bulkinvoice' element={<Bulkinvoice />} />
        <Route path='orders/shipping-label' element={<GenerateLabel />} />
        <Route element={<MasterLayout />}>
          <Route path='support' element={<SupportPage />} />
          <Route path='auth/*' element={<Navigate to={'/dashboard'} />} />
          {/* Pages */}
          {userPermission.filter((f: any) => f.group_route.includes('dashboard')).length > 0 && (
            <Route path='dashboard' element={<DashboardWrapper />} />
          )}
          {/* Lazy Modules */}
          {userPermission.filter((f: any) => f.group_route.includes('products')).length > 0 && (
            <Route
              path='products/*'
              element={
                <SuspensedView>
                  <ProductPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('orders')).length > 0 && (
            <Route
              path='orders/*'
              element={
                <SuspensedView>
                  <OrderPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('reports')).length > 0 && (
            <Route
              path='reports/*'
              element={
                <SuspensedView>
                  <ReportPages />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('customers')).length > 0 && (
            <Route
              path='customers/*'
              element={
                <SuspensedView>
                  <Customers />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('wishlist')).length > 0 && (
            <Route
              path='wishlist/*'
              element={
                <SuspensedView>
                  <WishlistPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('reviews')).length > 0 && (
            <Route
              path='reviews/*'
              element={
                <SuspensedView>
                  <ReviewPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('users')).length > 0 && (
            <Route
              path='users/*'
              element={
                <SuspensedView>
                  <UsersPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('customer-support')).length >
            0 && (
            <Route
              path='customer-support/*'
              element={
                <SuspensedView>
                  <CustomerSupportPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('jobs')).length > 0 && (
            <Route
              path='career/jobs/*'
              element={
                <SuspensedView>
                  <Jobs />
                </SuspensedView>
              }
            />
          )}
          <Route
            path='profile/*'
            element={
              <SuspensedView>
                <ProfilePage />
              </SuspensedView>
            }
          />
          <Route
            path='blogs/*'
            element={
              <SuspensedView>
                <Blogs />
              </SuspensedView>
            }
          />
          <Route
            path='jobs/*'
            element={
              <SuspensedView>
                <Jobs />
              </SuspensedView>
            }
          />
          {userPermission.filter((f: any) => f.group_route.includes('theme-store')).length > 0 && (
            <Route
              path='theme-store'
              element={
                <SuspensedView>
                  <AppearanceThemeStore />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('settings')).length > 0 && (
            <Route
              path='settings'
              element={
                <SuspensedView>
                  <Settings />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('shop')).length > 0 && (
            <Route
              path='shop/*'
              element={
                <SuspensedView>
                  <Appearance />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('marketing')).length > 0 && (
            <Route
              path='marketing/*'
              element={
                <SuspensedView>
                  <MarketingPage />
                </SuspensedView>
              }
            />
          )}
          {userPermission.filter((f: any) => f.group_route.includes('plugins')).length > 0 && (
            <Route
              path='plugins/*'
              element={
                <SuspensedView>
                  <PluginsgPage />
                </SuspensedView>
              }
            />
          )}
          <Route path='*' element={<Navigate to='/error/404' />} />
        </Route>
      </Routes>
    )
  )
}

interface ChildrenProps {
  children: any
}

const SuspensedView: FC<PropsWithChildren<ChildrenProps>> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}

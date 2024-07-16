import {useSelector} from 'react-redux'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {BackLink, PageTitle} from '../../../_metronic/layout/core'
import {RootState} from '../../../_metronic/redux/store'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {Wishlist} from '../wishlist/list'
import {CustomOrder} from './custom/CustomOrder'
import OrderEdit from './edit/OrderEdit'
import {OrdertListWrapper} from './order-list/OrdertListWrapper'
import RequestOrderEdit from './request/edit/RequestOrderEdit'
import {RequestOrders} from './request/RequestOrders'

const PageBack: Array<BackLink> = [
  {
    title: 'Back Orders',
    path: '/orders/index',
  },
]
const RequestPageBack: Array<BackLink> = [
  {
    title: 'Back Request',
    path: '/orders/request',
  },
]

const OrderPage = () => {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []
  let orderItems =
    (userPermission && userPermission.filter((f: any) => f.group_route.includes('orders'))) || []
  orderItems = orderItems.length > 0 ? orderItems[0] : {}

  const orderRoutes =
    Object.keys(orderItems).length > 0
      ? [
          ...orderItems.permissions.filter((f: any) => f.route !== ''),
          {
            id: 9966,
            name: 'Wishlist',
            route: '/wishlist',
          },
        ]
      : []
  return (
    <Routes>
      {orderRoutes.length > 0 && (
        <Route element={<Outlet />}>
          {orderRoutes.find((f: any) => f.route.includes('index')) && (
            <Route
              path='index'
              element={
                <>
                  <PageTitle>Order List</PageTitle>
                  <OrdertListWrapper />
                </>
              }
            />
          )}
          {orderRoutes.find((f: any) => f.route.includes('request')) && (
            <Route
              path='request'
              element={
                <>
                  <PageTitle>Request Orders</PageTitle>
                  <RequestOrders />
                </>
              }
            />
          )}
          {orderRoutes.find((f: any) => f.route.includes('request/edit')) && (
            <Route
              path='request/edit/:id'
              element={
                <>
                  <PageTitle backLink={RequestPageBack}>Edit Request</PageTitle>
                  <RequestOrderEdit />
                </>
              }
            />
          )}
          {orderRoutes.find((f: any) => f.route.includes('/edit/:id')) && (
            <Route
              path='edit/:id/:invoice'
              element={
                <>
                  <PageTitle backLink={PageBack}>Edit Order</PageTitle>
                  <OrderEdit />
                </>
              }
            />
          )}
          {orderRoutes.find((f: any) => f.route.includes('/custom')) && (
            <Route
              path='custom'
              element={
                <>
                  <PageTitle backLink={PageBack}>Create Order</PageTitle>
                  <CustomOrder />
                </>
              }
            />
          )}
          {orderRoutes.find((f: any) => f.route.includes('/wishlist')) && (
            <Route
              path='wishlist'
              element={
                <>
                  <PageTitle backLink={PageBack}>Wishlist</PageTitle>
                  <Wishlist />
                </>
              }
            />
          )}
        </Route>
      )}
      <Route
        path='/*'
        element={
          <>
            <PageTitle backLink={PageBack}>Page not Found</PageTitle>
            <ErrorMessagesInPage errors='' />
          </>
        }
      />
      <Route index element={<Navigate to='/orders/index' />} />
    </Routes>
  )
}

export default OrderPage

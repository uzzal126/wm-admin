import {useSelector} from 'react-redux'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {CustomerWrapper} from './CustomerWrapper'
import CustomerView from './view/CustomerView'
const PageBack = [
  {
    title: 'Back Customer',
    path: '/customers',
  },
]
const Customers = () => {
  const response = useSelector((state) => state.api.queries['getUserPermissions(undefined)'])
  const {data} = response || {}
  const {data: userPermission} = data || []
  let customerItems =
    (userPermission && userPermission.filter((f) => f.group_route.includes('customers'))) || []
  customerItems = customerItems.length > 0 ? customerItems[0] : {}

  const customerRoutes =
    Object.keys(customerItems).length > 0
      ? customerItems.permissions.filter((f) => f.route !== '')
      : []
  return (
    <Routes>
      {customerRoutes.length > 0 && (
        <Route element={<Outlet />}>
          {customerRoutes.find((f) => f.route.includes('index')) && (
            <Route
              path='/index'
              element={
                <>
                  <PageTitle>Customer list</PageTitle>
                  <CustomerWrapper />
                </>
              }
            />
          )}
          {customerRoutes.find((f) => f.route.includes('edit')) && (
            <Route
              path='/edit/:id'
              element={
                <>
                  <PageTitle backLink={PageBack}>Customer</PageTitle>
                  <CustomerView />
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
            <PageTitle>Page not Found</PageTitle>
            <ErrorMessagesInPage errors='' />
          </>
        }
      />
      <Route index element={<Navigate to='/customers/index' />} />
    </Routes>
  )
}

export default Customers

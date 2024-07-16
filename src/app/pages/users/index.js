import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {CustomerWrapper} from './CustomerWrapper'
import {PaymentWrapper} from './payments'
import PermissionsPage from './permissions'
import RoleManagement from './roles'
import RoleAdd from './roles/mutation/add'
import RoleEdit from './roles/mutation/edit'
import RoleView from './roles/view'
import StoreSwitch from './store-switch'

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/index'
          element={
            <>
              <PageTitle>User list</PageTitle>
              <CustomerWrapper />
            </>
          }
        />
        <Route
          path='/payments'
          element={
            <>
              <PageTitle>Payments</PageTitle>
              <PaymentWrapper />
            </>
          }
        />
        <Route
          path='/roles'
          element={
            <>
              <PageTitle>Roles Management</PageTitle>
              <RoleManagement />
            </>
          }
        />
        <Route
          path='/roles/:id'
          element={
            <>
              <RoleView />
            </>
          }
        />
        <Route
          path='/roles/add'
          element={
            <>
              <RoleAdd />
            </>
          }
        />
        <Route
          path='/roles/edit/:id'
          element={
            <>
              <RoleEdit />
            </>
          }
        />
        <Route
          path='/permissions'
          element={
            <>
              <PageTitle>Permissions</PageTitle>
              <PermissionsPage />
            </>
          }
        />
        <Route
          path='/store-switch'
          element={
            <>
              <PageTitle>Store Switch</PageTitle>
              <StoreSwitch />
            </>
          }
        />
        <Route
          path='/*'
          element={
            <>
              <PageTitle>Page not Found</PageTitle>
              <ErrorMessagesInPage errors='' />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/users/index' />} />
    </Routes>
  )
}

export default UsersPage

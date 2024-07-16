import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {EOWrapper} from './eo-list/STPWrapper'
import {STPWrapper} from './stp-list/STPWrapper'

const CustomerSupportPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/stp-list'
          element={
            <>
              <PageTitle>STP List</PageTitle>
              <STPWrapper />
            </>
          }
        />
        <Route
          path='/eo-list'
          element={
            <>
              <PageTitle>EO List</PageTitle>
              <EOWrapper />
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

export default CustomerSupportPage

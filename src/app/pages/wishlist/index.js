import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {Wishlist} from './list'

const WishlistPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/index'
          element={
            <>
              <PageTitle>Wishlist</PageTitle>
              <Wishlist />
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
      <Route index element={<Navigate to='/wishlist/index' />} />
    </Routes>
  )
}

export default WishlistPage

import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
import './appearance.scss'
// import AllThemes from './theme'
import CurrentTheme from './theme/CurrentTheme'
// const PageBack = [
//   {
//     title: 'Back Pages',
//     path: '/appearance/pages',
//   },
// ]

const Appearance = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/theme'
          element={
            <>
              <PageTitle>Manage Theme</PageTitle>
              <CurrentTheme />
            </>
          }
        />
        {/* <Route
          path='/theme-store'
          element={
            <>
              <PageTitle>Explore Themes</PageTitle>
              <AllThemes />
            </>
          }
        /> */}
        {/* <Route
                    path='/pages'
                    element={
                        <>
                            <PageTitle >All Pages</PageTitle>
                            <AllPages />
                        </>
                    }
                />
                <Route
                    path='/pages/new'
                    element={
                        <>
                            <PageTitle backLink={PageBack}>New Page</PageTitle>
                            <NewPage />
                        </>
                    }
                />
                <Route
                    path='/pages/edit/:id'
                    element={
                        <>
                            <PageTitle backLink={PageBack}>Edit Page</PageTitle>
                            <EditPage />
                        </>
                    }
                /> */}
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
      <Route index element={<Navigate to='/appearance/theme' />} />
    </Routes>
  )
}

export default Appearance

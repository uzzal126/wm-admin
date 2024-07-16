import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
// import InstallCourier from './components/install'
import SingleCourier from './components/single'
import CourierRoot from './root'
const RootPageBack = [
  {
    title: 'Back Marketing',
    path: '/marketing',
  },
]

const PageBack = [
  {
    title: 'Back Courier',
    path: '/marketing/courier',
  },
]

const CourierRouter = ({courier, uninstallTools}) => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='index'
          element={
            <>
              <PageTitle backLink={RootPageBack}>
                Courier Service
                <label className='form-check form-switch form-check-custom form-check-solid ms-2'>
                  <input
                    className='form-check-input h-25px w-50px'
                    type='checkbox'
                    checked={courier?.installation_status === 1 ? true : false}
                    onChange={(e) => uninstallTools(courier)}
                  />
                </label>
              </PageTitle>
              <CourierRoot />
            </>
          }
        />
        <Route path=':id' element={<SingleCourier />} />
        <Route path=':id/:page' element={<SingleCourier />} />
        {/* <Route path='install/:id' element={<InstallCourier />} /> */}
        <Route
          path='/*'
          element={
            <>
              <PageTitle backLink={PageBack}>Page not Found</PageTitle>
              <ErrorMessagesInPage errors='' />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/marketing/courier/index' />} />
    </Routes>
  )
}

export default CourierRouter

import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
import SMSBalanceWrapper from './balance'
import SMSDashboard from './dashboard'
import SMSReportWrapper from './report'
import {SMSSenderWrapper} from './sender/index.js'
import {SMSSettingsWrapper} from './settings'

const PageBack = [
  {
    title: 'Back SMS Gateway',
    path: '/plugins/sms-gateway',
  },
]

const SMSGateway = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='index' element={<SMSDashboard />} />
        <Route path='sender' element={<SMSSenderWrapper />} />
        <Route path='report' element={<SMSReportWrapper />} />
        <Route path='balance' element={<SMSBalanceWrapper />} />
        <Route path='settings' element={<SMSSettingsWrapper />} />
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
      <Route index element={<Navigate to='/plugins/sms-gateway/index' />} />
    </Routes>
  )
}

export default SMSGateway

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { ProfileHeader } from './ProfileHeader'
import { Overview } from './components/Overview'
import PaymentBlock from './components/payment'
import { SettingsBlock } from './components/settings/Settings'
import RenewNow from './payment/renew'

const ProfilePage = () => (
  <Routes>
    <Route
      path='renew'
      element={
        <>
          <PageTitle>Renew</PageTitle>
          <RenewNow />
        </>
      }
    />
    <Route
      element={
        <>
          <ProfileHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='overview'
        element={
          <>
            <PageTitle>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      {/* <Route
        path='earnings'
        element={
          <>
            <PageTitle>Earnings</PageTitle>
            <EarningsBlock />
          </>
        }
      /> */}
      <Route
        path='payment'
        element={
          <>
            <PageTitle>Payment</PageTitle>
            <PaymentBlock />
          </>
        }
      />
      <Route
        path='settings'
        element={
          <>
            <PageTitle>Account Setting</PageTitle>
            <SettingsBlock />
          </>
        }
      />
      <Route index element={<Navigate to='/profile/payment' />} />
    </Route>
  </Routes>
)

export default ProfilePage

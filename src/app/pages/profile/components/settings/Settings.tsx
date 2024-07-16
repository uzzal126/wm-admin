import React from 'react'
import {ProfileDetails} from './cards/ProfileDetails'
import {SignInMethod} from './cards/SignInMethod'
import {EmailPreferences} from './cards/EmailPreferences'
import {Notifications} from './cards/Notifications'

export function SettingsBlock() {
  return (
    <>
      <div className='row'>
        <div className='col-lg-8'>
          <ProfileDetails />
        </div>
        <div className='col-lg-4'>
          <SignInMethod />
        </div>
      </div>
      <Notifications />
      <EmailPreferences />
    </>
  )
}

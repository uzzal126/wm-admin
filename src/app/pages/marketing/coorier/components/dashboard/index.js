import React from 'react'
import PageToolbar from '../../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {breadcrumbs} from '../../helpers/helpers'
import DashboardContents from './contents'

const CourierDashboard = ({courier}) => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('dash', courier?.id)}></PageToolbar>
      <DashboardContents />
    </>
  )
}

export default CourierDashboard

import React from 'react'
import PageToolbar from '../../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {breadcrumbs} from '../../helpers/helpers'

const CourierReport = ({courier}) => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('report', courier?.id)}></PageToolbar>
      hello
    </>
  )
}

export default CourierReport

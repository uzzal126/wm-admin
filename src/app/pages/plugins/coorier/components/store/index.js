import React from 'react'
import PageToolbar from '../../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {breadcrumbs} from '../../helpers/helpers'
import {StoreListWrapper} from './components/StoreList'

const CourierStores = ({courier}) => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('pickup', courier?.id)}></PageToolbar>
      <StoreListWrapper />
    </>
  )
}

export default CourierStores

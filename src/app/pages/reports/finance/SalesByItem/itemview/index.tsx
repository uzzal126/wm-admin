import React, {useEffect, useState} from 'react'
import moment from 'moment'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {BackLink, PageTitle} from '../../../../../../_metronic/layout/core'
import {REPORT_SALE_BY_ITEM} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
import TableRender from './tableRender'
import {toast} from 'react-toastify'

const PageBack: Array<BackLink> = [
  {
    title: 'Back',
    path: '/reports/finance/sales/item',
  },
]

const SalesItemView = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)
  const {prod_id, variant} = useParams()
  const {state} = useLocation()
  let navigate = useNavigate()

  const [data, setData] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!prod_id || prod_id === '') {
      navigate(PageBack[0].path)
    } else {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod_id])

  const getData = async () => {
    let start = state?.start_date || moment().format('YYYY-MM-DD')
    let end = state?.end_date || moment().format('YYYY-MM-DD')
    const res = await getQueryRequest(
      `${REPORT_SALE_BY_ITEM}?start_date=${start}&end_date=${end}&product_id=${prod_id}${
        variant ? '&variant_id=' + variant : ''
      }`
    )
    if (res.success && res.status_code === 200) {
      if (res.data.length > 0) {
        setData(res.data)
        setTitle(res.name)
      } else {
        toast.error('Data not fount')
        navigate(PageBack[0].path)
      }
    } else {
      navigate(PageBack[0].path)
    }
  }

  return (
    <>
      <PageTitle backLink={PageBack}>{title}</PageTitle>
      <KTCard>
        <div className='card-header'>
          <div className='card-title'>
            Date Range ({state?.start_date || moment().format('YYYY-MM-DD')} -{' '}
            {state?.end_date || moment().format('YYYY-MM-DD')})
          </div>
        </div>
        <KTCardBody>
          <TableRender data={data} />
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default SalesItemView

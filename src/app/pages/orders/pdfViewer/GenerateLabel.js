import {useEffect, useRef, useState} from 'react'

import '../../../../_metronic/assets/sass1/plugins.scss'
import '../../../../_metronic/assets/sass1/style.scss'

import {ORDER_INVOICE_LEVEL} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import LoaderComponent from '../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../modules/errors/ErrorMessage'
import Header from './components/Header'
import InvoiceLabel from './components/invoice-label'

const GenerateLabel = () => {
  const ref = useRef()

  const referrer = JSON.parse(localStorage.getItem('ids')) || []

  const [data, setData] = useState([])
  const [merchant, setMerchant] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (referrer && referrer.length > 0) {
      fetchData(referrer)
    } else {
      setError('something wrong!')
    }
  }, [referrer && referrer.length > 0])

  async function fetchData(ids) {
    const response = await queryRequest(ORDER_INVOICE_LEVEL, {
      oid: ids,
    })
    if (response.success) {
      setData(response.data)
      setMerchant(response.merchant_data[0])
      setLoading(false)
    } else {
      setLoading(false)
      setError(response.message)
    }
  }

  if (loading) return <LoaderComponent />
  if (error) return <ErrorMessagesInPage errors={error} />

  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <div className='App'>
      <Header data={data} ref={ref} />
      <div id='divToPrint' ref={ref} className='m-3'>
        {data.length > 0 &&
          data.map((item, i) => <InvoiceLabel key={i} data={item} merchant={merchant} />)}
      </div>
    </div>
  )
}

export default GenerateLabel

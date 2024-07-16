import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {CHECK_PAYMENT_STATUS} from '../../constants/api.constants'
import {queryRequest} from '../../library/api.helper'
import {getLocal} from '../../modules/helper/misc'
import Cancel from './components/cancel'
import Success from './components/success'

const PaymentPage = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState({})
  const status = searchParams.get('status')
  const reference = searchParams.get('reference')
  const paymentID = searchParams.get('paymentID')
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const payment = getLocal('payment') || {}
    checkStatus()
    setData(payment)
  }, [status])

  const checkStatus = async () => {
    const payment = getLocal('payment') || {}
    const {sid, payment_partner_id, package_id, paymentID, is_ondemand} = payment
    const _data = {
      sid,
      payment_partner_id,
      package_id,
      paymentID,
      is_ondemand,
    }
    setLoading(true)
    const res = await queryRequest(CHECK_PAYMENT_STATUS, _data)
    setLoading(false)
    setPaymentStatus(res?.success)
  }

  const url =
    import.meta.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/pricing'
      : 'https://webmanza.com/pricing'

  if (loading)
    return (
      <h5 style={{textAlign: 'center'}} className='mt-10'>
        processing...
      </h5>
    )

  if (!data) window.location.href = url

  return (
    <div>
      {/* {status &&
        (status.includes('CANCELLED') ||
          status.includes('failure') ||
          status.includes('FAILED') ||
          status.includes('failed') ||
          status.includes('cancel') ||
          status.includes('CANCEL')) && <Cancel data={data} />}
      {((status && status.includes('SUCCEEDED')) ||
        (status && status.includes('SUCCEEDED') && reference && reference !== '')) && (
        <Success data={data} />
      )}
      {((status && status.includes('success')) ||
        (status && status.includes('success') && paymentID && paymentID !== '')) && (
        <Success data={data} />
      )} */}
      {paymentStatus ? <Success data={data} /> : <Cancel data={data} />}
    </div>
  )
}

export default PaymentPage

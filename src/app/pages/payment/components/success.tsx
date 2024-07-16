import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {usePaymentSuccessMutation} from '../../../../_metronic/redux/slices/onboard'
import {getLocal, setLocal} from '../../../modules/helper/misc'
import Cancel from './cancel'
export const paymentChannel = [
  {
    id: 1,
    title: 'bKash',
    icon: '/media/icons/Bkash-logo.png',
  },
]
const Success = ({data}: {data: any}) => {
  let navigate = useNavigate()
  const user = getLocal('user')

  const [successMutation, {data: submitedData, isLoading, isError, isSuccess}] =
    usePaymentSuccessMutation()

  useEffect(() => {
    handleOnSubmit()
  }, [data.paymentID])

  const handleOnSubmit = async () => {
    const post = {
      payment_partner_id: data.payment_partner_id,
      paymentID: data.paymentID,
      is_ondemand: data.is_ondemand,
      package_id: data.package_id,
      sid: data.sid,
    }
    const res = await successMutation(post).unwrap()
    if (res.success && res.status_code === 200) {
      if (res.url && res.paymentID) {
        let pyt = {...data, paymentID: res.paymentID, chargingUrl: res.url}
        setLocal(pyt, 'payment')
        window.location.href = res.url
      } else if (!user) {
        // if not logged in user, redirect to onboard/success page
        navigate('/onboard/success')
      } else {
        setTimeout(() => {
          navigate('/profile/payment')
        }, 5000)
      }
    }
  }
  if (isLoading) return <>Loading...</>
  if (isError) return <Cancel data={data} />

  return (
    <div className='mw-475px mx-auto mt-7'>
      <div className='text-center'>
        <h1 className='fs-3 pt-4 pb-8 text-success'>Payment is Successful</h1>
      </div>
    </div>
  )
}

export default Success

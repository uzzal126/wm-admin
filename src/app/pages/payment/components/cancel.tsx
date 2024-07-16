import {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {usePaymentAcquireMutation} from '../../../../_metronic/redux/slices/onboard'
import {setLocal} from '../../../modules/helper/misc'
export const paymentChannel = [
  {
    id: 1,
    title: 'bKash',
    icon: '/media/icons/Bkash-logo.png',
  },
]
const Cancel = ({data}: {data: any}) => {
  const redirect = useNavigate()
  const [rePayment, setRePayment] = useState({
    sid: data?.sid,
    package_id: data?.package_id,
    payment_partner_id: data?.payment_partner_id,
    is_ondemand: data?.payment_partner_id === 1 ? false : data?.is_ondemand,
    emi_price: data?.emi_price,
  })
  const [errMsg, setErrMsg] = useState<any>(null)

  useEffect(() => {
    setRePayment({
      sid: data?.sid,
      package_id: data?.package_id,
      payment_partner_id: data?.payment_partner_id,
      is_ondemand: data?.payment_partner_id === 1 ? false : data?.is_ondemand,
      emi_price: data?.emi_price,
    })
  }, [data])

  const [acquire] = usePaymentAcquireMutation()

  const handleOnSubmit = async () => {
    let post = {
      ...rePayment,
      sid: data?.sid,
      payment_partner_id: data?.payment_partner_id,
      package_id: data?.package_id,
    }

    let res = await acquire(post).unwrap()

    if (res.success && res.status_code === 200) {
      if (res.url) {
        let pyt = {
          ...data,
          is_ondemand: rePayment.payment_partner_id === 1 ? false : rePayment.is_ondemand,
          paymentID: res.paymentID,
          chargingUrl: res.url,
        }
        setLocal(pyt, 'payment')
        window.location.href = res.url
      }
    } else {
      setErrMsg(res?.message || 'Sorry! An error occured!')
      if (res?.status_code === 2001) {
        setTimeout(() => {
          redirect('/')
        }, 5000)
      }
    }
  }
  return (
    <div className='container mt-10 w-lg-50'>
      {errMsg && (
        <div className='py-5'>
          {/*begin::Information*/}
          <div className='d-flex align-items-center rounded py-5 px-5 bg-light-warning '>
            <i className='ki-duotone ki-information-5 fs-3x text-warning me-5'>
              <span className='path1' />
              <span className='path2' />
              <span className='path3' />
            </i>
            {/*begin::Description*/}
            <div className='text-gray-700 fw-bold fs-6'>{errMsg}</div>
            {/*end::Description*/}
          </div>
          {/*end::Information*/}
        </div>
      )}

      <div className='card h-100'>
        <div className='card-header bg-danger bg-opacity-50 text-center align-items-center justify-content-center'>
          <h1 className='fs-3 pt-4 w-100 '>Payment is Failed</h1>
          <span className='pb-5'>Please, Try Again</span>
        </div>
        <div className='card-body'>
          <div className='row row-cols-1 row-cols-lg-2 pb-5 px-2'>
            {paymentChannel &&
              paymentChannel.length > 0 &&
              paymentChannel.map((item, i) => (
                <div className='col' key={i}>
                  <div className='card h-100 align-items-center justify-content-center border-dashed border'>
                    <div className='card-body'>
                      <Form.Check className='h-100' type={'radio'} id={`check-api-${i}`}>
                        <Form.Check.Input
                          type={'radio'}
                          name='payment-channel'
                          checked={data?.payment_partner_id === item.id}
                          disabled={data?.emi_price !== 'yearly' && item.id === 2}
                          onChange={() =>
                            setRePayment({
                              ...rePayment,
                              payment_partner_id: item.id,
                              is_ondemand: item.id === 2 || rePayment.is_ondemand,
                            })
                          }
                        />
                        <Form.Check.Label className='h-100 d-flex align-items-center justify-content-center flex-column'>
                          <img src={item.icon} alt='' className='img-fluid' />
                          <h4>{item.title}</h4>
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  </div>
                </div>
              ))}

            {/* {data?.emi_price === 'yearly' && (
              <div className='mt-8'>
                <Form.Check
                  type='switch'
                  id='custom-switch'
                  label='On Demand payment'
                  disabled={rePayment.payment_partner_id !== 1}
                  checked={rePayment.payment_partner_id === 1 ? false : rePayment.is_ondemand}
                  onChange={() =>
                    setRePayment({
                      ...rePayment,
                      is_ondemand:
                        rePayment.payment_partner_id === 1 ? false : !rePayment.is_ondemand,
                    })
                  }
                />
              </div>
            )} */}
          </div>

          <div className='text-center pb-3'>
            <Button
              onClick={() => handleOnSubmit()}
              disabled={!rePayment.payment_partner_id || !rePayment.sid || !rePayment.package_id}
            >
              Try Again
            </Button>
          </div>
        </div>

        {/* <div className='col-lg-6'>
          <OnboardSuccess />
        </div> */}
      </div>
    </div>
  )
}

export default Cancel

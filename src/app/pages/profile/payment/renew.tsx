import moment from 'moment'
import {Fragment, useEffect, useState} from 'react'
import {Accordion, Alert, Form} from 'react-bootstrap'
import * as yup from 'yup'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {GET_CHARGE_URL, GET_PACKAGE_LIST} from '../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'
import {
  formatPrice,
  getLastValidDate,
  getLocal,
  getYearMonthDayof,
  setLocal,
  slugToTitle,
} from '../../../modules/helper/misc'
import {paymentChannel} from '../../onboard/components/onboard'
import {ContextAwareToggle} from '../components/payment'

export const schema = yup.object({
  account_details: yup.string().required('User Details Required'),
})

const RenewNow = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)
  const [loading, setLoading] = useState(true)
  const [pricing, setPricing] = useState<any>({})
  const [pckg, setPackage] = useState<any>([])
  const [paymentPartners, setPaymentPartners] = useState<any>([])
  const [selectedPrice, setSelectedPrice] = useState<any>(null)
  const [selectedPayPartner, setSelectedPayPartner] = useState<any>(null)
  const [errMsg, setErrMsg] = useState<any>(null)
  const [alreadyPurchased, setAlreadyPurchased] = useState(false)
  const [activeSubscription, setActiveSubscription] = useState<any>([])
  const [remarks, setRemarks] = useState<any>({})

  const current_user = getLocal('user')

  const handleSubmit = async () => {
    setErrMsg(null)
    try {
      const data = {
        sid: current_user?.user?.sid,
        emi_price: selectedPrice,
        package_id: pckg?.id,
        payment_partner_id: selectedPayPartner?.id,
        is_ondemand: selectedPrice === 'yearly',
      }

      const res = await queryRequest(GET_CHARGE_URL, data)
      if (res?.success && res?.url) {
        let pyt = {...data, paymentID: res?.paymentID, chargingUrl: res?.url}
        setLocal(pyt, 'payment')
        window.location.href = res?.url
      } else {
        setErrMsg(res?.message || "Sorry! Couldn't handle the request!")
      }
    } catch (err: any) {
      setErrMsg(err?.message || "Sorry! Couldn't handle the request!")
    }
  }

  useEffect(() => {
    getPackageList()
  }, [])

  const getPackageList = async () => {
    const res = await getQueryRequest(GET_PACKAGE_LIST)
    setLoading(false)
    const {data} = res
    if (res?.success && data) {
      const {packages, paymentPartners: payment_partners}: any = data
      if (Array.isArray(packages) && Array.isArray(payment_partners)) {
        const pckg = packages[0]
        const defaultPaymentPartner = payment_partners[0]
        let defaultPrice
        let pricing_: any = {}
        try {
          pricing_ = pckg?.pricing
          defaultPrice = Object.keys(pricing_?.emi_price)[0]
        } catch (err) {
          console.log('catch block error: ', err)
          pricing_ = {}
        } finally {
          setPricing(pricing_)
          setPaymentPartners(payment_partners)
          setSelectedPayPartner(defaultPaymentPartner)
          setSelectedPrice(defaultPrice)
          setPackage(pckg)
        }
      }
    } else if (res?.status_code === 409) {
      setAlreadyPurchased(true)
      if (Array.isArray(res?.active_subscriptions) && res?.active_subscriptions?.length > 0) {
        setActiveSubscription(res?.active_subscriptions)
        try {
          const remarksJSON = res?.active_subscriptions[0]?.remarks
            ? res?.active_subscriptions[0]?.remarks?.split('|')[0]
            : '{}'
          const _remarks = JSON.parse(remarksJSON)
          setRemarks(_remarks)
        } catch (err) {
          console.log('err from catch block')
        }
      }
    }
  }

  return alreadyPurchased ? (
    <Fragment>
      <Alert variant='warning'>
        <div className='d-flex justify-content-between align-items-center text-dark'>
          <span>You already have an active subscription!</span>
        </div>
      </Alert>
      <div className='card'>
        <div className='card-header border-0'>
          <div className='card-title'>
            <h2 className='fw-bold mb-0'>Subscription Details</h2>
          </div>
        </div>
        <div className='card-body pt-0'>
          {activeSubscription.length > 0 ? (
            <Accordion defaultActiveKey='0'>
              <div>
                <div className='py-3 d-flex flex-stack flex-wrap'>
                  <ContextAwareToggle eventKey='0'>
                    <img
                      src={paymentChannel[remarks?.payment_partner_id - 1]?.icon || ''}
                      className='w-40px me-3'
                      alt=''
                    />

                    <div className='me-3'>
                      <div className='d-flex align-items-center'>
                        <div className='text-gray-800 fw-bold'>bKash </div>

                        <div
                          className={`badge badge-light-${
                            remarks?.is_ondemand ? 'warning' : 'primary'
                          } ms-5`}
                        >
                          {remarks?.is_ondemand ? 'On Demand' : 'Recurring'}
                        </div>
                      </div>
                    </div>
                  </ContextAwareToggle>
                </div>
                <Accordion.Collapse eventKey='0'>
                  <div className='d-flex flex-wrap py-5'>
                    <div className='flex-equal me-5'>
                      <table className='table table-flush fw-semibold gy-1'>
                        <tbody>
                          <tr>
                            <td className='text-muted min-w-125px w-125px'>Subscription ID: </td>
                            <td className='text-gray-800'>
                              {activeSubscription[0]?.subscription_id}
                            </td>
                          </tr>
                          <tr>
                            <td className='text-muted min-w-125px w-125px'>Last Renew Date:</td>
                            <td className='text-gray-800'>
                              {moment(activeSubscription[0]?.last_renew_date).format('LL')}
                            </td>
                          </tr>
                          {remarks?.is_ondemand ? (
                            <></>
                          ) : (
                            <tr>
                              <td className='text-muted min-w-125px w-125px'>Next Renewal:</td>
                              <td className='text-gray-800'>
                                {moment(activeSubscription[0]?.next_renew_date)?.format('LLL')}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Accordion.Collapse>
                <div className='separator separator-dashed'></div>
              </div>
            </Accordion>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Fragment>
  ) : (
    <KTCard>
      <KTCardBody>
        <Form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className='row'>
            <div className='col-lg-8'>
              <h3 className='mt-5'>Billing cycle*</h3>
              <p className='text-muted'>
                Choose how often you’d like to be billed. You can cancel anytime
              </p>
              <div data-kt-buttons='true' className='border rounded-3 overflow-hidden mb-10'>
                {loading ? (
                  <span>loading...</span>
                ) : (
                  pricing &&
                  pricing?.emi_price &&
                  typeof pricing?.emi_price === 'object' &&
                  Object.keys(pricing?.emi_price).length > 0 &&
                  Object.keys(pricing?.emi_price).map((item: any, i: any) => (
                    <label
                      key={i}
                      className={` bg-active-light bg-opacity-50 d-flex flex-stack text-start px-6 py-3 
                                                    ${item === selectedPrice ? 'active' : ''}`}
                    >
                      <div className='d-flex align-items-center me-2'>
                        <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                          <input
                            onChange={() => {
                              setSelectedPrice(item)
                            }}
                            // onChange={() => {
                            //     setFieldValue('package.emi_price', price)
                            //     setFieldValue(
                            //         'package.payment_partner_id',
                            //         price === 'yearly' ? 0 : 1
                            //     )
                            //     setFieldValue('package.is_ondemand', price === 'yearly')
                            // }}
                            className='form-check-input'
                            type='radio'
                            checked={item === selectedPrice}
                            // disabled={isLoading || isSubmitting}
                            name='plan'
                            defaultValue='startup'
                          />
                        </div>
                        <div className='flex-grow-1'>
                          <h2 className='d-flex align-items-center fs-3 fw-bold flex-wrap mb-0 text-capitalize'>
                            {/* {price === 'half_yearly' ? 'Half Yearly' : price} */}
                            {slugToTitle(item)}
                          </h2>
                          <div className='fw-semibold opacity-50'>
                            {`Pay BDT ${formatPrice(pricing?.emi_price[item])}`}
                            {/* {pricing[price]}/
                                                                {price === 'half_yearly' ? 'Half Yearly' : price} */}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))
                )}
                {/* {touched.package?.emi_price && errors?.package?.emi_price && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>
                                                    <span role='alert'>{errors?.package.emi_price}</span>
                                                </div>
                                            </div>
                                        )} */}
              </div>
              <h3>Choose Payment Option*</h3>
              <div className='row row-cols-1 row-cols-lg-3 pt-2'>
                {loading ? (
                  <span>loading...</span>
                ) : (
                  paymentPartners.map((item: any, i: any) => (
                    <div className='col h-100' key={i}>
                      <label
                        className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 ${
                          selectedPrice !== 'yearly' && item?.id === 2 ? 'disabled' : ''
                        } ${selectedPayPartner?.id === item?.id ? 'active' : ''}`}
                      >
                        <div className='d-flex align-items-center me-2'>
                          <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                            <input
                              className='form-check-input'
                              type='radio'
                              name='channel'
                              checked={selectedPayPartner?.id === item?.id}
                              // disabled={
                              //     (values.package.emi_price !== 'yearly' && item.id === 2) ||
                              //     isLoading ||
                              //     isSubmitting
                              // }
                              value={item.id}
                              onChange={() => {
                                setSelectedPayPartner(item)
                              }}
                              // onChange={() =>
                              //     setFieldValue('package.payment_partner_id', item.id)
                              // }
                            />
                          </div>
                          <div className='flex-grow-1'>
                            <h2 className='d-flex align-items-center flex-column fs-3 fw-bold flex-wrap'>
                              <img
                                src={
                                  paymentChannel.filter((e: any) => e?.id === item?.id)[0]
                                    ? paymentChannel.filter((e: any) => e?.id === item?.id)[0]?.icon
                                    : ''
                                }
                                alt={item?.name}
                                className='img-fluid mw-100 w-auto mh-40px'
                              />
                              {/* {item.title} */}
                            </h2>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
            {selectedPrice ? (
              <div className='col-lg-4'>
                <div className='p-6'>
                  <h4>Your Package</h4>
                  <p className='text-muted'>You can cancel your plan at any time</p>
                  <div className='stepper stepper-pills stepper-column '>
                    <div className='stepper-nav '>
                      <div className='stepper-item me-3 completed' data-kt-stepper-element='nav'>
                        <div className='stepper-wrapper d-flex align-items-center flex-grow-1'>
                          <div className='stepper-icon rounded-circle w-20px h-20px bg-primary'>
                            <i className='fas fa-check text-white' />
                          </div>
                          <div className='stepper-label flex-row align-items-center justify-content-between flex-grow-1'>
                            <div className=''>
                              <h3 className='stepper-title mb-0 fw-bold text-dark'>Today</h3>
                              {/* <div className='stepper-desc'>{pricingPackage?.title}</div> */}
                            </div>
                            {/* <div className='fw-bold'>Free</div> */}
                          </div>
                        </div>
                        <div className='stepper-line w-20px h-40px border-gray-800 border-solid' />
                      </div>
                      <div className='stepper-item me-3 pb-0' data-kt-stepper-element='nav'>
                        <div className='stepper-wrapper d-flex align-items-center flex-grow-1'>
                          <div className='stepper-icon rounded-circle w-20px h-20px border-primary border'>
                            <i className='stepper-check fas fa-check' />
                            <span className='stepper-number'></span>
                          </div>
                          <div className='stepper-label flex-row align-items-center justify-content-between flex-grow-1'>
                            <div className=''>
                              <h3 className='stepper-title mb-0 fw-bold text-dark'>
                                {/* {parseDurationToDate(validity(values.package.emi_price))} */}
                                {getLastValidDate(selectedPrice)}
                              </h3>

                              <div className='stepper-desc'>Validity</div>
                            </div>
                            <div className='text-end'>
                              <div className='fw-bold'>
                                {pricing && pricing?.emi_price && selectedPrice
                                  ? `BDT ${formatPrice(pricing?.emi_price[selectedPrice])}`
                                  : ''}
                              </div>
                              <div className='text-muted'>
                                {selectedPrice ? `Billed ${getYearMonthDayof(selectedPrice)}` : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='stepper-line w-20px h-40px ' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <div className='d-flex align-items-center justify-content-between mb-3'>
                    <p className='mb-0'>Total</p>
                    <p className='mb-0 fw-bolder fs-3'>
                      {pricing && pricing?.emi_price && selectedPrice
                        ? `BDT ${formatPrice(pricing?.emi_price[selectedPrice])}`
                        : ''}
                    </p>
                  </div>
                  <button
                    className='btn btn-dark w-100'
                    type='submit'
                    disabled={!pckg || !selectedPayPartner}
                  >
                    Buy now
                  </button>
                  {errMsg && <p className='text-danger mt-5'>{errMsg}</p>}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </Form>
      </KTCardBody>
    </KTCard>
  )
}

export default RenewNow

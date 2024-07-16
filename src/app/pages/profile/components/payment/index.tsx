import moment from 'moment'
import {useContext, useEffect, useState} from 'react'
import {Accordion, AccordionContext, Form, useAccordionButton} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import {KTSVG} from '../../../../../_metronic/helpers'
import {GET_PAYMENT_HISTORIES, TURN_OFF_RECURRING} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
import {paymentChannel} from '../../../onboard/components/onboard'

export function ContextAwareToggle({children, eventKey, callback}: any) {
  const {activeEventKey} = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey))

  const isCurrentEventKey = activeEventKey === eventKey

  return (
    <>
      <div
        className={`d-flex align-items-center cursor-pointer collapsible rotate ${
          isCurrentEventKey ? 'active' : 'collapsed'
        }`}
        onClick={decoratedOnClick}
      >
        <div className='me-3 rotate-90'>
          <span className='svg-icon svg-icon-3'>
            <KTSVG path={'/media/icons/duotune/arrows/arr071.svg'} />
          </span>
        </div>

        {children}
      </div>
    </>
  )
}

const isRecurring = (remarks: any, isAutoStopped: any) => {
  if (isAutoStopped === 1) return false
  let isRecurring
  try {
    isRecurring = !remarks?.is_ondemand
  } catch (err) {
    isRecurring = false
  } finally {
    return isRecurring
  }
}

const PaymentBlock = () => {
  const [data, setData] = useState<any>([])
  const [recurring, setRecurring] = useState<any>([])
  console.log('🚀 ~ file: index.tsx:53 ~ PaymentBlock ~ recurring:', recurring)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let _data = []
    setLoading(true)
    const res = await getQueryRequest(GET_PAYMENT_HISTORIES)
    setLoading(false)
    if (res?.success && res?.data) {
      if (Array.isArray(res?.data) && res?.data?.length > 0) {
        const recurring_list = []
        for (let i = 0; i < res?.data?.length; i++) {
          const payment = res?.data[i]
          let remarks = payment?.remarks ? payment?.remarks?.split('|')[0] : '{}'
          let _recurring = true
          try {
            remarks = JSON.parse(remarks)
            _recurring =
              payment?.is_auto_stopped >= 0
                ? payment?.is_auto_stopped === 0
                  ? true
                  : false
                : remarks?.is_ondemand !== false
          } catch (err) {
            remarks = {}
          } finally {
            _data.push({
              ...payment,
              remarks,
            })
            recurring_list.push(_recurring)
          }
        }
        setData(_data)
        setRecurring(recurring_list)
      }
    }
  }

  const turnOffRecurring = async (req: any) => {
    Swal.fire({
      title: 'Turn Off',
      text: 'Are you sure you want to turn off recurring? Once you turn it off, it can not be changed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Turn Off',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await queryRequest(TURN_OFF_RECURRING, req)
        if (res?.success) {
          let _data = []
          const recurring_list = [...recurring]
          // update the state
          for (let i = 0; i < data?.length; i++) {
            const el = data[i]
            if (el?.subscription_id === req?.subscriptionId) {
              _data.push({
                ...el,
                is_auto_stopped: 1,
              })
              recurring_list[i] = false
            } else {
              _data.push(el)
            }
          }
          setData(_data)
          setRecurring(recurring_list)
          toast.success(res?.message || 'Successfully, turned off recurring!')
        } else {
          toast.error(res?.message || 'Sorry! An Error Occured!')
        }
      }
    })
  }

  if (loading) return <span>loading...</span>

  return (
    <>
      <div className='card'>
        <div className='card-header border-0'>
          <div className='card-title'>
            <h2 className='fw-bold mb-0'>Purchase History</h2>
          </div>
        </div>
        <div className='card-body pt-0'>
          {data?.length > 0 ? (
            data.map((item: any, indx: any) => (
              <Accordion defaultActiveKey='0' key={indx}>
                <div>
                  <div className='py-3 d-flex flex-stack flex-wrap'>
                    <ContextAwareToggle eventKey='0'>
                      <img
                        src={paymentChannel[Number(item?.payment_partner_id) - 1]?.icon || ''}
                        className='w-40px me-3'
                        alt=''
                      />

                      <div className='me-3'>
                        <div className='d-flex align-items-center'>
                          <div className='text-gray-800 fw-bold'>{item?.payment_partner_name}</div>

                          <div
                            className={`badge badge-light-${recurring[indx] ? 'primary' : ''} ms-5`}
                          >
                            {recurring[indx] ? 'Recurring' : ''}
                          </div>
                        </div>
                      </div>
                    </ContextAwareToggle>
                    <div>
                      <Form.Check
                        type='switch'
                        id='custom-switch'
                        label={`Recurring(${recurring[indx] ? 'ON' : 'OFF'})`}
                        disabled={!recurring[indx]}
                        checked={recurring[indx]}
                        onChange={() =>
                          turnOffRecurring({
                            package_id: item?.package_id,
                            subscriptionId: item?.subscription_id,
                            payment_partner_id: item?.payment_partner_id,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Accordion.Collapse eventKey='0'>
                    <div className='d-flex flex-wrap py-5'>
                      <div className='flex-equal me-5'>
                        <table className='table table-flush fw-semibold gy-1'>
                          <tbody>
                            <tr>
                              <td className='text-muted min-w-125px w-125px'>Amount:</td>
                              <td className='text-gray-800'>{item?.amount || '0.00'} BDT</td>
                            </tr>
                            <tr>
                              <td className='text-muted min-w-125px w-125px'>Subscription ID:</td>
                              <td className='text-gray-800'>{item?.subscription_id}</td>
                            </tr>
                            <tr>
                              <td className='text-muted min-w-125px w-125px'>Last Renew Date:</td>
                              <td className='text-gray-800'>
                                {moment(item?.last_renew_date).format('LL')}
                              </td>
                            </tr>
                            {item?.remarks?.is_ondemand ? (
                              <></>
                            ) : (
                              <tr>
                                <td className='text-muted min-w-125px w-125px'>Next Renewal:</td>
                                <td className='text-gray-800'>
                                  {moment(item?.next_renew_date)?.format('LLL')}
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
            ))
          ) : (
            <span>No Payment History Found Yet!</span>
          )}
        </div>
      </div>
    </>
  )
}

export default PaymentBlock

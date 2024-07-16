import {useEffect, useState} from 'react'
import SVG from 'react-inlinesvg'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {
  GET_SETTING,
  POST_ACTIVE_CHANNEL,
  POST_DEACTIVATE_CHANNEL,
} from '../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'

const Payment = ({data, setData, handleUpdate}) => {
  const handleDeactivationChannel = async (id) => {
    const res = await queryRequest(POST_DEACTIVATE_CHANNEL, {
      payment_partner_id: id,
    })
    if (res.success && res.status_code === 200) {
      toast.success(res.message)
      setData({...data})
    } else {
      toast.error(res.message)
    }
  }

  const handleActivationChannel = async (id) => {
    const res = await queryRequest(POST_ACTIVE_CHANNEL, {
      payment_partner_id: id,
    })
    if (res.success && res.status_code === 200) {
      toast.success(res.message)
      setData({...data})
    } else {
      toast.error(res.message)
    }
  }

  const [newData, setNewData] = useState({})

  useEffect(() => {
    getData()
  }, [data])

  const getData = async () => {
    const res = await getQueryRequest(GET_SETTING)
    if (res.success && res.status_code === 200) {
      setNewData(res.data)
    }
  }

  return (
    <div className='row mt-4'>
      <div className='col'>
        <div className='card'>
          <div className='card-body'>
            <div className='d-flex align-items-center'>
              <div className='flex-grow-1'>
                {newData?.payment_methods &&
                  newData?.payment_methods.map((item) => (
                    <div
                      key={item.id}
                      className='d-flex align-items-center justify-content-between mb-5'
                    >
                      <div className='d-flex align-items-center'>
                        <div className='sv-icon w-40px me-6'>
                          <SVG src={item.icon_url || '/media/icons/custom/cod-icon.svg'} />
                        </div>
                        <div>
                          <h2 className='fs-3 fw-bolder'>{item.name}</h2>
                          <div
                            className={`badge text-capitalize ${
                              item.status === 'accepted' ? 'badge-light-success' : ''
                            } ${item.status === 'inactive' ? 'badge-light-danger' : ''} ${
                              item.status === 'pending' ? 'badge-light-warning' : ''
                            } `}
                          >
                            {item.status}
                          </div>
                        </div>
                      </div>

                      <button
                        type='button'
                        onClick={() =>
                          item.is_active === 0
                            ? handleActivationChannel(item.id)
                            : handleDeactivationChannel(item.id)
                        }
                        className={`btn ${
                          item.status !== 'accepted' ? 'disabled' : ''
                        } btn-sm btn-${item.is_active === 0 ? 'success' : 'danger'}`}
                      >
                        {item.is_active === 0 ? 'Activate' : 'Deactivate'}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            {data?.key_value?.payment_methods_setting?.cod.active && (
              <>
                <div className='separator separator-dashed border-dark mt-6 mb-2'></div>
                <div className='mt-4'>
                  <label htmlFor='' className='required form-label'>
                    Enter the payment instructions
                    <i
                      className='fas fa-exclamation-circle ms-1 fs-7'
                      title="<img src='assets/themes/payment-method.png' className='img-fluid'><div className='pt-2 fs-5'>Pay with cash upon delivery.</div>"
                    ></i>
                  </label>
                  <textarea
                    value={data?.key_value?.payment_methods_setting?.cod.instructions}
                    className='form-control form-control-solid'
                    onChange={(e) =>
                      setData({
                        ...data,
                        key_value: {
                          ...data.key_value,
                          payment_methods_setting: {
                            ...data.key_value.payment_methods_setting,
                            cod: {
                              ...data.key_value.payment_methods_setting.cod,
                              instructions: e.target.value,
                            },
                          },
                        },
                      })
                    }
                  />
                  <div className='text-end'>
                    <button className='btn btn-dark btn-sm mt-5' onClick={() => handleUpdate()}>
                      UPDATE
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='card h-100'>
          <div className='card-body'>
            <div data-kt-buttons='true'>
              <div className='d-flex align-items-center'>
                <div className='sv-icon w-70px me-10'>
                  <SVG src={'/media/icons/custom/online-pay.svg'} />
                </div>
                <div className='flex-grow-1'>
                  <h2 className='d-flex align-items-center fs-3 fw-bolder flex-wrap'>
                    Online Payment
                  </h2>
                  <div className='fw-bold opacity-50'>
                    Payment with bKash, Rocket, Nagad also card
                  </div>
                </div>
                <div className='flex-grow-0'>
                  <Link to={'/support'}>
                    <button type='button' className='btn btn-dark btn-sm mt-5'>
                      Request for Activation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment

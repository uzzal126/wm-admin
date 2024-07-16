import {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {GET_PAYMENT_CHANNELS, POST_PAYMENT_CHANNELS_INSTALL} from '../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'
import Buttons from './inc/buttons'

const PaymentGateways = () => {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    getPaymentChannels()
  }, [])

  const getPaymentChannels = async () => {
    const res = await getQueryRequest(GET_PAYMENT_CHANNELS)
    if (res.success && res.status_code === 200) {
      setChannels(res.data)
    }
  }

  const reFetch = () => getPaymentChannels()

  const handleChannelInstall = (item: any) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to active ${item.name}!`,
      icon: 'warning',
      buttons: ['Cancel', 'Confirm'],
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        const res = await queryRequest(POST_PAYMENT_CHANNELS_INSTALL, {
          shop_payment_partner_id: item.id,
        })
        if (res.success && res.status_code === 200) {
          toast.success(`${item.name} Install Successfully`)
          getPaymentChannels()
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  return (
    <div>
      <Row>
        {channels &&
          channels.length > 0 &&
          channels.map((item: any, i: number) => (
            <Col lg='3' key={i}>
              <div className='card card-flush'>
                <div className='card-header min-h-auto pt-4'>
                  <div className='card-title'></div>
                  <div className='card-tooltip d-flex align-items-center gap-3 h-30px'>
                    {item.status && <Buttons item={item} reFetch={reFetch} />}
                  </div>
                </div>
                <div className='card-body pt-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='me-2 w-80px h-40px d-flex align-items-center'>
                      <img src={item.icon_url} alt='' width={40} />
                    </div>
                    <div className=''>
                      {item.status ? (
                        <div
                          className={`badge badge-light-${
                            item.status === 'pending' ||
                            (item.status === 'accepted' && !item.is_active)
                              ? 'warning'
                              : 'success'
                          } text-capitalize`}
                        >
                          <i
                            className={`fas me-2 ${
                              item.status === 'pending' ||
                              (item.status === 'accepted' && !item.is_active)
                                ? 'fa-cog text-warning'
                                : 'fa-check-circle text-success'
                            }`}
                          ></i>
                          {item.status === 'accepted' && !item.is_active
                            ? 'Active Required'
                            : item.status}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleChannelInstall(item)}
                          className='btn btn-sm btn-outline-default border border-primary py-2 bg-hover-light-primary'
                        >
                          <i className='fas fa-plus'></i>
                          Install
                        </button>
                      )}
                    </div>
                  </div>
                  {/*  */}
                  <div className='pt-2'>
                    <h4 className='fs-5'>{item.name}</h4>
                    {item.status === 'pending' ? (
                      <p>Please add {item.name} configuration</p>
                    ) : item.status === 'accepted' && !item.is_active ? (
                      <p>Please Active your Payment Channel</p>
                    ) : (
                      <p>Choose your payment gateway</p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default PaymentGateways

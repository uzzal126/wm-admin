import {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import swal from 'sweetalert'
import {GET_COURIER_FEE} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import {CourierHistory} from '../courierHistory'
import CourierCharge from './CourierCharge'
import {initialData} from './helpers/initial'

const Shipping = ({data, setData, handleUpdate}) => {
  const [show, setShow] = useState(false)
  const [history, setHistory] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleStorePickUp = () => {
    swal({
      title: 'Are you sure?',
      text: `Once ${
        data.key_value?.shipping_method_setting?.store_pick_up.active ? 'Deactivate' : 'Active'
      } Store Pick Up!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const post = {
          ...data,
          key_value: {
            ...data.key_value,
            shipping_method_setting: {
              ...data.key_value?.shipping_method_setting,
              store_pick_up: {
                ...data.key_value?.shipping_method_setting?.store_pick_up,
                active: !data.key_value?.shipping_method_setting?.store_pick_up.active,
              },
            },
          },
        }
        setData(post)
        handleUpdate(post)
      }
    })
  }
  const [courierFee, setCourierFee] = useState(initialData)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getQueryRequest(GET_COURIER_FEE)
    if (res.success && res.status_code === 200) {
      setCourierFee({
        data: res.data,
      })
    }
  }

  return (
    <>
      <div className='row row-cols-1 row-cols-lg-2 g-5'>
        <div className='col d-none'>
          <div className='card'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='sv-icon w-40px me-6'>
                  <SVG src={'/media/icons/custom/store-icon.svg'} />
                </div>
                <div className='flex-grow-1'>
                  <h2 className='d-flex align-items-center fs-3 fw-bolder flex-wrap'>
                    Store Pick Up
                  </h2>
                </div>
                <div className='flex-grow-0'>
                  <button
                    type='button'
                    onClick={() => handleStorePickUp()}
                    className={`btn ${
                      data?.key_value?.shipping_method_setting?.store_pick_up.active
                        ? 'btn-primary'
                        : 'btn-danger'
                    } btn-sm`}
                  >
                    {data?.key_value?.shipping_method_setting?.store_pick_up.active
                      ? 'Active'
                      : 'Deactive'}
                  </button>
                </div>
              </div>
              {data?.key_value?.shipping_method_setting?.store_pick_up.active && (
                <>
                  <div className='separator separator-dashed border-dark mt-6 mb-2'></div>
                  <div className='mt-4'>
                    <label htmlFor='' className='required form-label'>
                      Instruction for Customer{' '}
                      <i
                        className='fas fa-exclamation-circle ms-1 fs-7'
                        title="<span className='fs-5 fw-bold'>Allow to get product on your store</span><p className='text-start fs-5 fw-bold'>Example</p> <img src='assets/themes/delivery-op.png' className='img-fluid'/>"
                      ></i>
                    </label>
                    <textarea
                      value={data?.key_value?.shipping_method_setting?.store_pick_up.instructions}
                      className='form-control form-control-solid'
                      onChange={(e) =>
                        setData({
                          ...data,
                          key_value: {
                            ...data.key_value,
                            shipping_method_setting: {
                              ...data.key_value?.shipping_method_setting,
                              store_pick_up: {
                                ...data.key_value?.shipping_method_setting?.store_pick_up,
                                instructions: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                    <div className='text-end'>
                      <button className='btn btn-sm btn-dark mt-4' onClick={() => handleUpdate()}>
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='sv-icon w-40px me-6'>
                  <SVG src={'/media/icons/custom/pickup-icon.svg'} />
                </div>
                <div className='flex-grow-1'>
                  <h2 className='d-flex align-items-center fs-3 fw-bolder flex-wrap'>
                    Standard Shipping
                  </h2>
                </div>
                <div className='text-end'>
                  <button className='btn btn-sm btn-light-info btn-icon me-2' onClick={setHistory}>
                    <i className='fas fa-eye'></i>
                  </button>
                  <button className='btn btn-sm btn-primary btn-icon' onClick={handleShow}>
                    <i className='fas fa-pencil'></i>
                  </button>
                </div>
              </div>

              <div className='separator separator-dashed border-dark mt-6 mb-2'></div>
              <div className='mt-4'>
                <table className='table table-row-bordered g-2 mb-0'>
                  <thead>
                    <tr className='fw-bold'>
                      <th>Location</th>
                      <th className='text-center'>Fee</th>
                      <th className='text-center'>Additional per KG</th>
                      <th className='text-center'>COD Charge %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courierFee &&
                      courierFee?.data.length > 0 &&
                      courierFee?.data.map((item, i) => (
                        <tr key={i}>
                          <td className='text-muted'>{item?.location}</td>
                          <td className='text-center'>{item?.price_for_customer_per_kg}</td>
                          <td className='text-center'>{item?.additional_charge_per_kg}</td>
                          <td className='text-center'>{item?.cash_on_delivery_percentage}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} size='lg' backdrop='static' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Overwrite Shipping Rate</Modal.Title>
        </Modal.Header>
        <CourierCharge handleClose={handleClose} courierFee={courierFee} reFetch={getData} />
      </Modal>
      <Modal show={history} size='xl' backdrop='static' onHide={() => setHistory(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Fee History</Modal.Title>
        </Modal.Header>
        {/* <CourierCharge handleClose={setHistory} courierFee={courierFee} reFetch={getData} /> */}
        <CourierHistory />
      </Modal>
    </>
  )
}

export default Shipping

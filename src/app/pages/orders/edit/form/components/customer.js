import {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import AddressFinder from '../../../../../../_metronic/partials/content/addressFinder'
import {
  ADD_UPDATE_CUSTOMER_ADDRESS,
  UPDATE_ORDER_ADDRESS,
} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'

const FieldCustomer = ({data, refatch: refetch}) => {
  const [addressModal, setAddressModal] = useState(false)
  const [address, setAddress] = useState([])

  const handleCustomerAdd = async () => {
    const res = await queryRequest(
      `${ADD_UPDATE_CUSTOMER_ADDRESS}`,
      {...address, address_type: 'Home', customer_id: data?.customer?.id},
      'post'
    )
    if (res?.success) {
      const address_id = res?.data?.address_id
      const res2 = await queryRequest(
        `${UPDATE_ORDER_ADDRESS}/${data?.invoice_id}`,
        {customer_id: data?.customer?.id, address_id},
        'put'
      )
      return res2
    } else {
      return res
    }
  }

  useEffect(() => {
    if (data?.shipping_address) {
      let add = data?.shipping_address
      // // console.log('data', data)
      add = {
        address_id: add?.id,
        address_type: add?.address_type,
        name: add?.name,
        msisdn: add?.msisdn,
        region_id: add?.region_id,
        city_id: add?.city_id,
        area_id: add?.area_id,
        zone_id: add?.zone_id,
        street_address: add?.street_address,
        floor_no: add?.floor_no,
        apartment_no: add?.apartment_no,
        customer_id: data?.customer?.id,
        email: add?.email || data?.customer?.email,
      }
      setAddress(add)
    }
  }, [data, data?.shipping_address])

  const saveAddress = async () => {
    const res = !address?.address_id
      ? await handleCustomerAdd()
      : await queryRequest(`${ADD_UPDATE_CUSTOMER_ADDRESS}/${address?.address_id}`, address, 'put')
    if (res.success && res.status_code === 200) {
      if (refetch) refetch(true)
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
    setAddressModal(false)
  }
  return (
    <>
      <div className='card'>
        <div className='card-body position-relative'>
          {data?.order_status_id !== 7 && (
            <button
              className='mt-5 btn btn-icon w-40px h-40px me-3 position-absolute end-0 top-0 btn-light-info'
              onClick={() => setAddressModal(true)}
            >
              <i className='fas fa-pencil'></i>
            </button>
          )}
          <h2 className='fs-4 '>Shipping Details</h2>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-45px me-5'>
              <img src='/media/avatars/blank.png' alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <span className='text-dark fw-bolder text-hover-primary fs-6'>
                {address && address?.name}
              </span>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {address?.email ? address?.email : data?.customer ? data?.customer?.email : ''}
              </span>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {address && address?.msisdn}
              </span>
            </div>
          </div>
          <div className='separator my-3'></div>
          <div className='position-relative'>
            <h2 className='fs-4 '>Delivery Address</h2>
            <div className='text-gray-600'>
              {`${address && address?.street_address}${
                (address && ', ' + data?.area) || address?.area
              }
              ${(address && ', ' + data?.zone) || address?.zone}
              ${(address && ', ' + data?.city) || address?.city}
              ${(address && ', ' + data?.region) || address?.region}.`}
            </div>
          </div>
        </div>
      </div>
      <Modal size='lg' show={addressModal} onHide={() => setAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col'>
              <div className='customer-details'>
                <label className='form-label fs-6 fw-bolder text-gray-700 mb-3 min-w-70px'>
                  Customer Details
                </label>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    placeholder='Name'
                    value={address?.name}
                    onChange={(e) => setAddress({...address, name: e.target.value})}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    placeholder='Phone'
                    value={address?.msisdn}
                    onChange={(e) => setAddress({...address, msisdn: e.target.value})}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    type='email'
                    className='form-control form-control-sm'
                    placeholder='Email'
                    value={address?.email}
                    onChange={(e) => setAddress({...address, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='mb-4'>
                <AddressFinder
                  label=''
                  onChange={(e) => setAddress({...address, ...e})}
                  setData={address}
                />
              </div>
              <div className='mb-5'>
                <textarea
                  className='form-control form-control-sm'
                  placeholder='Full Address'
                  value={address?.street_address}
                  onChange={(e) => setAddress({...address, street_address: e.target.value})}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setAddressModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={() => saveAddress()}>
            <span className='indicator-label'>Save Address</span>
            <span className='indicator-progress'>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FieldCustomer

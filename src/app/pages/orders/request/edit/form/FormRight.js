import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert'
import {addOrder} from '../../../../../library/api.helper'

const paymentMethods = [
  {id: 1, name: 'COD'},
  {id: 2, name: 'Cash'},
]

const FormRight = ({
  setAddressModal,
  data,
  setData,
  calcSubtotal,
  acceptedProducts,
  extraDiscount,
  location,
  deliveryFree,
}) => {
  // const setAddress = (key, obj) => {
  //     if (key === 'region_id') {
  //         setData({ ...data, region: obj });
  //     }
  //     if (key === 'city_id') {
  //         setData({ ...data, city: obj });
  //     }
  //     if (key === 'area_id') {
  //         setData({ ...data, area: obj });
  //     }
  // };

  const navigate = useNavigate()

  const createOrder = async () => {
    // console.log(acceptedProducts)
    const totPrice = acceptedProducts
      .map((item) => item.pd_price)
      .reduce((prev, curr) => prev + curr, 0)
    const totDis = acceptedProducts
      .map((item) => item.pd_price_after_discount)
      .reduce((prev, curr) => prev + curr, 0)
    const newProducts = []
    for (let i = 0; i < acceptedProducts.length; i++) {
      const product = acceptedProducts[i]
      newProducts.push({
        ...product,
        attribute_id: product.attribute_id ? product.attribute_id : 0,
        discount: product.discount ? product.discount.toString() : '0.00',
        total_price: (product.pd_price - (product.discount ? product.discount : 0)).toString(),
        price: product.price.toString(),
      })
    }

    const resp = await addOrder('', '', {
      price: totPrice?.toString(),
      discount: (totPrice - totDis)?.toString(),
      subtotal: calcSubtotal()?.toString(),
      shipping_fee:
        deliveryFree.length > 0 || Object.keys(deliveryFree).length > 0
          ? deliveryFree['1kg_fee']
          : deliveryFree,
      tax: '0.00',
      total: (totDis - extraDiscount)?.toString(),
      extra_discount: extraDiscount?.toString(),
      paid_amount: data.payment?.toString(),
      order_status: 1,
      shipping_status: 1,
      payment_status: 1,
      shipping_method: 1,
      payment_method: data.paymentMethod,
      payment_channel: 1,
      products: newProducts,
      customer: {
        id: data.customer.id,
        country: data.customer.country,
        name: data.customer.name,
        email: data.customer.email,
        msisdn: data.customer.msisdn,
        type: data.customer.type,
        address: {
          address_type: 'Home',
          name: data.customer.name,
          msisdn: data.customer.msisdn,
          region_id: data.customer.region_id,
          city_id: data.customer.city_id,
          area_id: data.customer.area_id,
          street_address: data.customer.street_address,
          floor_no: data.customer.floor_no,
          apartment_no: data.customer.apartment_no,
        },
      },
    })

    if (resp.success) {
      swal('Success!', 'Order added Successfully', 'success').then(() => {
        navigate('/orders/request/')
      })
    } else {
      swal('Error!', resp.message, 'error')
    }
  }

  return (
    <div className='col-lg-4'>
      <div className='card'>
        <div className='card-header pt-4'>
          <div className='d-block me-5'>
            <label className='form-label'>Request ID</label>
            <div className='baction'>
              <p className='m-0 fs-4'> {data.request_id}</p>
            </div>
          </div>
          <div className='d-block'>
            <label className='form-label'>Request Date</label>
            <div className='baction'>
              <p className='m-0 fs-4 text-info'>{moment(data.request_date).format('LLLL')}</p>
            </div>
          </div>
        </div>
        <div className='card-body position-relative'>
          <button
            className='mt-5 btn btn-icon w-40px h-40px me-3 position-absolute end-0 top-0 btn-light-info'
            onClick={() => setAddressModal(true)}
          >
            <i className='fas fa-pencil'></i>
          </button>
          <h2 className='fs-4 '>Customer Details</h2>
          <div className='d-flex align-items-center '>
            <div className='symbol symbol-45px me-5'>
              <img src='/media/avatars/blank.png' alt='' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                {data.customer.name}
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {data.customer.email}
              </span>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                {data.customer.msisdn}
              </span>
            </div>
          </div>
          <div className='separator my-3'></div>
          <div className=''>
            <h2 className='fs-4 '>Delivery Address</h2>
            <div className='text-gray-600'>
              {data.customer.apartment_no}, {data.customer.street_address}, {data.customer.area},{' '}
              {data.customer.city}, {data.customer.region}
            </div>
          </div>
        </div>
      </div>
      <div className='card mt-5'>
        <div className='card-body'>
          <div className='mb-5'>
            <label className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5'>
              <span className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>
                Payment method
              </span>
            </label>
            {paymentMethods.map((item, indx) => (
              <label
                className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5'
                key={indx}
              >
                <span className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>
                  {item.name}
                </span>
                <input
                  className='form-check-input'
                  name='payment-option'
                  type='radio'
                  checked={item.id == data.paymentMethod}
                  value=''
                  onChange={() => setData({...data, paymentMethod: item.id})}
                />
              </label>
            ))}
          </div>
          <div className='mb-5'>
            <label className='form-label fw-bolder fs-6 text-gray-700'>Partial Payment</label>
            <input
              type='text'
              className='form-control form-control-sm'
              placeholder='Add any payment'
              onChange={(e) => setData({...data, payment: parseFloat(e.target.value)})}
            />
          </div>
          <div className='mt-5'>
            <button type='submit' href='#' className='btn btn-dark w-100' onClick={createOrder}>
              <span className='indicator-label'>
                <i className='fas fa-paper-plane'></i>
                Create Order
              </span>
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormRight

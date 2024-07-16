import {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import AddressFinder from '../../../../../../_metronic/partials/content/addressFinder'
import {getOrderRequestDetails} from '../../../../../library/api.helper'
import LoaderComponent from '../../../../../modules/components/loader/LoaderComponent'
import AddNewProductModal from './AddProductPopup'
import FormRight from './FormRight'
const discounts = ['Fixed', 'Percentage']

const EditForm = ({refatch}) => {
  const {id} = useParams()
  const [productModal, setProductModal] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)
  const [addressModal, setAddressModal] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [deliveryFree, setDeliveryFree] = useState(0.0)
  const [clickedIndx, setClickedIndx] = useState(0)

  const [data, setData] = useState({})
  const [location, setLocation] = useState([])
  const [address, setAddress] = useState('')
  const [acceptedProducts, setAcceptedProducts] = useState([])

  const saveAddrss = () => {
    setData({
      ...data,
      customer_name: address.name,
      customer_email: address.email,
      customer_msisdn: address.msisdn,
      customer: {...data.customer, ...address},
    })
    setAddressModal(false)
  }

  const handleDelete = (id) => {
    setAcceptedProducts(acceptedProducts.filter((el, idx) => el.id !== id))
  }

  const calcSubtotal = () => {
    if (acceptedProducts.length === 0) return 0
    let price = 0
    for (let i = 0; i < acceptedProducts.length; i++) {
      price += acceptedProducts[i].pd_price_after_discount * acceptedProducts[i].qty
    }
    return price
  }

  const isProductAccepted = (indx) => {
    for (let i = 0; i < acceptedProducts.length; i++) {
      if (acceptedProducts[i].idx === indx) {
        return true
      }
    }
    return false
  }

  const handleQuantityChange = (item, qty) => {
    if (qty === 0) return

    const newList = []
    for (let i = 0; i < acceptedProducts.length; i++) {
      if (acceptedProducts[i].id === item.id) {
        const newItem = {...acceptedProducts[i], qty: qty}
        newList.push(newItem)
      } else {
        newList.push(acceptedProducts[i])
      }
    }
    setAcceptedProducts(newList)
  }

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    const resp = await getOrderRequestDetails(1, 101, id)

    if (resp.success) {
      setProducts(resp.data.products)
      setAddress(
        resp.data.delivery_address
          ? {
              ...JSON.parse(resp.data.delivery_address),
              name: resp.data.customer_name,
              email: resp.data.customer_email,
              msisdn: resp.data.customer_msisdn,
              region: resp.data.region,
              city: resp.data.city,
              area: resp.data.area,
            }
          : []
      )

      setLocation({
        region_id: resp.data.region_id,
        city_id: resp.data.city_id,
        area_id: resp.data.area_id,
      })

      setDeliveryFree(resp.data.shipping_fee ? JSON.parse(resp.data.shipping_fee) : 0 || 0)

      setData({
        ...data,
        ...resp,
        request_date: resp.data.created_at,
        customer: resp.data.delivery_address
          ? {
              ...JSON.parse(resp.data.delivery_address),
              id: resp.data.customer_id,
              name: resp.data.customer_name,
              email: resp.data.customer_email,
              msisdn: resp.data.customer_msisdn,
              region: resp.data.region,
              city: resp.data.city,
              area: resp.data.area,
              type: 'regular',
              country: 'BD',
            }
          : [],
        paymentMethod: 1,
      })
      setLoading(false)
    } else {
      setLoading(false)
      setErr(resp.message)
    }
  }

  useEffect(() => {
    if (data.discountType === 'Fixed' && data.discountPrice) {
      setDiscount(data.discountPrice)
    } else if (data.discountType === 'Percentage' && data.discountPrice) {
      const dis = (calcSubtotal() * data.discountPrice) / 100
      setDiscount(dis)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.discountType, data.discountPrice, acceptedProducts])

  if (loading) return <LoaderComponent />
  if (err) return <h1>{err}</h1>

  // // console.log('data: ', data, acceptedProducts, discount)

  return (
    <div className='row'>
      <div className='col-lg-8'>
        <div className='card card-flush '>
          <div className='card-body'>
            <div className='table-responsive'>
              <table
                id='kt_profile_overview_table'
                className='table table-row-bordered gy-2 align-middle fw-bolder'
              >
                <thead className='fs-7 text-gray-400 text-uppercase'>
                  <tr>
                    <th className=''>SL</th>
                    <th className=''>Product</th>
                    <th className='w-100px text-end'>Quantity</th>
                    <th className=''>Details</th>
                    <th className='w-80px text-end'>Action</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  {products.map((item, indx) => (
                    <tr>
                      <td>{indx + 1}</td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='me-5 position-relative'>
                            <div className='symbol symbol-50px symbol-circle'>
                              <img alt='Pic' src={item.product_thumbnails} />
                            </div>
                          </div>
                          <div className='d-flex flex-column justify-content-center'>
                            <a href='' className='fs-6 text-gray-800 text-hover-primary'>
                              {item.product_name}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>{item.product_quantity}</td>
                      <td className='fw-normal'>{item.product_details}</td>
                      <td className='text-end d-flex'>
                        <button
                          className={`btn btn-sm p-2 btn-success me-4 ${
                            isProductAccepted(indx) && 'disabled'
                          }`}
                          onClick={() => {
                            setProductModal(true)
                            setClickedIndx(indx)
                          }}
                        >
                          <span className='indicator-label'>
                            {isProductAccepted(indx) ? 'Accepted' : 'Accept'}
                          </span>
                          <span className='indicator-progress'>
                            Please wait...{' '}
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        </button>
                        {!isProductAccepted(indx) && (
                          <button className='btn btn-sm p-2 btn-danger'>
                            <span className='indicator-label'>Cancel</span>
                            <span className='indicator-progress'>
                              Please wait...{' '}
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='card mt-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              {acceptedProducts.length > 0 &&
                acceptedProducts.map((item, indx) => (
                  <table
                    className='table g-3 table-row-bordered border-gray-300 gs-0 mb-0 fw-bolder text-gray-700'
                    data-kt-element='items'
                  >
                    <thead>
                      <tr className='border-bottom fs-7 fw-bolder text-gray-700 text-uppercase'>
                        <th className=''>Item</th>
                        <th className='w-100px'>Rate</th>
                        <th className='w-100px'>QTY</th>
                        <th className='w-100px'>Discount</th>
                        <th className=' text-end'>Total</th>
                        <th className=' text-end'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='fw-normal' key={indx}>
                        <td className='pe-7'>
                          <div className='d-flex align-items-center'>
                            <div className='me-5 position-relative'>
                              <div className='symbol symbol-50px symbol-circle'>
                                <img alt='Pic' src={item.pd_img} />
                              </div>
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                              <a href='' className='fs-6 text-gray-800 text-hover-primary'>
                                {item.pd_title}
                              </a>
                              {item.value && (
                                <div className='fw-bold text-gray-400'>
                                  {item.option}: {item.value}
                                </div>
                              )}
                              {item.value2 && (
                                <div className='fw-bold text-gray-400'>
                                  {item.option2}: {item.value2}
                                </div>
                              )}
                              {item.value3 && (
                                <div className='fw-bold text-gray-400'>
                                  {item.option3}: {item.value3}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='pt-8'>
                          <span data-kt-element='total'>৳{item.price}</span>
                        </td>
                        <td className='ps-0'>
                          <input
                            className='form-control form-control-solid'
                            type='number'
                            min='1'
                            name='quantity[]'
                            placeholder='1'
                            value={item.qty}
                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                            data-kt-element='quantity'
                          />
                        </td>
                        <td className='pt-8'>
                          <span data-kt-element='total'>
                            ৳ {item.price - item.pd_price_after_discount}
                          </span>
                        </td>
                        <td className='pt-8 text-end text-nowrap'>
                          ৳
                          <span data-kt-element='total'>
                            {(item.pd_price_after_discount * item.qty).toFixed(2)}
                          </span>
                        </td>
                        <td className='pt-5 text-end'>
                          <button
                            type='button'
                            className='btn btn-sm btn-icon btn-light-danger'
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className='la la-trash-o fs-2'></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan='3' className='text-end ps-0'>
                          <div className='fs-5 fw-normal'>Subtotal</div>
                        </th>
                        <th colSpan='2' className='text-end'>
                          ৳<span className='sub-total fw-normal'>{calcSubtotal().toFixed(2)}</span>
                        </th>
                      </tr>
                      <tr>
                        <th colSpan='3' className='text-end ps-0'>
                          <div className='fs-5 fw-normal'>Delivery Cost</div>
                        </th>
                        <th colSpan='2' className='text-end'>
                          ৳
                          <span className='sub-total fw-normal'>
                            {deliveryFree.length > 0 || Object.keys(deliveryFree).length > 0
                              ? deliveryFree['1kg_fee']
                              : deliveryFree}
                          </span>
                        </th>
                      </tr>
                      <tr>
                        <th className='text-end ps-0'>
                          <div className='discount'>
                            <div className='d-flex'>
                              {discounts.map((item, indx) => (
                                <div
                                  className='form-check form-check-custom form-check-solid form-check-sm'
                                  key={indx}
                                >
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='discount-option'
                                    value={item}
                                    checked={data.discountType === item}
                                    onChange={(e) =>
                                      setData({...data, discountType: e.target.value})
                                    }
                                    id={`discount-type-৳{item}`}
                                  />
                                  <label className='form-check-label' htmlFor={item}>
                                    {item}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {data.discountType && (
                              <div className='mt-2 mw-250px'>
                                <input
                                  type='email'
                                  className='form-control form-control-solid'
                                  placeholder='Enter Discount'
                                  onChange={(e) =>
                                    setData({...data, discountPrice: parseFloat(e.target.value)})
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </th>
                        <th colSpan='2' className='text-end ps-0'>
                          <div className='fs-5 fw-normal'>Extra Discount</div>
                        </th>
                        <th colSpan='2' className='text-end'>
                          ৳<span className='sub-total fw-normal'>{discount?.toFixed(2)}</span>
                        </th>
                      </tr>
                      <tr className='align-top fw-bolder text-end text-gray-700'>
                        <th colSpan='3' className='ps-0'>
                          Total
                        </th>
                        <th colSpan='2' className='text-end fs-5 text-nowrap'>
                          ৳
                          <span>
                            {(
                              calcSubtotal() +
                              (deliveryFree.length > 0 || Object.keys(deliveryFree).length > 0
                                ? deliveryFree['1kg_fee']
                                : deliveryFree) -
                              discount
                            ).toFixed(2)}
                          </span>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                ))}
            </div>
          </div>
        </div>
      </div>
      <FormRight
        setPaymentModal={setPaymentModal}
        setAddressModal={setAddressModal}
        data={data}
        setData={setData}
        calcSubtotal={calcSubtotal}
        acceptedProducts={acceptedProducts}
        extraDiscount={discount}
        location={location}
        deliveryFree={deliveryFree}
      />
      <Modal size='lg' show={addressModal} onHide={() => setAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col'>
              <div className='customer-details'>
                <label className='form-label fs-6 fw-bolder text-gray-700 mb-3 min-w-70px'>
                  Customer Detials
                </label>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    placeholder='Name'
                    value={address.name}
                    onChange={(e) => setAddress({...address, name: e.target.value})}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-sm'
                    placeholder='Phone'
                    value={address.msisdn}
                    onChange={(e) => setAddress({...address, msisdn: e.target.value})}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    type='email'
                    className='form-control form-control-sm'
                    placeholder='Email'
                    value={address.email}
                    onChange={(e) => setAddress({...address, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='mb-4'>
                <AddressFinder label='' onChange={(e) => console.log(e)} setData={location} />
              </div>

              <div className='mb-5'>
                <input
                  className='form-control form-control-sm'
                  placeholder='Apartment No'
                  value={address.apartment_no}
                  onChange={(e) => setAddress({...address, apartment_no: e.target.value})}
                />
              </div>

              <div className='mb-5'>
                <textarea
                  className='form-control form-control-sm'
                  placeholder='Full Address'
                  value={address.street_address}
                  onChange={(e) => setAddress({...address, street_address: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setProductModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={() => saveAddrss()}>
            <span className='indicator-label'>Save Address</span>
            <span className='indicator-progress'>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={productModal} onHide={() => setProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New order item</Modal.Title>
        </Modal.Header>
        <AddNewProductModal
          setAddProductModal={setProductModal}
          acceptedProducts={acceptedProducts}
          setAcceptedProducts={setAcceptedProducts}
          roid={id}
          order={data}
          index={clickedIndx}
        />
      </Modal>
    </div>
  )
}

export default EditForm

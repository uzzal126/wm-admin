import {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'
import swal from 'sweetalert'
import AddressFinder from '../../../../../_metronic/partials/content/addressFinder'
import {CITY_LIST, ORDER_ADD} from '../../../../constants/api.constants'
import {getCustomerList, getQueryRequest, queryRequest} from '../../../../library/api.helper'
import AddNewProductModal from './modal/AddNewProductModal'
const CreateOrder = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    price: '0',
    discount: '0',
    extra_discount: '0.00',
    subtotal: '0',
    shipping_fee: '0',
    tax: '0',
    total: '0',
    paid_amount: '0',
    order_status: 1,
    shipping_status: 1,
    payment_status: 1,
    shipping_method: 1,
    payment_method: 3,
    payment_channel: 1,
    products: [],
    customer: {
      id: 0,
      country: 'BD',
      name: null,
      email: '',
      msisdn: null,
      type: 'regular',
      address: {
        id: 0,
        address_type: 'Home',
        name: '',
        msisdn: '',
        region_id: 0,
        city_id: 0,
        area_id: 0,
        street_address: '',
        floor_no: null,
        apartment_no: null,
      },
    },
  })

  const [showProductModal, setShowProductMoral] = useState(false)
  const [customerList, setCustomerList] = useState([])
  const [location, setLocation] = useState({})
  const [discount, setDiscount] = useState('')

  const handleDelete = (indx) => {
    const prods = post.products.filter((el, idx) => idx != indx)
    const subtotal = calcSubtotal(prods)
    const price = calcPrice(prods)
    setPost({
      ...post,
      subtotal: subtotal,
      total: subtotal,
      products: prods,
      price,
    })
  }
  const updateQty = (value, indx) => {
    const newProduct = [...post.products]

    post.products.map((item, i) => {
      if (i === indx) {
        newProduct[i] = {
          ...item,
          qty: value,
          discount: item?.discount * value.toString(),
          price: item?.pd_price * value.toString(),
        }
      }
    })
    const subtotal = calcSubtotal(newProduct)
    const price = calcPrice(newProduct)
    setPost({
      ...post,
      subtotal: subtotal,
      total: subtotal,
      products: newProduct,
      price,
    })
  }

  const calcSubtotal = (products) => {
    let price = 0
    if (products.length > 0) {
      products.map((item) => {
        price += item.pd_price_after_discount * item.qty
      })
    }
    return price
  }
  const calcPrice = (products) => {
    let price = 0
    if (products.length > 0) {
      products.map((item) => {
        price += item.pd_price * item.qty
      })
    }
    return price
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getCustomerList('?page=1&items_per_page=5000')
    if (res.success) {
      const data = []
      for (let i = 0; i < res.data.length; i++) {
        data.push({
          ...res.data[i],
          label: `${res?.data[i]?.name}${
            res?.data[i]?.msisdn ? '(' + res?.data[i]?.msisdn?.slice(-11) + ')' : ''
          }`,
          value: `${res?.data[i]?.name}${
            res?.data[i]?.msisdn ? '(' + res?.data[i]?.msisdn + ')' : res?.data[i]?.name
          }`,
        })
      }
      setCustomerList(data)
    }
  }
  const selectCustomer = async (obj) => {
    // // console.log(obj)
    const newData = {
      id: obj.id,
      country: obj.country,
      name: obj.name,
      email: obj.email,
      msisdn: obj.msisdn,
      type: obj.type,
      address: {
        id: obj.addresses.length > 0 ? obj.addresses[0].id : 0,
        address_type: obj.addresses.length > 0 ? obj.addresses[0].address_type : '',
        name: obj.addresses.length > 0 ? obj.addresses[0].name : '',
        msisdn: obj.addresses.length > 0 ? obj.addresses[0].msisdn : '',
        region_id: obj.addresses.length > 0 ? obj.addresses[0].region_id : 0,
        city_id: obj.addresses.length > 0 ? obj.addresses[0].city_id : 0,
        area_id: obj.addresses.length > 0 ? obj.addresses[0].area_id : 0,
        street_address: obj.addresses.length > 0 ? obj.addresses[0].street_address : '',
        floor_no: obj.addresses.length > 0 ? obj.addresses[0].floor_no : '',
        apartment_no: obj.addresses.length > 0 ? obj.addresses[0].apartment_no : '',
      },
    }

    let shipping =
      obj.addresses.length > 0 ? await getShippingCharge(obj.addresses[0].region_id) : []
    shipping =
      shipping && shipping.length > 0 && shipping.filter((f) => f.id === obj.addresses[0].city_id)

    setPost({
      ...post,
      shipping_fee: shipping.length > 0 ? shipping[0]['1kg_fee'] : 0,
      customer: newData,
    })
    if (obj.addresses.length > 0) {
      setLocation({
        region_id: obj.addresses[0].region_id,
        city_id: obj.addresses[0].city_id,
        area_id: obj.addresses[0].area_id,
      })
    }
  }

  const getShippingCharge = async (id) => {
    const res = await getQueryRequest(`${CITY_LIST}/${id}`)
    if (res.success && res.status_code === 200) {
      return res.data
    } else {
      return []
    }
  }

  const setAddress = (key, obj) => {
    if (key === 'region_id') {
      setPost({
        ...post,
        customer: {
          ...post.customer,
          address: {
            ...post.customer.address,
            region_en: obj.title,
            region_id: obj.id,
            city_id: 0,
            area_id: 0,
          },
        },
      })
    }
    if (key === 'city_id') {
      setPost({
        ...post,
        shipping_fee: obj['1kg_fee'],
        customer: {
          ...post.customer,
          address: {
            ...post.customer.address,
            city_en: obj.title,
            city_id: obj.id,
            area_id: 0,
          },
        },
      })
    }
    if (key === 'area_id') {
      setPost({
        ...post,
        customer: {
          ...post.customer,
          address: {
            ...post.customer.address,
            area_en: obj.title,
            area_id: obj.id,
          },
        },
      })
    }
  }

  const isFormValid = () => {
    return (
      post?.products?.length > 0 &&
      post?.customer?.address?.name?.trim()?.length > 0 &&
      (post?.customer?.address?.msisdn?.length == 11 ||
        post?.customer?.address?.msisdn?.length == 13) &&
      post?.customer?.address?.street_address?.trim()?.length > 0 &&
      post?.customer?.address?.city_id > 0 &&
      post?.customer?.address?.region_id > 0 &&
      post?.customer?.address?.area_id > 0
    )
  }
  // // console.log('post: ', post)

  const submitOrder = async () => {
    const newProds = []
    if (post.products.length > 0) {
      post.products.map((item) => {
        newProds.push({
          id: item.pd_id,
          attribute_id: item.attribute_id,
          discount: item.discount.toString(),
          price: item.price.toString(),
          qty: item.qty,
          total_price: item.price.toString(),
        })
      })
    }

    const data = {
      ...post,
      price: post.price.toString(),
      discount: post.discount.toString(),
      extra_discount: post.extra_discount.toString(),
      subtotal: post.subtotal.toString(),
      shipping_fee: post.shipping_fee.toString(),
      tax: post.tax.toString(),
      total: (
        parseFloat(post.total) +
        parseFloat(post.shipping_fee) -
        parseFloat(post.extra_discount)
      ).toString(),
      paid_amount: post.paid_amount.toString(),
      products: newProds,
    }
    const res = await queryRequest(ORDER_ADD, data)
    if (res.success && res.status_code === 200) {
      swal('Success', res.message, 'success').then(() => {
        navigate('/orders/index')
      })
    } else {
      swal('Error', res.message, 'error')
    }
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10'>
        <div className='card'>
          <div className='card-body pt-5'>
            <form action='' id='kt_invoice_form'>
              <div className='d-flex flex-column align-items-center flex-xl-row'>
                <div
                  className='d-flex flex-equal fw-row text-nowrap'
                  data-bs-toggle='tooltip'
                  data-bs-dimiss='click'
                  data-bs-trigger='hover'
                  title='Enter invoice number'
                >
                  <span className='fs-2x fw-bolder text-gray-800'>New Order </span>
                </div>
                <div className='add-product text-end'>
                  <button
                    type='button'
                    className='btn btn-sm btn-light-success'
                    onClick={() => setShowProductMoral(true)}
                  >
                    <i className='fas fa-plus'></i> Add More Item
                  </button>
                </div>
              </div>
              <div className='separator separator-dashed border-dark my-2'></div>
              {post && post.products.length > 0 && (
                <div className='mb-0 mt-4'>
                  <div className='table-responsive mb-10'>
                    <table
                      className='table g-3 table-row-bordered border-gray-300 gs-0 mb-0 fw-bolder text-gray-700'
                      data-kt-element='items'
                    >
                      <thead>
                        <tr className='border-bottom fs-7 fw-bolder text-gray-700 text-uppercase'>
                          <th className=''>Item</th>
                          <th className=''>Rate</th>
                          <th className=''>QTY</th>
                          <th className=''>Discount</th>
                          <th className='w-100px text-end'>Total</th>
                          <th className='w-40px text-end'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {post.products.length > 0 &&
                          post.products.map((item, i) => (
                            <tr className='fw-normal' key={i}>
                              <td className='pe-7'>
                                <div className='d-flex align-items-center'>
                                  <div className='me-5 position-relative'>
                                    <div className='symbol symbol-50px symbol-circle'>
                                      <img alt='Pic' src={item.thumbnail_url} />
                                    </div>
                                  </div>
                                  <div className='d-flex flex-column justify-content-center'>
                                    <a href='' className='fs-6 text-gray-800 text-hover-primary'>
                                      {item.pd_title}
                                    </a>
                                    {item?.option && (
                                      <div className='fw-bold text-gray-400'>
                                        {`${item?.option}: ${item?.value}`}
                                      </div>
                                    )}
                                    {item?.option2 && (
                                      <div className='fw-bold text-gray-400'>
                                        {`${item?.option2}: ${item?.value2}`}
                                      </div>
                                    )}
                                    {item?.option3 && (
                                      <div className='fw-bold text-gray-400'>
                                        {`${item?.option3}: ${item?.value3}`}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className='pt-8'>
                                <span data-kt-element='total'>৳{item.pd_price}</span>
                              </td>
                              <td className='ps-0'>
                                <input
                                  className='form-control form-control-solid'
                                  type='number'
                                  min='1'
                                  placeholder='1'
                                  value={item.qty}
                                  onChange={(e) => updateQty(e.target.value, i)}
                                />
                              </td>
                              <td className='pt-8'>
                                <span data-kt-element='total'>৳{item.discount}</span>
                              </td>
                              <td className='pt-8 text-end text-nowrap'>
                                ৳
                                <span data-kt-element='total'>
                                  {item.pd_price * item.qty - item.discount}
                                </span>
                              </td>
                              <td className='pt-5 text-end'>
                                <button
                                  type='button'
                                  onClick={() => handleDelete(i)}
                                  className='btn btn-sm btn-icon btn-light-danger'
                                >
                                  <i className='la la-trash-o fs-2'></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan='3' className='text-end ps-0'>
                            <div className='fs-5 fw-normal'>Subtotal</div>
                          </th>
                          <th colSpan='2' className='text-end'>
                            <span className='sub-total fw-normal'>৳{post.subtotal}</span>
                          </th>
                        </tr>
                        <tr>
                          <th colSpan='3' className='text-end ps-0'>
                            <div className='fs-5 fw-normal'>Shipping Price</div>
                          </th>
                          <th colSpan='2' className='text-end'>
                            <span className='sub-total fw-normal'>{post.shipping_fee}</span>
                          </th>
                        </tr>
                        <tr>
                          <th className='text-end ps-0'>
                            <div className='discount'>
                              <div className='d-flex'>
                                <div className='form-check form-check-custom form-check-solid form-check-sm'>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='discount-option'
                                    checked={discount === 'fixed' ? true : false}
                                    id='Fixed'
                                    onChange={() => setDiscount('fixed')}
                                  />
                                  <label className='form-check-label' for='Fixed'>
                                    Fixed
                                  </label>
                                </div>
                                <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='discount-option'
                                    checked={discount === 'percent' ? true : false}
                                    id='Percent'
                                    onChange={() => setDiscount('percent')}
                                  />
                                  <label className='form-check-label' for='Percent'>
                                    Percent
                                  </label>
                                </div>
                              </div>
                              {discount && (
                                <div className='mt-2 mw-250px'>
                                  <input
                                    type='email'
                                    className='form-control form-control-solid'
                                    placeholder='Enter Discount'
                                    onChange={(e) =>
                                      setPost({
                                        ...post,
                                        extra_discount:
                                          discount === 'fixed'
                                            ? e.target.value
                                            : (post.total * e.target.value) / 100,
                                      })
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
                            ৳<span className='sub-total fw-normal'>{post.extra_discount}</span>
                          </th>
                        </tr>
                        <tr className='align-top fw-bolder text-end text-gray-700'>
                          <th colSpan='3' className='ps-0'>
                            Total
                          </th>
                          <th colSpan='2' className='text-end fs-5 text-nowrap'>
                            ৳
                            <span>
                              {parseFloat(post.total) +
                                parseFloat(post.shipping_fee) -
                                post.extra_discount}
                            </span>
                          </th>
                        </tr>
                        <tr className='align-top fw-bolder text-end text-gray-700'>
                          <th colSpan='3' className='ps-0'>
                            Total Paid
                          </th>
                          <th colSpan='2' className='text-end fs-5 text-nowrap text-success'>
                            ৳<span>{post.paid_amount}</span>
                          </th>
                        </tr>
                        <tr className='align-top fw-bolder text-end text-gray-700'>
                          <th colSpan='3' className='ps-0'>
                            Balance
                          </th>
                          <th colSpan='2' className='text-end fs-5 text-nowrap text-danger'>
                            ৳
                            <span>
                              {parseFloat(post.total) +
                                parseFloat(post.shipping_fee) -
                                (parseFloat(post.paid_amount) + parseFloat(post.extra_discount))}
                            </span>
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </form>

            <Modal show={showProductModal} size={'lg'} onHide={() => setShowProductMoral(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <AddNewProductModal
                setShowProductMoral={setShowProductMoral}
                data={post}
                setData={setPost}
              />
            </Modal>
          </div>
        </div>
      </div>

      <div className='flex-lg-auto w-lg-300px'>
        <div className='card'>
          <div className='card-body p-10'>
            <div className='customer-details'>
              <label className='form-label fs-6 fw-bolder text-gray-700 mb-3 min-w-70px'>
                Shipping Detials
              </label>
              <div className='mb-5'>
                <Select
                  defaultValue={[]}
                  name='customers'
                  options={customerList}
                  className='multi-select mb-2'
                  classNamePrefix='Search Customer, Name, Mobile, Email'
                  onChange={(e) => selectCustomer(e)}
                />
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Name'
                  value={post.customer.name}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      customer: {
                        ...post.customer,
                        name: e.target.value,
                        address: {
                          ...post.customer.address,
                          name: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Phone'
                  value={post.customer.msisdn}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      customer: {
                        ...post.customer,
                        msisdn: e.target.value,
                        address: {
                          ...post.customer.address,
                          msisdn: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className='mb-5'>
                <input
                  type='email'
                  className='form-control form-control-solid'
                  placeholder='Email'
                  value={post.customer.email}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      customer: {
                        ...post.customer,
                        email: e.target.value,
                        address: {
                          ...post.customer.address,
                          email: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className='mb-5'>
                <textarea
                  name='notes'
                  className='form-control form-control-solid'
                  rows='3'
                  placeholder='Full Address'
                  value={post.customer.address.street_address}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      customer: {
                        ...post.customer,
                        address: {
                          ...post.customer.address,
                          street_address: e.target.value,
                        },
                      },
                    })
                  }
                ></textarea>
              </div>
            </div>
            <div className='separator separator-dashed mb-8'></div>

            <div className='mb-4'>
              <AddressFinder label='' onChange={(e) => setAddress(e)} setData={location} />
            </div>

            <div className='separator separator-dashed mb-4'></div>

            <div className='mb-4'>
              <label className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5'>
                <span className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>
                  Payment method
                </span>
              </label>
              <label className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-5'>
                <span className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>COD</span>
                <input
                  className='form-check-input'
                  name='payment-option'
                  type='radio'
                  checked
                  value=''
                />
              </label>
            </div>

            <div className='separator separator-dashed mb-4'></div>

            <div className='mb-5'>
              <label className='form-label fw-bolder fs-6 text-gray-700'>Partial Payment</label>
              <input
                type='text'
                className='form-control'
                placeholder='Add any payment'
                onChange={(e) =>
                  setPost({
                    ...post,
                    paid_amount: e.target.value,
                  })
                }
              />
            </div>

            <div className='mb-0'>
              <button
                type='submit'
                disabled={!isFormValid()}
                onClick={() => submitOrder()}
                className='btn btn-dark w-100'
              >
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
    </div>
  )
}

export default CreateOrder

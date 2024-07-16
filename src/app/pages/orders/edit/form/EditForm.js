import axios from 'axios'
import {useState} from 'react'
import {Accordion, Col, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'

import {
  ADD_NOTE,
  ORDER_PRODUCT_DELETE,
  ORDER_SHIPPING,
  POST_EXTRA_DISCOUNT,
  POST_ORDER_PRODUCT_DELETE,
} from '../../../../constants/api.constants'
import {queryRequest} from '../../../../library/api.helper'
import {getAuth} from '../../../../modules/auth'
import {Link} from '../../../../modules/helper/linkHandler'
import {dateUnixReadable, formatLongString} from '../../../../modules/helper/misc'
import {getShippingPrice} from '../../custom/components/helper/dataHelper'
import OrderProgress from './Progess'
import FieldCustomer from './components/customer'
import AddProduct from './components/product/add'
import EditProduct from './components/product/edit'
import RenderVariant from './components/renderVariant'
import PaymentModal from './modal/PaymentModal'

const delivery_types = [
  {
    id: 48,
    title: 'Regular',
  },
  {
    id: 12,
    title: 'Express',
  },
]

const EditForm = ({
  data,
  setData,
  statusHandler,
  handlerOrderStatus,
  orderStatus,
  refatch: refetch,
}) => {
  const [paymentModal, setPaymentModal] = useState(false)
  const [extraDiscount, setExtraDiscount] = useState(data?.extra_discount || 0)
  const [loading, setLoading] = useState(false)
  const [addNote, setNote] = useState('')
  const [changingDeliveryType, setChangingDeliveryType] = useState(false)

  const user = getAuth()

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Can not delete the only remaining product
    </Tooltip>
  )

  const setPaidAmount = (amount) => {
    if (amount) {
      data.paid_amount = parseFloat(data?.paid_amount) + parseFloat(amount)
    }
  }

  const handlerAddNote = async () => {
    if (addNote !== '') {
      setLoading(true)
      const post = {
        // oid: data.id,
        order_status_id: data.order_status_id,
        order_note: addNote,
      }

      const res = await queryRequest(`${ADD_NOTE}/${data?.id}`, post, 'put')

      if (res.success && res.status_code === 200) {
        setLoading(false)
        toast.success(res.message)
        setNote('')
        refetch(true)
      } else {
        setLoading(false)
        toast.error(res.message)
      }
    }
  }

  const handleExtraDiscount = async (data) => {
    if (data?.total < extraDiscount) {
      toast.error('Extra discount can not be greater than total price!')
      return
    }
    const post = {
      oid: data.id,
      extra_discount: extraDiscount.toString(),
    }
    const res = await queryRequest(`${POST_EXTRA_DISCOUNT}/${data?.id}`, post, 'put')
    if (res.success && res.status_code === 200) {
      toast.success(res.message)
      setData({
        ...data,
        extra_discount: extraDiscount,
        subtotal: data?.price - extraDiscount,
        total: data?.price + data?.shipping_fee - extraDiscount,
      })
    } else {
      toast.error(res.message)
    }
  }

  const handleDeleteProduct = async (product, idx) => {
    if (data?.products?.length === 1) {
      // toast.error('Sorry! Deleting the only remaining product is not allowed.')
      return
    }
    let existingProduct = data.products.filter((f, i) => i !== idx)

    let weight = 0

    if (existingProduct && existingProduct.length > 0) {
      existingProduct.map((item) => {
        return (weight = weight + item.shipping_attribute.weight * item.qty)
      })
    }

    let ship_post = {
      weight: weight,
      delivery_type: data.delivery_type,
      city_id: data.customer.address.city_id,
      zone_id: data.customer.address.zone_id,
      area_id: data.customer.address.area_id,
    }
    let shipping_fee = await getShippingPrice(ship_post)
    let fee = data.delivery_type === 48 ? shipping_fee?.price : shipping_fee?.express_price

    const post = {
      oid: data?.id,
      shipping_fee: fee,
      order_tax: data?.tax,
      product_id: product.product_id,
      attribute_id: product.attribute_id,
    }
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const {data: res} = await axios.delete(`${ORDER_PRODUCT_DELETE}/${data?.id}`, {
            data: post,
          })
          if (res.success && res.status_code === 200) {
            toast.success(res.message)
            refetch(true)
          } else {
            toast.error(res.message)
          }
        } catch (err) {
          toast.error(err.message || 'Sorry! An error occurred.')
        }
      }
    })
  }

  const handleReplaceProduct = async (product, idx) => {
    let existingProduct = data.products.filter((f, i) => i !== idx)

    let weight = 0

    if (existingProduct && existingProduct.length > 0) {
      existingProduct.map((item) => {
        return (weight = weight + item.shipping_attribute.weight * item.qty)
      })
    }

    let ship_post = {
      weight: weight,
      delivery_type: data.delivery_type,
      city_id: data.customer.address.city_id,
      zone_id: data.customer.address.zone_id,
      area_id: data.customer.address.area_id,
    }
    let shipping_fee = await getShippingPrice(ship_post)
    let fee = data.delivery_type === 48 ? shipping_fee?.price : shipping_fee?.express_price

    const post = {
      oid: data?.id,
      shipping_fee: fee,
      order_tax: data?.tax,
      product_id: product.product_id,
      attribute_id: product.attribute_id,
    }
    const res = await queryRequest(POST_ORDER_PRODUCT_DELETE, post)
    if (res.success && res.status_code === 200) {
      toast.success('The unavailable variant was removed')
      refetch(true)
    } else {
      toast.error(res.message)
    }
  }

  const handleDeliveryTypeChange = async (delivery_type) => {
    let shipping_fee = 0

    let ship_post = {
      weight: data?.weight,
      delivery_type: delivery_type,
      city_id: data?.shipping_address?.city_id,
      zone_id: data?.shipping_address?.zone_id,
      area_id: data?.shipping_address?.area_id,
    }

    let shipping_fee_res = await getShippingPrice(ship_post)

    if (typeof shipping_fee_res === 'object' && Object.keys(shipping_fee_res).length > 0) {
      let fee = delivery_type === 48 ? shipping_fee_res?.price : shipping_fee_res?.express_price
      shipping_fee = Math.ceil(fee)
    }

    const post_data = {
      shipping_fee,
      delivery_type,
      weight: data?.weight,
    }

    setChangingDeliveryType(true)
    const res = await queryRequest(`${ORDER_SHIPPING}/${data?.invoice_id}`, post_data, 'put')
    setChangingDeliveryType(false)

    if (res?.success) {
      refetch(true)
    } else {
      toast.error(res?.message || 'Sorry! An error occurred.')
    }
  }

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => toast.success('link copied!'))
      .catch((err) => toast.error('Error in copying text: ', err))
  }

  return (
    <div className='row'>
      <div className='col-lg-8'>
        <div className='card card-flush '>
          <div className='card-header mt-5'>
            <div className='card-title'>
              <div className='d-block me-5'>
                <label className='form-label'>Order ID</label>
                <div className='baction'>
                  <p className='m-0 fs-4'> {data?.invoice_id}</p>
                </div>
              </div>
              <div className='d-block'>
                <label className='form-label'>Order Date</label>
                <div className='baction'>
                  <p className='m-0 fs-4 text-info'>{dateUnixReadable(data?.created_at)}</p>
                </div>
              </div>
            </div>
            <div className='card-toolbar'>
              {orderStatus === 1 ? (
                <>
                  <button
                    className='btn btn-sm p-2 btn-success mb-3 me-4'
                    onClick={() => handlerOrderStatus(3)}
                  >
                    <span className='indicator-label'>Accept</span>
                    <span className='indicator-progress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                  <button
                    className='btn btn-sm p-2 btn-danger mb-3 me-4'
                    onClick={() => handlerOrderStatus(7)}
                  >
                    <span className='indicator-label'>Reject</span>
                    <span className='indicator-progress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                </>
              ) : orderStatus === 7 ? (
                <span className='text-danger'>Rejected</span>
              ) : (
                <>
                  <div className='d-flex align-items-center'>
                    <span className='text-success'>Accepted</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='card-body pt-0'>
            <div className='separator separator-dashed border-dark my-2'></div>
            <div className='table-responsive'>
              <table
                id='kt_profile_overview_table'
                className='table table-row-bordered gy-2 align-middle fw-bolder'
              >
                <thead className='fs-7 text-gray-900 fw-bolded text-uppercase'>
                  <tr>
                    <th className='min-w-150px'>Products</th>
                    <th className='w-70px text-end'>Rate</th>
                    <th className='w-70px text-end'>QTY</th>
                    <th className='w-70px text-end'>Discount</th>
                    <th className='text-end'>Total</th>
                    <th className='w-80px text-end'>
                      {orderStatus <= 3 && orderStatus !== 1 && (
                        <AddProduct data={data} refetch={refetch} />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  {data?.products &&
                    data?.products.length > 0 &&
                    data?.products.map((pro, i) => (
                      <tr key={`pro-${i}`} className='text-gray-600'>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='me-5 position-relative'>
                              <div className='symbol symbol-50px symbol-circle'>
                                <img
                                  alt={(pro?.thumbnail && (pro?.thumbnail).alt) || pro?.name}
                                  src={
                                    (pro?.thumbnail && (pro?.thumbnail).src) ||
                                    (pro?.thumbnail && (pro?.thumbnail).url) ||
                                    ''
                                  }
                                />
                              </div>
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                              <p className='fs-6 text-hover-primary mb-0'>
                                {formatLongString(pro?.title || pro.name, 50)}
                              </p>
                              <RenderVariant product={pro} />
                            </div>
                          </div>
                        </td>
                        <td className='text-end'>৳ {pro.selling_rate}</td>
                        <td className='text-end position-relative'>
                          <span className='quantity'>{pro.qty}</span>
                          <span className='position-absolute start-25'>x</span>
                        </td>
                        <td className='text-end'>{pro.discount}</td>
                        <td className='text-end'>
                          {Number(pro.selling_rate * pro.qty - pro.discount).toFixed(2)}
                        </td>
                        <td className='text-end'>
                          {orderStatus <= 3 && orderStatus !== 1 && (
                            <>
                              <EditProduct
                                data={data}
                                refetch={refetch}
                                pro={pro}
                                replaceFunc={() => handleReplaceProduct(pro, i)}
                              />
                              {data?.products?.length === 1 ? (
                                <OverlayTrigger
                                  placement='top'
                                  delay={{show: 250, hide: 400}}
                                  overlay={renderTooltip}
                                >
                                  <button
                                    onClick={() => handleDeleteProduct(pro, i)}
                                    className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                                  >
                                    <i className='la la-trash-o fs-3'></i>
                                  </button>
                                </OverlayTrigger>
                              ) : (
                                <button
                                  onClick={() => handleDeleteProduct(pro, i)}
                                  className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                                >
                                  <i className='la la-trash-o fs-3'></i>
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  {data?.promo_code && data?.promo_discount > 0 && (
                    <tr className='fw-normal'>
                      <td className=''>Coupon Applied</td>
                      <td className='text-end' colSpan='2'>
                        {data?.promo_code}
                      </td>
                      <td className='text-end' colSpan='1'>
                        Discount
                      </td>
                      <td className='text-end'>-৳ {data?.promo_discount}</td>
                    </tr>
                  )}
                  <tr className='fw-normal'>
                    <td className='text-end ps-0' colSpan='3'>
                      <div className='discount'>
                        <div className='mt-2 mw-250px d-flex'>
                          <div className='flex-grow-1'>
                            <input
                              type='number'
                              min={0}
                              className='form-control'
                              value={extraDiscount}
                              placeholder='Enter Discount'
                              onChange={(e) => setExtraDiscount(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={() => handleExtraDiscount(data)}
                            disabled={extraDiscount && extraDiscount !== 0 ? false : true}
                            className='btn btn-sm btn-icon btn-light-success w-40px h-40px ms-2'
                          >
                            <i className='fas fa-sync fs-4'></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className='text-end'>Extra Discount</td>
                    <td className='text-end'>-৳ {Number(data?.extra_discount)}</td>
                  </tr>
                  <tr className='fw-normal'>
                    <td className='text-end' colSpan='4'>
                      Subtotal
                    </td>
                    <td className='text-end'>
                      {/* {Number(data?.subtotal + data?.extra_discount).toFixed(2)} */}
                      {Number(data?.subtotal).toFixed(2)}
                    </td>
                  </tr>

                  <tr className='fw-normal'>
                    <td className='text-end' colSpan='4'>
                      Tax
                    </td>
                    <td className='text-end'>৳ {data?.tax}</td>
                  </tr>

                  <tr className='fw-normal'>
                    <td className=' ps-0' colSpan='3'>
                      <Col>
                        <h6>Delivery Type</h6>
                        <div
                          className='btn-group w-100 w-lg-50'
                          data-kt-buttons='true'
                          data-kt-buttons-target='[data-kt-button]'
                        >
                          {delivery_types.map((item, indx) => (
                            <label
                              className={`btn btn-outline btn-outline-dashed btn-active-light-primary btn-primary ${
                                data?.delivery_type === item?.id ? '' : 'active'
                              } ${changingDeliveryType ? 'disabled' : ''}`}
                              data-kt-button='true'
                              key={indx}
                            >
                              <input
                                className='btn-check'
                                type='radio'
                                name='d_type'
                                value='48'
                                checked={data?.delivery_type === item?.id}
                                // onChange={(e) =>
                                //   setFieldValue('delivery_type', parseInt(e.target.value))
                                // }
                                onChange={() => handleDeliveryTypeChange(item?.id)}
                              />
                              {item?.title}
                            </label>
                          ))}

                          {/* <label
                            className={`btn btn-outline btn-outline-dashed btn-active-light-primary btn-primary ${
                              data?.delivery_type === 12 ? '' : 'active'
                            }`}
                            data-kt-button='true'
                          >
                            <input
                              className='btn-check'
                              type='radio'
                              name='d_type'
                              value='12'
                              checked={data?.delivery_type === 12}
                              // onChange={(e) =>
                              //   setFieldValue('delivery_type', parseInt(e.target.value))
                              // }
                            />
                            Express
                          </label> */}
                        </div>
                      </Col>
                    </td>
                    <td className='text-end' colSpan=''>
                      Shipping
                    </td>
                    <td className='text-end'>৳ {Number(data?.shipping_fee).toFixed(2)}</td>
                  </tr>

                  <tr>
                    <td className='text-end' colSpan='4'>
                      Total
                    </td>
                    <td className='text-end'>৳ {Number(data?.total).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className='text-end' colSpan='4'>
                      Total Paid
                    </td>
                    <td className='text-end text-success'>৳ {data?.paid_amount}</td>
                  </tr>
                  <tr>
                    <td className='text-end' colSpan='4'>
                      Balance
                    </td>
                    <td className='text-end text-danger'>
                      ৳ {Number(data?.total - data?.paid_amount).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {data.order_status_id !== 1 && data.order_status_id !== 7 && (
              <>
                <div className='separator separator-dashed border-dark mb-9 mt-5'></div>
                <div className='action text-end'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='fs-5 text-start'>
                      <small className='text-muted'>Current Status</small>
                      <br />
                      {data.order_status}
                    </h3>
                    {data.possible_status_list && data.possible_status_list.length > 0 && (
                      <div className='card-toolbar'>
                        <select className='form-select' onChange={statusHandler}>
                          <option value=''>Change Status</option>
                          {data.possible_status_list.map((item, i) => (
                            <option value={item.id} key={`op-${i}`}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {orderStatus <= 3 && orderStatus !== 1 && (
              <>
                <div className='separator separator-dashed border-dark mb-9 mt-5'></div>
                <div className='action text-end'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='fs-5'>Manage payments for this Order</h3>
                    <div className='card-toolbar'>
                      <button
                        className='btn btn-sm p-2 btn-dark mb-3 me-4'
                        onClick={() => setPaymentModal(true)}
                        disabled={data?.paid_amount === data?.total}
                      >
                        Payment
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='card my-5'>
          <div className='card-header min-h-50px'>
            <h2 className='card-title'>Track Order</h2>
          </div>
          <div className='card-body pt-2 '>
            <div className='d-flex flex-row align-items-center'>
              <input
                className='form-control'
                readOnly
                alt='Click to copy link'
                style={{cursor: 'pointer'}}
                value={`https://${user?.shop_info?.domain}/tracking?invoice_id=${data?.invoice_id}`}
                onClick={() =>
                  copyToClipboard(
                    `https://${user?.shop_info?.domain}/tracking?invoice_id=${data?.invoice_id}`
                  )
                }
              />
              <i
                className='fa fa-copy mx-2'
                style={{fontSize: 22, cursor: 'pointer'}}
                onClick={() =>
                  copyToClipboard(
                    `https://${user?.shop_info?.domain}/tracking?invoice_id=${data?.invoice_id}`
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className='card my-5'>
          <div className='card-header min-h-50px'>
            <h2 className='card-title'>Order Notes</h2>
          </div>
          <div className='card-body pt-2 pb-0'>
            {data?.order_note &&
              data?.order_note.length > 0 &&
              data?.order_note.map((item, i) => (
                <div className='d-flex align-items-center mb-6' key={i}>
                  <span
                    data-kt-element='bullet'
                    className='bullet bullet-vertical d-flex align-items-center min-h-50px mh-100 me-4 bg-info'
                  ></span>

                  <div className='flex-grow-1 me-5'>
                    <div className='text-gray-800 fw-semibold fs-5'>{item.order_note}</div>
                  </div>
                  <div>
                    <div className='text-gray-800 fw-semibold fs-7'>
                      Lead by:
                      <span className='fw-semibold ms-3'>{item.user_name}</span>
                    </div>

                    <div className='text-gray-500 fw-semibold fs-7'>
                      {dateUnixReadable(item.updated_at)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className='card-footer'>
            <Accordion>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Add New Note</Accordion.Header>
                <Accordion.Body>
                  <textarea
                    name=''
                    id=''
                    cols='30'
                    rows='5'
                    className='form-control'
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                  <button className='btn btn-sm btn-primary mt-5' onClick={handlerAddNote}>
                    <span className={`indicator-label ${loading && 'd-none'}`}>ADD</span>
                    <span className={`indicator-progress ${loading && 'd-block'}`}>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
      <div className='col-lg-4'>
        {orderStatus !== 7 && orderStatus !== 1 && (
          <div className='card mb-5'>
            <div className='card-body p-3'>
              <div className='d-block'>
                <Link
                  to={`/orders/invoice`}
                  onClick={() => localStorage.setItem('iv_id', JSON.stringify([data?.invoice_id]))}
                  target='_blank'
                  className='btn btn-sm p-2 btn-dark me-2'
                >
                  Generate Invoice
                </Link>
                <Link
                  to={`/orders/shipping-label`}
                  onClick={() => localStorage.setItem('ids', JSON.stringify([data?.invoice_id]))}
                  target='_blank'
                  className='btn btn-sm p-2 btn-info'
                >
                  Generate Label
                </Link>
              </div>
            </div>
          </div>
        )}
        <FieldCustomer data={data} refatch={refetch} />

        <OrderProgress invoice_id={data.invoice_id} />
      </div>

      <Modal show={paymentModal} onHide={() => setPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Payment</Modal.Title>
        </Modal.Header>
        <PaymentModal
          data={data}
          order_id={data?.id}
          invoice_id={data?.invoice_id}
          currency={data?.currency}
          setPaymentModal={setPaymentModal}
          setPaidAmount={(p) => setPaidAmount(p)}
          refatch={refetch}
        />
      </Modal>
    </div>
  )
}

export default EditForm

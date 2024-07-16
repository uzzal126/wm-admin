import {ErrorMessage, Field} from 'formik'
import {Col, Form, Row} from 'react-bootstrap'
import swal from 'sweetalert'
import AddressFinder from '../../../../../../_metronic/partials/content/addressFinder'
import {CUSTOMER_LIST} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {getShippingPrice} from '../helper/dataHelper'
import CourierField from './CourierField'

const InvoiceCustomer = ({setFieldValue, values, errors}) => {
  const setAddress = async (data) => {
    // // console.log(data)
    let products = values.products.filter((f) => f.id !== 0)
    if (products && products.length > 0) {
      tableSync(products, data)
    }
    setFieldValue('customer.address', {
      ...values.customer.address,
      ...data,
    })
  }

  const tableSync = async (products, address) => {
    let tPrice = 0
    let totalPrice = 0
    let discount = 0
    let weight = 0
    let subTotal = 0
    let _shipping_fee = 0
    if (products && products.length > 0) {
      products.map((item) => {
        let pr = item.rate * item.qty
        tPrice = tPrice + item.price
        subTotal += item?.total_price - item?.discount
        totalPrice = totalPrice + pr
        discount = discount + item.discount
        weight = weight + item.weight * item.qty
      })
    }
    setFieldValue('subtotal', subTotal)

    if (address.city_id !== 0 && address.zone_id !== 0 && address.area_id !== 0) {
      let ship_post = {
        weight: weight,
        delivery_type: values.delivery_type,
        city_id: address.city_id,
        zone_id: address.zone_id,
        area_id: address.area_id,
      }
      let shipping_fee = await getShippingPrice(ship_post)
      let fee = values.delivery_type === 48 ? shipping_fee?.price : shipping_fee?.express_price
      _shipping_fee = Math.ceil(fee)

      // let oldPrice = totalPrice + fee
      // setFieldValue('shipping_fee', fee || 0)
      // setFieldValue('total', oldPrice - discount)
    } else {
      // setFieldValue('total', totalPrice + values.shipping_fee - discount)
      _shipping_fee = Math.ceil(values.shipping_fee)
    }
    setFieldValue('shipping_fee', _shipping_fee || 0)
    setFieldValue('total', (_shipping_fee || 0) + subTotal)
    setFieldValue('weight', weight)
    setFieldValue('price', subTotal + discount)
    // setFieldValue('subtotal', subTotal)
    setFieldValue('discount', discount)
  }

  const loadCustomer = async (query) => {
    let isValidMobile = query?.length > 9
    if (isValidMobile) {
      const res = await getQueryRequest(
        `${CUSTOMER_LIST}?page=1&items_per_page=10&search=${(query || '').trim()}`
      )
      if (res.success && res.status_code === 200) {
        if (res.data && res.data.length > 0) {
          const _msisdn = res?.data[0]?.msisdn
          if (!_msisdn) return
          const isFoundCustomer = (query || '').trim().slice(-10) === _msisdn?.slice(-10)

          if (!isFoundCustomer) return

          swal({
            title: 'Hey there',
            text: 'We have found an user, do you want to import?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then(async (confirm) => {
            if (confirm) {
              let e = res.data[0]
              let address = e.addresses[0]
              let obj = {
                id: e.id,
                country: e.country,
                name: address.name || e.name || '',
                email: address.email || e.email || '',
                msisdn: address.msisdn || e.msisdn || '',
                type: e.type,
                total_order_canceled: e?.total_order_canceled || 0,
                total_order_committed: e?.total_order_committed || 0,
                total_order_delivered: e?.total_order_delivered || 0,
                total_order_placed: e?.total_order_placed || 0,
                total_shopping_value: e?.total_shopping_value || 0,
                address: {
                  id: address.id || 0,
                  address_type: address.address_type || '',
                  name: address.name || '',
                  msisdn: address.msisdn || '',
                  region_id: address.region_id || 0,
                  city_id: address.city_id || 0,
                  zone_id: address.zone_id || '',
                  area_id: address.area_id || 0,
                  street_address: address.street_address || '',
                },
              }
              tableSync(values.products, address)

              setFieldValue('customer', obj)
            } else {
              let e = res.data[0]
              let obj = {
                ...values.customer,
                total_order_canceled: e?.total_order_canceled || 0,
                total_order_committed: e?.total_order_committed || 0,
                total_order_delivered: e?.total_order_delivered || 0,
                total_order_placed: e?.total_order_placed || 0,
                total_shopping_value: e?.total_shopping_value || 0,
              }
              setFieldValue('customer', obj)
            }
          })
        }
      }
    }
  }

  return (
    <div className='mb-4'>
      <div className='p-5'>
        <Row>
          <Col lg='6'>
            <div className='d-flex align-items-center'>
              <i className='fas fa-user fs-4 text-primary' />
              <h2 className='fs-3 ms-2 mb-0'>Customer Details:</h2>
            </div>
            <div className='pt-3'>
              {/* <FormTextField
                as={Col}
                controlId='validationFormik-customer-name'
                type='text'
                name='customer.name'
                onChange={(e) => {
                  setFieldValue('customer.name', e.target.value)
                  setFieldValue('customer.address.name', e.target.value)
                }}
                placeholder='Name'
              /> */}
              <Field name='customer.name'>
                {({field, form: {touched, errors}, meta}) => (
                  <Form.Group as={Col} controlId={'validationFormik-customer-name'}>
                    <Form.Control
                      {...field}
                      onChange={(e) => {
                        setFieldValue('customer.name', e.target.value)
                        setFieldValue('customer.address.name', e.target.value)
                      }}
                      type={'text'}
                      placeholder={'Name'}
                      isValid={touched[field.name] && !errors[field.name]}
                      isInvalid={errors[field.name]}
                      feedback={errors[field.name]}
                    />
                    <ErrorMessage
                      name={field.name}
                      render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                    />
                  </Form.Group>
                )}
              </Field>
              {values.customer?.total_order_placed && values.customer?.total_order_placed > 0 ? (
                <>
                  <div className='d-flex text-primary gap-2 ps-2 py-2 fs-8 align-items-center'>
                    <h6 className='fs-8 mb-0'>Customer Rating : </h6>
                    <strong>Ordered :</strong> {values.customer?.total_order_placed} |
                    <strong>Progress :</strong> {values.customer?.total_order_committed} |
                    <strong>Delivered :</strong> {values.customer?.total_order_delivered} |
                    <strong>Canceled :</strong> {values.customer?.total_order_canceled}
                  </div>
                </>
              ) : null}
              <Row className='py-2'>
                <Col lg='6'>
                  {/* <FormTextField
                    as={Col}
                    controlId='validationFormik-customer-mobile'
                    type='text'
                    name='customer.msisdn'
                    onChange={(e) => {
                      loadCustomer(e.target.value)
                      setFieldValue('customer.msisdn', e.target.value)
                      setFieldValue('customer.address.msisdn', e.target.value)
                    }}
                    // onBlur={(e) => loadCustomer(e.target.value)}
                    placeholder='Mobile number(e.g 017XXXXXXXX)'
                  /> */}
                  <Field name='customer.msisdn'>
                    {({field, form: {touched, errors}, meta}) => (
                      <Form.Group as={Col} controlId={'validationFormik-customer-mobile'}>
                        <Form.Control
                          {...field}
                          onChange={(e) => {
                            loadCustomer(e.target.value)
                            setFieldValue('customer.msisdn', e.target.value)
                            setFieldValue('customer.address.msisdn', e.target.value)
                          }}
                          type={'text'}
                          placeholder={'Mobile number(e.g 017XXXXXXXX)'}
                          isValid={touched[field.name] && !errors[field.name]}
                          isInvalid={errors[field.name]}
                          feedback={errors[field.name]}
                        />
                        <ErrorMessage
                          name={field.name}
                          render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                        />
                      </Form.Group>
                    )}
                  </Field>
                </Col>
                <Col lg='6'>
                  {/* <FormTextField
                    as={Col}
                    controlId='validationFormik-customer-email'
                    type='text'
                    name='customer.email'
                    onChange={(e) => {
                      setFieldValue('customer.email', e.target.value)
                      setFieldValue('customer.address.email', e.target.value)
                    }}
                    placeholder='Email'
                  /> */}
                  <Field name='customer.email'>
                    {({field, form: {touched, errors}, meta}) => (
                      <Form.Group as={Col} controlId={'validationFormik-customer-email'}>
                        <Form.Control
                          {...field}
                          onChange={(e) => {
                            setFieldValue('customer.email', e.target.value)
                            setFieldValue('customer.address.email', e.target.value)
                          }}
                          type={'text'}
                          placeholder={'Email'}
                          isValid={touched[field.name] && !errors[field.name]}
                          isInvalid={errors[field.name]}
                          feedback={errors[field.name]}
                        />
                        <ErrorMessage
                          name={field.name}
                          render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                        />
                      </Form.Group>
                    )}
                  </Field>
                </Col>
              </Row>
            </div>
            <Row className='pt-2'>
              <Col>
                <div data-kt-buttons='true' className='d-flex gap-5'>
                  <label className='flex-grow-1 btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-3 '>
                    <div className='d-flex align-items-center me-2'>
                      <div className='form-check form-check-custom form-check-solid form-check-primary me-3'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value='Home'
                          checked={values.customer.address.address_type === 'Home'}
                          onChange={(e) =>
                            setFieldValue('customer.address.address_type', e.target.value)
                          }
                        />
                      </div>

                      <div className='flex-grow-1'>
                        <h2 className='d-flex align-items-center fs-3 fw-bold flex-wrap mb-0'>
                          Home
                        </h2>
                      </div>
                    </div>
                  </label>

                  <label className='flex-grow-1 btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-3'>
                    <div className='d-flex align-items-center me-2'>
                      <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value='Office'
                          checked={values.customer.address.address_type === 'Office'}
                          onChange={(e) =>
                            setFieldValue('customer.address.address_type', e.target.value)
                          }
                        />
                      </div>

                      <div className='flex-grow-1'>
                        <h2 className='d-flex align-items-center fs-3 fw-bold flex-wrap mb-0'>
                          Office
                        </h2>
                      </div>
                    </div>
                  </label>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg='6'>
            <div className='d-flex align-items-center'>
              <i className='fas fa-truck-fast fs-4 text-primary' />
              <h2 className='fs-3 ms-2 mb-0'>Delivery Details:</h2>
            </div>
            {/* <div className='pt-3'>
              <AddressFinder
                label=''
                onChange={(e) => setAddress(e)}
                setData={values.customer.address}
              />
              <ErrorMessage
                name='customer.address.region_id'
                render={(msg) => <div className='text-danger'>{msg}</div>}
              />
              <ErrorMessage
                name='customer.address.city_id'
                render={(msg) => <div className='text-danger'>{msg}</div>}
              />
              <ErrorMessage
                name='customer.address.zone_id'
                render={(msg) => <div className='text-danger'>{msg}</div>}
              />
              <ErrorMessage
                name='customer.address.area_id'
                render={(msg) => <div className='text-danger'>{msg}</div>}
              />
            </div> */}
            <Field name='customer.address'>
              {({field, form: {touched, errors}, meta}) => (
                <div className='pt-3'>
                  <AddressFinder
                    label=''
                    onChange={(e) => {
                      setAddress(e)
                    }}
                    setData={field.value}
                  />
                  {errors?.customer?.address?.city_id ||
                  errors?.customer?.address?.zone_id ||
                  errors?.customer?.address?.region_id ? (
                    <div className='text-danger'>{'Please Select a City/Zone/Area'}</div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </Field>
            <div className='mt-3'>
              {/* <FormTextField
                as={Col}
                controlId='validationFormik-customer-street_address'
                type='text'
                name='customer.address.street_address'
                inputType='textarea'
                placeholder='Enter your full address'
              /> */}
              <Field name='customer.address.street_address'>
                {({field, form: {touched, errors}, meta}) => (
                  <Form.Group as={Col} controlId={'validationFormik-customer-street_address'}>
                    <Form.Control
                      {...field}
                      type={'text'}
                      placeholder={'Enter your full address'}
                      isValid={touched[field.name] && !errors[field.name]}
                      isInvalid={errors[field.name]}
                      feedback={errors[field.name]}
                      as={'textarea'}
                    />
                    <ErrorMessage
                      name={field.name}
                      render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                    />
                  </Form.Group>
                )}
              </Field>
            </div>

            <Row className='mt-3' lg={2}>
              <CourierField setFieldValue={setFieldValue} values={values} />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default InvoiceCustomer

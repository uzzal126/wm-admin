import {useRef, useState} from 'react'
import {Button, Card, Col, Modal, Row} from 'react-bootstrap'
import {components} from 'react-select'
import AsyncSelect from 'react-select/async'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
import {CUSTOMER_LIST} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {getShippingPrice} from '../helper/dataHelper'

const InvoiceHeder = ({values, setFieldValue}) => {
  const ref = useRef()
  const [show, setShow] = useState(false)
  const [address, setAddress] = useState(false)
  const [asyncSelected, setAsyncSelected] = useState(false)

  const loadCustomer = async (query) => {
    // // console.log(query)
    const res = await getQueryRequest(`${CUSTOMER_LIST}?page=1&items_per_page=10&search=${query}`)
    if (res.success && res.status_code === 200) {
      let list = []
      res.data &&
        res.data.length > 0 &&
        res.data.map((item) => {
          list.push({
            ...item,
            label: `${item.name ? item.name + ',' : ''} ${item.msisdn ? item.msisdn + ',' : ''} ${
              item.email || ''
            }`,
            value: item.id,
          })
        })
      return list
    }
    return []
  }
  const setCustomer = (e) => {
    // // console.log('sdfsdf')
    if (e.addresses.length > 1) {
      setShow(true)
      setAddress(e)
    } else {
      let address = e.addresses.length > 0 ? e.addresses[0] : []
      addAddress({
        ...e,
        addresses: address,
      })
    }
  }
  const addAddress = async (e) => {
    // // console.log(e)
    let address = e.addresses
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
    setAsyncSelected(true)
  }

  const clearAll = () => {
    let defaultCustomer = {
      id: 0,
      country: '',
      name: '',
      email: '',
      msisdn: '',
      type: 'regular',
      address: {
        id: 0,
        address_type: 'Home',
        name: '',
        msisdn: '',
        region_id: 0,
        city_id: 0,
        zone_id: 0,
        area_id: 0,
        street_address: '',
      },
    }
    setFieldValue('customer', defaultCustomer)
    setAsyncSelected(false)
    ref.current && ref.current.clearValue()
  }

  const tableSync = async (products, address) => {
    let tPrice = 0
    let totalPrice = 0
    let discount = 0
    let weight = 0
    let subTotal = 0
    let _shipping_fee = 0
    if (products && products.length > 0) {
      // eslint-disable-next-line array-callback-return
      products.map((item) => {
        let pr = item.rate * item.qty
        tPrice = tPrice + item.price
        totalPrice = totalPrice + pr
        subTotal += item?.total_price - item?.discount
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

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <i className='fas fa-search' />
      </components.DropdownIndicator>
    )
  }
  const formatOptionLabel = (data) => (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-30px me-2'>
        <img src='/media/products/dummy-product.jpg' alt='' />
      </div>
      <div>
        <p className='mb-0'>
          <strong>{data.name}</strong>
          {data.msisdn ? (
            <>
              <br />
              {data.msisdn}
            </>
          ) : (
            ''
          )}
          {data.email ? (
            <>
              <br />
              {data.email}
            </>
          ) : (
            ''
          )}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <KTCard className='mb-4'>
        <KTCardBody className='pt-4 pb-3'>
          <div className='d-flex align-items-center'>
            <div className='col-lg-2'>
              <label className='form-check-label ms-0 fw-bolder fs-6 text-gray-700'>
                Customer Name
              </label>
            </div>
            <div className='col-lg-4'>
              <div className='d-flex gap-3 align-items-center position-relative'>
                <AsyncSelect
                  for='basic-customer'
                  className='flex-grow-1'
                  ref={ref}
                  loadOptions={loadCustomer}
                  onChange={(e) => e && setCustomer(e)}
                  components={{DropdownIndicator}}
                  // isClearable={true}
                  formatOptionLabel={formatOptionLabel}
                  defaultOptions
                />
                {asyncSelected && (
                  <div className='position-absolute end-0 top-50 translate-middle-y me-10'>
                    <Button
                      variant='danger'
                      className='py-2 btn-icon'
                      onClick={() => clearAll()}
                      size='sm'
                    >
                      {/* Clear */}
                      <i className='fas fa-times' />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </KTCardBody>
      </KTCard>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='g-3'>
            {address &&
              address.addresses.length > 0 &&
              address.addresses.map((item, i) => (
                <Col lg='6' key={i}>
                  <Card
                    className='border'
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      addAddress({...address, addresses: item})
                      setShow(false)
                    }}
                  >
                    <Card.Body className='p-3'>
                      <div className='position-absolute end-0 top-0 px-3 text-white ribbon-label bg-primary'>
                        {item?.address_type}
                      </div>
                      <strong>{item.name}</strong>
                      <p className='my-2'>{item.msisdn}</p>
                      <p className='mb-0'>
                        {item.street_address}, {item.area_en}, {item.city_en}, {item.region_en}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default InvoiceHeder

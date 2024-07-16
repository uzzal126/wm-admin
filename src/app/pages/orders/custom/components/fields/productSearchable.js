import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {GET_PRODUCT_LIST, GET_PRODUCT_VARIANTS} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {getShippingPrice} from '../helper/dataHelper'
import ProductModal from './productModal'

const ProductSearchable = ({item, index, values, setFieldValue}) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [show, setShow] = useState(false)

  const loadProduct = async (query) => {
    const res = await getQueryRequest(
      `${GET_PRODUCT_LIST}?page=1&items_per_page=20&status=1&search=${query}`
    )
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
      setProducts(list)
      return list
    }
    return []
  }

  const formatOptionLabel = (data) => (
    <div className='d-flex align-items-center text-start'>
      <div className='symbol symbol-circle symbol-40px me-2'>
        <img src={data?.thumbnail?.src || '/media/products/dummy-product.jpg'} alt='' />
      </div>
      <div>
        <p className='mb-1'>{data.title || data.name}</p>
        <p className='mb-1'>
          {data?.variants && Object.keys(data?.variants).length > 0 ? (
            <div className='d-flex gap-2'>
              {data?.variants?.option !== 'Variant' &&
                data?.variants?.option !== null &&
                data?.variants?.option !== 'null' && (
                  <div className='fw-bold text-gray-400'>
                    <strong>{data?.variants?.option}</strong>: {data?.variants?.value}
                  </div>
                )}
              {data?.variants?.option2 !== null && data?.variants?.option2 !== 'null' && (
                <div className='fw-bold text-gray-400'>
                  <strong>{data?.variants?.option2}</strong>: {data?.variants?.value2}
                </div>
              )}
              {data?.variants?.option3 !== null && data?.variants?.option3 !== 'null' && (
                <div className='fw-bold text-gray-400'>
                  <strong>{data?.variants?.option3}</strong>: {data?.variants?.value3}
                </div>
              )}
            </div>
          ) : (
            <div className='d-flex gap-2'>
              <span>
                Price :{' '}
                {data.price?.min === data.price?.max
                  ? data.price?.min
                  : `${data.price?.min} - ${data.price?.max}`}
              </span>
              {data?.in_stock > 0 ? (
                <span className='badge badge-light-success'>In Stock : {data?.in_stock}</span>
              ) : (
                <span className='badge badge-light-danger'>Stock Out</span>
              )}
            </div>
          )}
        </p>
      </div>
    </div>
  )

  const handleClickProduct = async (product) => {
    const res = await getQueryRequest(`${GET_PRODUCT_VARIANTS}/${product.prod_id}`)

    if (res.success && res.status_code === 200) {
      if (res.data && res.data.length > 1) {
        setShow(true)
        setProduct({
          ...product,
          variants: res.data,
        })
      } else {
        const selectedAttr = res.data[0]
        handleOnChange(product, selectedAttr)
      }
    }
  }
  const handleOnChange = async (product, variant) => {
    let newProducts = [...products]
    if (newProducts.length > 0) {
      newProducts.map((item, i) => {
        if (item.prod_id === product.prod_id) {
          newProducts[i] = {
            ...product,
            variants: variant,
          }
        }
      })
    }
    setProducts(newProducts)
    let stock = variant.total_added - (variant.sold + variant.committed)
    let existingProduct = values.products.filter(
      (f, i) => f.id === product.id && f.attribute_id === variant.id && i !== index
    )

    if (stock > 0) {
      if (existingProduct && existingProduct.length > 0) {
        swal({
          title: 'This product is already in the product list.',
          text: 'If you want you can increase quantity',
          icon: 'warning',
          buttons: false,
        })
      } else {
        let qty = variant.qty || 1
        const price = variant?.price.selling_price * qty
        const dsc = Math.max(
          variant.price.campaign_discount_amount || 0,
          variant.price.general_discount_amount || 0
        )
        let pData = {
          id: product?.id,
          attribute_id: variant?.id,
          discount: dsc * qty,
          unit_discount: dsc,
          price: variant?.price.selling_price,
          qty: qty,
          tax: variant.tax || 0,
          total_price: price,
          stock: stock || 0,
          offer: variant.price.general_discount_amount || 0,
          rate: variant?.price.selling_price,
          weight: variant.shipping_attribute.weight * qty,
        }
        const products = [...values.products]

        products[index] = {...pData}
        setFieldValue('products', products)
        tableSync(products)
      }
    } else {
      toast.error('Sorry insufficient stock')
    }
  }

  const tableSync = async (products) => {
    let tPrice = 0
    let totalPrice = 0
    let subTotal = 0
    let discount = 0
    let weight = 0
    let _shipping_fee = 0
    if (products && products.length > 0) {
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

    if (
      values.customer.address.city_id !== 0 &&
      values.customer.address.zone_id !== 0 &&
      values.customer.address.area_id !== 0
    ) {
      let ship_post = {
        weight: weight,
        delivery_type: values.delivery_type,
        city_id: values.customer.address.city_id,
        zone_id: values.customer.address.zone_id,
        area_id: values.customer.address.area_id,
      }
      let shipping_fee = await getShippingPrice(ship_post)
      let fee = values.delivery_type === 48 ? shipping_fee?.price : shipping_fee?.express_price
      _shipping_fee = Math.ceil(fee)

      // let oldPrice = totalPrice + fee
      // setFieldValue('shipping_fee', fee || 0)
      // setFieldValue('total', oldPrice - discount)
    } else {
      _shipping_fee = Math.ceil(values.shipping_fee)
      // setFieldValue('total', totalPrice + values.shipping_fee - discount)
    }
    setFieldValue('shipping_fee', _shipping_fee || 0)
    setFieldValue('total', (_shipping_fee || 0) + subTotal)
    setFieldValue('weight', weight)
    setFieldValue('price', subTotal + discount)
    // setFieldValue('subtotal', subTotal)
    setFieldValue('discount', discount)
  }

  return (
    <div>
      <div className='d-flex'>
        <AsyncSelect
          for='basic-customer'
          cacheOptions
          className='flex-grow-1'
          loadOptions={loadProduct}
          onChange={(e) => handleClickProduct(e)}
          value={products.filter((f) => f.id === item?.id)}
          defaultOptions
          formatOptionLabel={formatOptionLabel}
          placeholder='Type or Click Select Item'
        />
      </div>
      <Modal show={show} dialogClassName='mw-800px' onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product?.name || 'Modal heading'}
            <span className='text-muted fw-bold text-muted d-block fs-7'>
              SKU:
              {product?.sku}
            </span>
          </Modal.Title>
        </Modal.Header>
        <ProductModal product={product} onChange={handleOnChange} setShow={setShow} />
      </Modal>
    </div>
  )
}

export default ProductSearchable

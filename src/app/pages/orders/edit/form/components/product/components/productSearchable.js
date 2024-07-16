import {useEffect, useState} from 'react'
import AsyncSelect from 'react-select/async'
import {toast} from 'react-toastify'
import {GET_PRODUCT_LIST, GET_PRODUCT_VARIANTS} from '../../../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../../../library/api.helper'
import {getShippingPrice} from '../../../../../custom/components/helper/dataHelper'
import ProductModal from './productModal'

const ProductSearchable = ({data, values, setFieldValue}) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])

  useEffect(() => {
    setFieldValue('oid', data?.id)
    setFieldValue('shipping_fee', data.shipping_fee)
  }, [data])

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
        setProduct({
          ...product,
          variants: res.data,
        })
      } else {
        setProduct({
          ...product,
          variants: res.data,
        })
        const selectedAttr = res.data[0]
        handleOnChange(product, selectedAttr)
      }
    }
  }
  const handleOnChange = async (product, variant) => {
    // // console.log('variant', variant)
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
    let existingProduct = data.products.filter(
      (f, i) => f.product_id === product.id && f.attribute_id === variant.id
    )

    if (stock > 0) {
      let qty = variant.qty || 1
      if (existingProduct && existingProduct.length > 0) {
        qty = qty + existingProduct[0].qty
      }
      const price = variant?.price.selling_price * qty
      const dsc =
        variant.price.campaign_discount_amount + variant.price.general_discount_amount || 0
      let pData = {
        id: product?.id,
        attribute_id: variant?.id,
        discount: dsc,
        price: variant?.price.selling_price,
        qty: qty,
        tax: variant.tax || 0,
        total_price: price,
        stock: stock || 0,
        offer: variant.price.general_discount_amount || 0,
        rate: variant?.price.selling_price,
        weight: variant.shipping_attribute.weight * qty,
      }

      setFieldValue('product', pData)
      tableSync(pData)
      // }
    } else {
      toast.error('Sorry insufficient stock')
    }
  }

  const tableSync = async (product) => {
    let weight = product.weight + data.weight
    weight = Math.round(weight * 100) / 100
    let fee = data.shipping_fee
    if (
      data.customer.address.city_id !== 0 &&
      data.customer.address.zone_id !== 0 &&
      data.customer.address.area_id !== 0
    ) {
      let ship_post = {
        weight: weight,
        delivery_type: data.delivery_type,
        city_id: data.customer.address.city_id,
        zone_id: data.customer.address.zone_id,
        area_id: data.customer.address.area_id,
      }
      let shipping_fee = await getShippingPrice(ship_post)
      fee = data.delivery_type === 48 ? shipping_fee?.price : shipping_fee?.express_price

      setFieldValue('shipping_fee', Math.ceil(fee) || 0)
      setFieldValue('oid', data?.id)
      setFieldValue('weight', weight)
      setFieldValue('extra_discount', data?.extra_discount)
      setFieldValue('promo_discount', data?.promo_discount)
    }
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
          // value={products.filter((f) => f.id === item?.id)}
          defaultOptions
          formatOptionLabel={formatOptionLabel}
          placeholder='Type or Click Select Item'
        />
      </div>
      <ProductModal product={product} onChange={handleOnChange} />
    </div>
  )
}

export default ProductSearchable

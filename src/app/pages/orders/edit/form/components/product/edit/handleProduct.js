import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {GET_PRODUCT_VARIANTS} from '../../../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../../../library/api.helper'
import {getShippingPrice} from '../../../../../custom/components/helper/dataHelper'
import ProductModal from './productModal'

const HandleProduct = ({
  data,
  values,
  setFieldValue,
  pro,
  refetch = () => null,
  setIsDeletedVariant = () => false,
}) => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    getVariant(pro.prod_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pro])

  useEffect(() => {
    setFieldValue('oid', data?.id)
    setFieldValue('shipping_fee', data.shipping_fee)
  }, [data])

  const getVariant = async (id) => {
    const res = await getQueryRequest(`${GET_PRODUCT_VARIANTS}/${id}`)
    let selectedProduct = {}
    if (res.success && res.status_code === 200) {
      selectedProduct = res.data.filter((f) => f.id === pro.attribute_id)
      if (selectedProduct?.length === 0) {
        setIsDeletedVariant(true)
      }
      setProduct({
        ...pro,
        isDeletedVariant: selectedProduct?.length === 0 ? true : false,
        variants: selectedProduct?.length > 0 ? selectedProduct : res?.data,
      })
    }
  }

  const handleOnChange = async (product, variant) => {
    let stock = variant.total_added - (variant.sold + variant.committed)

    if (stock > 0) {
      let qty = variant.qty || 1

      const price = variant?.price.selling_price * qty
      const dsc = Math.max(
        variant.price.campaign_discount_amount || 0,
        variant.price.general_discount_amount || 0
      )
      let pData = {
        id: pro?.product_id,
        attribute_id: variant?.id,
        discount: dsc * qty,
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
    // calculating weight
    let weight = 0
    const _products = Array.isArray(data?.products) ? data?.products : []
    for (let i = 0; i < _products.length; i++) {
      const _product = _products[i]
      if (product?.attribute_id === _product?.attribute_id) {
        weight += _product?.shipping_attribute?.weight * product?.qty
      } else {
        weight += _product?.shipping_attribute?.weight * _product?.qty
      }
    }
    // let weight = product.qty + data.weight
    //
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
    }

    setFieldValue('weight', weight)
    setFieldValue('extra_discount', data?.extra_discount)
    setFieldValue('promo_discount', data?.promo_discount)
  }

  return (
    <ProductModal
      product={product}
      variant={product}
      onChange={handleOnChange}
      orderData={data}
      refetch={refetch}
    />
  )
}

export default HandleProduct

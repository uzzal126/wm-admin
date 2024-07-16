import {Field} from 'formik'
import {Col} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import FormTextField from '../../../../../modules/components/formik/fields/form-field'
import {getShippingPrice} from '../helper/dataHelper'
import ProductSearchable from './productSearchable'

function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}

const dummyProduct = {
  id: 0,
  attribute_id: 0,
  discount: 0,
  price: 0,
  qty: 1,
  tax: 0,
  total_price: 0,
  weight: 0,
  stock: 0,
  offer: 0,
  rate: 0,
}

const ProductTable = ({setFieldValue, values}) => {
  const handleQty = async (index, value) => {
    if (value > 0) {
      let products = [...values.products]

      if (products[index]) {
        if (products[index].stock < value) {
          toast.error('Insufficient Stock')
        } else {
          // const pDiscount = products[index]?.offer * parseInt(value) + products[index].discount
          const pDiscount = products[index]?.unit_discount * Number(value)
          const pPrice = products[index]?.rate * parseInt(value)

          products[index] = {
            ...products[index],
            // price: pPrice,
            discount: pDiscount,
            total_price: pPrice,
            qty: Number(value),
          }
          setFieldValue('products', products)
          tableSync(products)
        }
      }
    }
  }
  const handleDiscount = (index, value) => {
    let products = [...values.products]

    if (products[index]) {
      if (parseFloat(value) > products[index].rate) {
        // toast.error("You can1't add discount more then rate")
      } else {
        products[index] = {
          ...products[index],
          discount: Number(value || 0),
          total_price: products[index].rate * products[index].qty,
        }
        setFieldValue('products', products)
        tableSync(products)
      }
    }
  }
  const handleRemoveProduct = (index) => {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to remove this product!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const products = values.products.filter((f, i) => i !== index)
        setFieldValue('products', products)
        tableSync(products)
      }
    })
  }

  const tableSync = async (products) => {
    let tPrice = 0
    let subTotal = 0
    let totalPrice = 0
    let discount = 0
    let weight = 0
    let _shipping_fee = 0
    if (products && products.length > 0) {
      products.map((item) => {
        let dt = item.discount || 0
        let pr = item.rate * item.qty
        subTotal += item?.total_price - item?.discount
        tPrice = tPrice + item.price
        totalPrice = totalPrice + pr
        discount = discount + dt
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
      // let dd = discount + values.paid_amount
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
  // // console.log(values)
  return (
    <div>
      <Field name='products'>
        {({field, form: {touched, errors}, meta}) => (
          <div className='table-responsive overflow-visible'>
            <table className='table table-rounded table-row-bordered border border-gray g-3'>
              <thead>
                <tr className='fw-semibold fs-6 text-gray-800 border-bottom-2 border-gray-300 text-center'>
                  <th>Item Details</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Discount</th>
                  {/* <th>Tax</th> */}
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {values.products &&
                  values.products.length > 0 &&
                  values.products.map((product, i) => (
                    <>
                      <tr className='border-gray-300 align-items-center text-center' key={i}>
                        <td>
                          <div className='min-w-250px d-flex align-items-center mw-550px'>
                            <button className='btn btn-icon btn-sm' type='button'>
                              <i className='fas fa-ellipsis-vertical'></i>
                              <i className='fas fa-ellipsis-vertical'></i>
                              <i className='fas fa-ellipsis-vertical'></i>
                            </button>
                            <div className='flex-grow-1'>
                              <ProductSearchable
                                values={values}
                                item={product}
                                setFieldValue={setFieldValue}
                                index={i}
                              />
                            </div>
                          </div>
                        </td>
                        <td className='w-100px'>
                          <FormTextField
                            as={Col}
                            controlId={`validationFormik-${i}-qty`}
                            type='number'
                            name={`products.${i}.qty`}
                            size='sm'
                            onChange={(e) => handleQty(i, e.target.value)}
                          />
                        </td>
                        <td className='w-100px text-center'>
                          <span className='fs-5'>{product.rate}</span>
                        </td>
                        <td className='w-100px'>
                          <FormTextField
                            as={Col}
                            controlId={`validationFormik-${i}-discount`}
                            type='number'
                            name={`products.${i}.discount`}
                            size='sm'
                            min='0'
                            onChange={(e) => handleDiscount(i, e.target.value)}
                          />
                        </td>
                        <td className='w-175px text-center'>
                          <div className='d-flex align-items-center'>
                            <span className='fs-5 flex-grow-1'>
                              {product.total_price - (product.discount || 0)}
                            </span>
                            <button
                              type='button'
                              className='btn btn-light-danger btn-icon btn-sm w-30px h-30px'
                              disabled={values.products.length <= 1}
                              onClick={() => values.products.length > 1 && handleRemoveProduct(i)}
                            >
                              <i className='fas fa-times' />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {(product?.price || 0) === 0 ? (
                        <div className='text-danger align-items-center'>
                          {'Please Add a Product'}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Field>
    </div>
  )
}

export default ProductTable

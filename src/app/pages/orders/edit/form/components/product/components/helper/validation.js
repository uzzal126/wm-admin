import * as yup from 'yup'

export const schema = yup.object({
  oid: yup.number().required('Order ID required').positive().integer(),
  shipping_fee: yup.number().required('Shipping Fee required').min(0).integer(),
  product: yup
    .object()
    .shape({
      id: yup.number().required('Product Id Required').positive().integer(),
      attribute_id: yup.number().required('Variant Id Required').positive().integer(),
      discount: yup.string(),
      price: yup.number().required('Price required'),
      qty: yup.number().required('Price Quantity required').positive().integer(),
      tax: yup.number(),
      total_price: yup.number().required('Total Price required'),
      weight: yup.number(),
    })
    .required('Must have Product'),
})

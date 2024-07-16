import * as yup from 'yup'

const shippingAttribute = yup.object().shape({
  weight_class_id: yup.string().required(),
  weight: yup.string().required(),
  length_class_id: yup.string().required(),
  length: yup.string().required(),
  width: yup.string().required(),
  height: yup.string().required(),
})
const priceSchema = yup.object().shape({
  cost_price: yup.number().min(0).max(100000000).required('Cost Price Required'),
  selling_price: yup.number().min(1).max(100000000).required('Selling Price Required'),
  has_discount: yup.boolean().required(),
  discount_type: yup.string(),
  discount_amount: yup.number(),
  discount_percentage: yup.number(),
  discount_start_date: yup.string(),
  discount_end_date: yup.string(),
})

export const schema = yup.object({
  pd_id: yup.number().required().positive().integer(),
  product_type: yup.string().required(),
  keep_previous: yup.bool(),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        is_sync: yup.bool(),
        shipping_attribute: shippingAttribute,
        option: yup.string().required('Required'),
        option2: yup.string().nullable(true),
        option3: yup.string().nullable(true),
        value: yup.string().required('Required'),
        value2: yup.string().nullable(true),
        value3: yup.string().nullable(true),
        // qty: yup.number().integer().required('Required'),
        thumbnail: yup
          .object()
          .shape({
            src: yup.string(),
            alt: yup.string().nullable(),
          })
          .required('Thumbnail Required'),
        price: priceSchema,
      })
    )
    .min(1, 'Minimum of 1 variant')
    .required('Must have variant'),
})

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
  cost_price: yup
    .number()
    .required('Cost Price Required')
    .test('costPriceCheck', 'Cost price must be greater than 0', function (cost_price) {
      // Check if cost_price is greater than 0
      return cost_price > 0
    }),
  selling_price: yup
    .number()
    .required('Selling price required')
    .test(
      'sellingPriceCheck',
      'Selling price should be greater than to cost price',
      function (selling_price) {
        const cost_price = this.parent.cost_price
        return selling_price > cost_price

        // Check if selling_price is less than cost_price
        /* if (this.parent.has_discount) {
          // Adjust the comparison based on the discount type
          const discountedPrice =
            this.parent.discount_type === 'percentage'
              ? cost_price - cost_price * (this.parent.discount_percentage / 100)
              : cost_price - this.parent.discount_amount

          return selling_price > discountedPrice
        } else {
          return selling_price > cost_price
        } */
      }
    ),
  has_discount: yup.boolean().required(),
  discount_type: yup.string(),
  discount_amount: yup.number(),
  discount_percentage: yup.number(),
  discount_start_date: yup.string(),
  discount_end_date: yup.string(),
})

export const schema = yup.object({
  product_name: yup.string().required('Product name required'),
  product_slug: yup.string().required('Product slug required'),
  product_s_description: yup.string().required('Sort description required'),
  product_status_id: yup.number().required().integer(),
  tax_id: yup.number(),
  product_type: yup.string().required(),
  thumbnail: yup.object().shape({
    alt: yup.string().required('Alt text is required'),
    src: yup.string().required('Thumbnail is required'),
  }),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        shipping_attribute: shippingAttribute,
        option: yup.string().required('Required'),
        option2: yup.string().nullable(true),
        option3: yup.string().nullable(true),
        value: yup.string().required('Required'),
        value2: yup.string().nullable(true),
        value3: yup.string().nullable(true),
        qty: yup.string().required('Required'),
        thumbnail: yup
          .object()
          .shape({
            src: yup.string(),
            alt: yup.string().nullable(),
          })
          .required('Thumbnail required'),
        price: priceSchema,
      })
    )
    .min(1, 'Minimum of 1 variant')
    .required('Must have variant'),
  cat_ids: yup.array(),
  tag_ids: yup.array(),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        src: yup.string(),
        alt: yup.string().nullable(),
      })
    )
    .min(1, 'Minimum of 1 gallery')
    .required('Must have gallery'),
})

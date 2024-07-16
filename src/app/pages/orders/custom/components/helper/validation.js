import * as yup from 'yup'

export const schema = yup.object({
  // invoice: yup.string().required('Order invoice id Required'),
  price: yup.string().required('Order Price Required'),
  discount: yup.string(),
  extra_discount: yup.string(),
  subtotal: yup.string().required('Order subtotal Required'),
  shipping_fee: yup.string().required('Order Shipping fee Required'),
  total: yup.string().required('Order Total Price Required'),
  paid_amount: yup.string(),
  tax: yup.number(),
  order_status: yup.number().required().positive().integer(),
  shipping_status: yup.number().required().positive().integer(),
  payment_status: yup.number().required(),
  shipping_method: yup.number().required().positive().integer(),
  payment_method: yup.number().required().positive().integer(),
  payment_channel: yup.number().required().positive().integer(),
  order_note: yup
    .string()
    .test('utf8Length', 'Order note must not exceed 500 UTF-8 characters', function (value) {
      if (!value) {
        // Allow empty values
        return true
      }

      const encoder = new TextEncoder()
      const utf8Bytes = encoder.encode(value)

      return utf8Bytes.length <= 500
    }),
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().positive().integer().required('Product id required'),
        attribute_id: yup.number().positive().integer().required('Product attribute required'),
        discount: yup.string(),
        price: yup.string().required('Product price required'),
        total_price: yup.string().required('Product total price required'),
        qty: yup.number().required('Product quantity required'),
      })
    )
    .min(1, 'Minimum of 1 product')
    .required('Must have product'),
  customer: yup
    .object()
    .shape({
      id: yup.number(),
      country: yup.string(),
      name: yup
        .string()
        .test('utf8Length', 'Customer name must not exceed 120 UTF-8 characters', function (value) {
          if (!value) {
            // Allow empty values
            return true
          }

          const encoder = new TextEncoder()
          const utf8Bytes = encoder.encode(value)

          return utf8Bytes.length <= 120
        })
        .required('Customer name is required'),
      email: yup.string().email('Invalid email').max(50),
      msisdn: yup
        .string()
        .transform((originalValue, originalObject) => {
          // Extract the last 11 digits from the phone number
          const last11Digits = originalValue.slice(-11)
          return last11Digits
        })
        .matches('(?:\\+88|88)?(01[3-9]\\d{8})', 'Invalid phone number')
        .required('Customer phone number required'),
      type: yup.string().required('Customer account type required'),
      address: yup.object().shape({
        id: yup.number(),
        address_type: yup.string().required('Customer address type required'),
        name: yup.string().required('Customer name required'),
        msisdn: yup
          .string()
          .min(10, 'Minimum 11 symbols')
          .max(14, 'Maximum 14 symbols')
          .required('Customer phone number required'),
        region_id: yup
          .number()
          .positive('Region Must Select')
          .integer('Region Must Select')
          .required('Region Required'),
        city_id: yup
          .number()
          .positive('city Must Select')
          .integer('city Must Select')
          .required('city Required'),
        zone_id: yup
          .number()
          .positive('Zone Must Select')
          .integer('Zone Must Select')
          .required('Zone Required'),
        area_id: yup
          .number()
          .positive('area Must Select')
          .integer('area Must Select')
          .required('area Required'),
        street_address: yup
          .string()
          .test(
            'utf8Length',
            'Customer Address must not exceed 500 UTF-8 characters',
            function (value) {
              if (!value) {
                // Allow empty values
                return true
              }

              const encoder = new TextEncoder()
              const utf8Bytes = encoder.encode(value)

              return utf8Bytes.length <= 500
            }
          )
          .required('Customer address is required'),
        fragile: yup.boolean(),
        liquid: yup.boolean(),
      }),
    })
    .required('Must have address'),
})

export const initialFormData = {
  pd_id: 0,
  product_type: 'Physical',
  keep_previous: true,
  variants: [
    {
      is_sync: false,
      need_save: false,
      shipping_attribute: {
        weight_class_id: 1,
        weight: 1,
        length_class_id: 1,
        length: 1,
        width: 1,
        height: 1,
      },
      option: null,
      option2: null,
      option3: null,
      value: null,
      value2: null,
      value3: null,
      // qty: 0,
      add_price: 0.0,
      thumbnail: {
        alt: '',
        src: '',
      },
      gift_coupons: [
        {
          code: '',
          expire_date: '',
        },
      ],
      download_url: '',
      price: {
        cost_price: 0,
        selling_price: 0,
        has_discount: false,
        discount_type: 'no',
        discount_amount: 0,
        discount_percentage: 0,
        discount_start_date: '',
        discount_end_date: '',
      },
    },
  ],
}

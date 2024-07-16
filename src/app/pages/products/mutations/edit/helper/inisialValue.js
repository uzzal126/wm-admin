import moment from 'moment'

export const initialFormData = {
  product_name: '',
  product_slug: '',
  product_s_description: '',
  additional_info: [],
  bundle_unit: 1,
  product_type: 'Physical',
  sku: '',
  seo: {
    meta_tag_title: '',
    meta_tag_description: '',
    meta_tag_keywords: '',
  },
  product_status_id: 1,
  cat_ids: [],
  brand_id: 0,
  gallery: [
    {
      alt: '',
      src: '',
    },
    {
      alt: '',
      src: '',
    },
    {
      alt: '',
      src: '',
    },
    {
      alt: '',
      src: '',
    },
    {
      alt: '',
      src: '',
    },
  ],
  thumbnail: {
    alt: '',
    src: '',
  },
  video: {
    alt: '',
    src: '',
  },
  variants: [
    {
      shipping_attribute: {
        weight_class_id: 1,
        weight: 1,
        length_class_id: 1,
        length: 1,
        width: 1,
        height: 1,
      },
      option: 'Variant',
      option2: null,
      option3: null,
      value: 'Default',
      value2: null,
      value3: null,
      qty: 1,
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
  tag_ids: [],
  scheduled_at: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  overview: {
    has: false,
    data: [],
    url: '',
    target: '',
  },
  tax_id: 1,
  price_visibility: 1,
  cart_visibility: 1,
}

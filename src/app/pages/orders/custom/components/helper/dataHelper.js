import {COURIER_PRICE_LIST} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'

export const getShippingPrice = async (data) => {
  let post = {
    COD: data.cod || 1,
    item_type: data.item_type || '2',
    delivery_type: data.delivery_type || 48,
    item_weight: data.weight || 0.5,
    recipient_city: data.city_id || null,
    recipient_zone: data.zone_id || null,
    recipient_area: data.area_id || null,
  }
  if (post.courier_store) {
    post = {
      ...post,
      courier_store_id: post.courier_store,
    }
  }
  const res = await queryRequest(COURIER_PRICE_LIST, post)
  if (res.success && res.status_code === 200) {
    return res.data
  } else {
    return {}
  }
}

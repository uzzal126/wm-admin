import {getBrandList} from '../../../../../app/library/api.helper'

export const getBrandData = async () => {
  const resp = await getBrandList()
  if (resp.success && resp.status_code === 200) {
    let list = []
    resp.data &&
      resp.data.length > 0 &&
      resp.data.map((item) => {
        const cmp = {
          ...item,
          label: item.name,
          value: item.id,
        }
        list.push(cmp)
      })
    return list
  } else {
    return []
  }
}

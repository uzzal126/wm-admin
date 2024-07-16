import {getCategoryTree} from '../../../../../app/library/api.helper'
import {generateCatLabel} from './generateCategory'

export const getCatData = async () => {
  const resp = await getCategoryTree()
  if (resp.success && resp.status_code === 200) {
    // // console.log(resp)
    let list = generateCatLabel(resp.tree)
    return list
  }
}

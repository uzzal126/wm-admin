import {useEffect, useState} from 'react'
import {GET_BLOG_CATEGORY_LIST} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'

const StatusSelect = ({callBack, catId}) => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    const res = await getQueryRequest(GET_BLOG_CATEGORY_LIST)

    if (res.success && res.status_code === 200) {
      setCategory(res.data)
    }
  }

  return (
    <select
      data-hide-search='true'
      className={`form-select fw-bolder`}
      onChange={(event) => {
        const selectedCategory = category.find((e) => e.name === event.target.value)
        callBack(selectedCategory)
      }}
    >
      <option value={catId}>Select Category</option>
      {category?.map((item, indx) => (
        <option value={item.name} key={indx}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export default StatusSelect

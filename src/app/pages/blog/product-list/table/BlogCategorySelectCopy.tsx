import {useEffect, useState} from 'react'
import Select from 'react-select'
import {GET_BLOG_CATEGORY_LIST} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'

const BlogCategorySelect = ({onChange, values}: {onChange: (e: any) => void; values: string}) => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    const res = await getQueryRequest(GET_BLOG_CATEGORY_LIST)

    if (res.success && res.status_code === 200) {
      const lists: any = []
      if (res.data && res.data.length) {
        res.data.map((item: any) => {
          lists.push({
            ...item,
            label: item.name,
            value: item.id,
          })
        })
      }
      setCategory(lists)
    }
  }

  const ids = values && values.split(',').map(Number)

  return (
    <div>
      <Select
        value={category.filter((item: any) => ids && ids.includes(item.id)) || []}
        options={category}
        className='multi-select mb-2'
        isMulti
        menuPlacement='top'
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default BlogCategorySelect

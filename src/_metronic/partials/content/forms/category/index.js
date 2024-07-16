import {useEffect, useState} from 'react'
import {getCatData} from './categoryQuery'

const CategorySelect = ({callBack}) => {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const list = await getCatData()
    setCategoryList(list)
  }

  // // console.log("categoryList", categoryList)
  return (
    <select
      name='colors'
      data-kt-select2='true'
      data-placeholder='Select option'
      data-allow-clear='true'
      data-kt-user-table-filter='status'
      data-hide-search='true'
      options={categoryList}
      className='form-select fw-bolder'
      onChange={(event) => callBack(categoryList.filter((e) => e.id === event.target.value)[0])}
    >
      <option value=''>Select Category</option>
      {categoryList?.map((item, indx) => (
        <option value={item.id} key={indx}>
          {item.label}
        </option>
      ))}
    </select>
  )
}

export default CategorySelect

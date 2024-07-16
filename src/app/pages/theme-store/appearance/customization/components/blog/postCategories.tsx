import {useEffect, useState} from 'react'
import {Form, Offcanvas} from 'react-bootstrap'
import BlogCatsModal from '../../../../../../../_metronic/layout/components/common/modals/BlogCatsModal'
import {GET_BLOG_CATEGORY_LIST} from '../../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../../library/api.helper'
import SelectCategory from './selectCategory'

const BlogCategoriesSetting = ({data, handlerOnChange}: {data: any; handlerOnChange: any}) => {
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
  return (
    <Offcanvas.Body>
      <>
        <div className='form-group'>
          <label className=''>Section Title</label>
          <input
            type='text'
            className='form-control'
            value={data?.title || ''}
            placeholder='Name'
            onChange={(e) =>
              handlerOnChange(
                {
                  ...data,
                  title: e.target.value,
                },
                true
              )
            }
          />
          <div className='mt-4 d-flex justify-content-between'>
            <Form.Label htmlFor='count-switch'>Post Count</Form.Label>
            <Form.Check
              reverse
              type='switch'
              id='count-switch'
              label=''
              onChange={(e) =>
                handlerOnChange({
                  ...data,
                  config: {
                    ...data?.config,
                    count: !data?.config?.count,
                  },
                })
              }
              checked={data?.config?.count}
            />
          </div>
          <div className='mt-3'>
            <Form.Label>Choose Categories (Optional)</Form.Label>
            <SelectCategory
              onChange={(e) =>
                handlerOnChange({
                  ...data,
                  config: {
                    ...data?.config,
                    cat_id: e.map((f: any) => f.id).toString(),
                  },
                })
              }
              values={data?.config?.cat_id}
              category={category}
              getCategory={getCategory}
              setCategory={setCategory}
            />
            <BlogCatsModal refetch={getCategory} />
          </div>
        </div>
      </>
    </Offcanvas.Body>
  )
}

export default BlogCategoriesSetting

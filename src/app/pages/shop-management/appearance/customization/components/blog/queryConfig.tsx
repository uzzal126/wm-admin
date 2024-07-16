import {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import BlogCatsModal from '../../../../../../../_metronic/layout/components/common/modals/BlogCatsModal'
import {GET_BLOG_CATEGORY_LIST} from '../../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../../library/api.helper'
import SelectCategory from './selectCategory'

const QueryConfig = ({data, handlerOnChange}: {data: any; handlerOnChange: any}) => {
  const [postType, setPostType] = useState(
    !data?.config ? true : data?.config?.cat_id === '' ? true : false
  )
  const [category, setCategory] = useState()
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
    <div className='card'>
      <div className='card-body'>
        <label className='font-weight-bold'>Post Configuration</label>
        <div className='d-flex gap-2'>
          <button
            onClick={() => {
              setPostType(true)
              handlerOnChange({
                ...data,
                config: {
                  ...data?.config,
                  cat_id: '',
                },
              })
            }}
            className={`flex-grow-1 btn btn-sm ${postType ? 'btn-primary' : 'border'}`}
          >
            Recent Post
          </button>
          <button
            onClick={() => setPostType(false)}
            className={`flex-grow-1 btn btn-sm ${!postType ? 'btn-primary' : 'border'}`}
          >
            Specific Categories
          </button>
        </div>
        {!postType && (
          <div className='mt-3'>
            <Form.Label>Choose Categories</Form.Label>
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
              setCategory={setCategory}
              getCategory={getCategory}
            />
            <BlogCatsModal refetch={getCategory} />
          </div>
        )}
        <div className='mt-3'>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='6'>
              Sort By
            </Form.Label>
            <Col sm='6'>
              <Form.Select
                aria-label='Sort'
                onChange={(e) =>
                  handlerOnChange({
                    ...data,
                    config: {
                      ...data?.config,
                      sort: e.target.value,
                    },
                  })
                }
              >
                <option value='id'>ID</option>
                <option value='title'>Title</option>
                <option value='slug'>Slug</option>
                <option value='category_id'>Category ID</option>
                <option value='created_at'>Created at</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='6'>
              Order By
            </Form.Label>
            <Col sm='6'>
              <Form.Select
                aria-label='order'
                onChange={(e) =>
                  handlerOnChange({
                    ...data,
                    config: {
                      ...data?.config,
                      order: e.target.value,
                    },
                  })
                }
              >
                <option value='desc'>DESC</option>
                <option value='asc'>ASC</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='6'>
              Number of Post
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                type='number'
                value={data?.config?.items_per_page || ''}
                step={5}
                onChange={(e) =>
                  handlerOnChange({
                    ...data,
                    config: {
                      ...data?.config,
                      items_per_page: parseInt(e.target.value),
                    },
                  })
                }
              />
            </Col>
          </Form.Group>
        </div>
      </div>
    </div>
  )
}

export default QueryConfig

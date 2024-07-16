import {ErrorMessage} from 'formik'
import {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import swal from 'sweetalert'
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  usePostCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../../../../_metronic/redux/slices/blog'
import {ToolTipLabel} from '../../../../modules/helper/misc'

type Props = {
  values: any
  setFieldValue: any
}

const CategoryPopup = ({setFieldValue, values}: Props) => {
  const [showCatModal, setShowCatModal] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [name, setNewCategory] = useState<any>('')

  const {data: categories} = usePostCategoriesQuery(`page=1&items_per_page=100`)
  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deteleCategory] = useDeleteCategoryMutation()

  const handleClose = () => setShowCatModal(false)
  const handleShow = () => setShowCatModal(true)

  const [catEdit, setCatEdit] = useState<any>({})

  const updateCat = async () => {
    const post = {
      id: catEdit.id,
      name: catEdit.name,
    }
    const res = await updateCategory(post).unwrap()
    if (res.success && res.status_code === 200) {
      setCatEdit([])
      toast.success('Update successfully!')
    } else {
      toast.error(res.message)
    }
  }
  const deleteTag = async (id: any) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this tag!',
      icon: 'warning',
      buttons: ['OK', 'Cancel'],
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const res = await deteleCategory(id).unwrap()
        if (res.success && res.status_code === 200) {
          toast.success('Delete successfully!')
        } else {
          toast.error(res.message)
        }
      }
    })
  }
  const saveNewCategory = async () => {
    const post = {name, slug: slugify(name)}
    const res = await addCategory(post).unwrap()
    if (res?.success) {
      handleClose()
    } else {
      toast.error(res?.message)
    }
  }
  useEffect(() => {
    if (categories?.data && categories?.data?.length > 0) {
      let newList: any = []
      categories?.data.map((item: any) => {
        newList.push({
          ...item,
          label: item.name,
          value: item?.id,
        })
      })

      setCategoryList(newList)
    }
  }, [categories])

  return (
    <>
      <ToolTipLabel label='Categories' tooltip='Add post to a category.' className='required' />
      <ErrorMessage
        name={'cat_ids'}
        render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
      />
      <Select
        value={
          values.cat_ids.length > 0 &&
          categoryList &&
          values.cat_ids.map((t: any) => categoryList.filter((e: any) => e.id === t)[0])
        }
        isMulti
        name='colors'
        options={categoryList}
        className='multi-select mb-2'
        classNamePrefix='select'
        onChange={(e) =>
          setFieldValue(
            'cat_ids',
            e.map((f: any) => f.id)
          )
        }
      />
      <button type='button' onClick={handleShow} className='btn btn-light-primary btn-sm mb-5'>
        <i className='fas fa-plus'></i> Create new category
      </button>
      <Modal show={showCatModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <h2>Blog Categories</h2>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col'>
              <label className='fs-6 form-label fw-bolder text-dark'>Category Name</label>
              <input
                type='text'
                className='form-control form-control'
                name=''
                placeholder='Enter Category name'
                value={name}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <div className='col-auto align-self-end text-end'>
              <Button variant='dark' onClick={() => saveNewCategory()}>
                Add
              </Button>
            </div>
          </div>
          <div className='table-responsive mt-4'>
            <table className='table table-row-bordered table-striped table-rounded border border-gray-300 px-2 g-2'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th className='text-end'>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryList &&
                  categoryList.length > 0 &&
                  categoryList.map((tag: any, i) => (
                    <tr key={i}>
                      <td>{tag.id}</td>
                      <td>
                        {catEdit && catEdit.id === tag.id ? (
                          <div className='col'>
                            <input
                              type='text'
                              className='form-control form-control'
                              name=''
                              placeholder='Enter tag name'
                              value={catEdit.name}
                              onChange={(e) =>
                                setCatEdit({
                                  ...catEdit,
                                  name: e.target.value,
                                  slug: slugify(e.target.value),
                                })
                              }
                            />
                          </div>
                        ) : (
                          tag.name
                        )}
                      </td>
                      <td className='text-end'>
                        {catEdit && catEdit.id === tag.id ? (
                          <>
                            <button
                              className='btn btn-sm btn-icon btn-light-success w-30px h-30px'
                              onClick={() => updateCat()}
                            >
                              <i className='fas fa-check fs-3'></i>
                            </button>
                            <button
                              className='btn btn-sm btn-icon btn-light-danger ms-2 w-30px h-30px'
                              onClick={() => setCatEdit([])}
                            >
                              <i className='fas fa-times fs-3'></i>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
                              onClick={() => setCatEdit(tag)}
                            >
                              <i className='fas fa-pencil-alt fs-3'></i>
                            </button>
                            <button
                              className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                              onClick={() => deleteTag(tag.id)}
                            >
                              <i className='la la-trash-o fs-3'></i>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CategoryPopup

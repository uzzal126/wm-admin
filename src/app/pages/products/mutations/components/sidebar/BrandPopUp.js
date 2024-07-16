import axios from 'axios'
import {useState} from 'react'
import {Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import swal from 'sweetalert'
import {Can} from '../../../../../../_metronic/redux/ability'
import {
  POST_ADD_BRAND,
  POST_DELETE_BRAND,
  POST_UPDATE_BRAND,
} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'

const BrandPopUp = ({brandList, setBrands, formData, setFormData, setShowBrandModal}) => {
  const [tag, setTag] = useState({
    name: '',
    slug: '',
  })
  const [tagEdit, setTagEdit] = useState([])

  const saveBrand = async () => {
    const res = await queryRequest(POST_ADD_BRAND, tag)
    if (res.success && res.status_code === 200) {
      let list = []
      if (res.data && res.data.length > 0) {
        res.data.map((item) => {
          const lt = {
            ...item,
            label: item.name,
            value: item.id,
          }
          list.push(lt)
        })

        setBrands(list)
        setTag({name: '', slug: ''})
        // setFormData({...formData, brand_id: res.data.brand_id})
        setShowBrandModal(false)
      } else {
        toast.error('Something wrong')
      }
    } else {
      toast.error(res.message)
    }
  }
  const updateBrand = async () => {
    const res = await queryRequest(
      `${POST_UPDATE_BRAND}/${tagEdit?.id}`,
      {
        brand_id: tagEdit.id,
        name: tagEdit.name,
        slug: tagEdit.slug,
      },
      'put'
    )
    if (res.success && res.status_code === 200) {
      setBrands(res.data)
      setTagEdit([])
      toast.success('Update successfully!')
    } else {
      toast.error(res.message)
    }
  }
  const deleteTag = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this tag!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        try {
          const {data: res} = await axios.delete(`${POST_DELETE_BRAND}/${id}`)
          if (res.success && res.status_code === 200) {
            setBrands(res.data)
            toast.success('Delete successfully!')
          } else {
            toast.error(res.message)
          }
        } catch (err) {
          toast.error(err?.message || 'Sorry! An error occured.')
        }
      }
    })
  }

  return (
    <>
      <Can access='Add Brand' group='products'>
        <div className='row'>
          <div className='col'>
            <label className='fs-6 form-label fw-bolder text-dark'>Tag Name</label>
            <input
              type='text'
              className='form-control form-control'
              name=''
              placeholder='Enter tag name'
              value={tag.name}
              onChange={(e) => setTag({name: e.target.value, slug: slugify(e.target.value)})}
            />
          </div>
          <div className='col-auto align-self-end text-end'>
            <Button variant='dark' onClick={() => saveBrand()}>
              Add
            </Button>
          </div>
        </div>
      </Can>
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
            {brandList &&
              brandList.length > 0 &&
              brandList.map((tag, i) => (
                <tr key={i}>
                  <td>{tag.id}</td>
                  <td>
                    {tagEdit && tagEdit.id === tag.id ? (
                      <div className='col'>
                        <input
                          type='text'
                          className='form-control form-control'
                          name=''
                          placeholder='Enter tag name'
                          value={tagEdit.name}
                          onChange={(e) =>
                            setTagEdit({
                              ...tagEdit,
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
                    {tagEdit && tagEdit.id === tag.id ? (
                      <>
                        <button
                          className='btn btn-sm btn-icon btn-light-success w-30px h-30px'
                          onClick={() => updateBrand()}
                        >
                          <i className='fas fa-check fs-3'></i>
                        </button>
                        <button
                          className='btn btn-sm btn-icon btn-light-danger ms-2 w-30px h-30px'
                          onClick={() => setTagEdit([])}
                        >
                          <i className='fas fa-times fs-3'></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <Can access='Edit Brand' group='products'>
                          <button
                            className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
                            onClick={() => setTagEdit(tag)}
                          >
                            <i className='fas fa-pencil-alt fs-3'></i>
                          </button>
                        </Can>
                        <Can access='Delete Brand' group='products'>
                          <button
                            className='btn btn-sm btn-icon btn-light-danger w-30px h-30px'
                            onClick={() => deleteTag(tag.id)}
                          >
                            <i className='la la-trash-o fs-3'></i>
                          </button>
                        </Can>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BrandPopUp

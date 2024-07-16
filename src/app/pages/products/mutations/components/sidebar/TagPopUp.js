import axios from 'axios'
import {useState} from 'react'
import {Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {Can} from '../../../../../../_metronic/redux/ability'
import {
  POST_ADD_TAG,
  POST_DELETE_TAG,
  POST_UPDATE_TAG,
} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'

const TagPopUp = ({
  tagList,
  setTagList,
  values,
  setFieldValue,
  formData,
  setFormData,
  setShowTagModal,
}) => {
  const [tag, setTag] = useState({
    title: '',
  })
  const [tagEdit, setTagEdit] = useState([])

  const saveTag = async () => {
    const res = await queryRequest(POST_ADD_TAG, tag)
    if (res.success && res.status_code === 200) {
      let list = []
      if (res.data && res.data.length > 0) {
        res.data.map((item) => {
          const lt = {
            ...item,
            label: item.title,
            value: item.id,
          }
          list.push(lt)
        })

        setTagList(list)
        setTag({title: ''})
        // setFormData({...formData, tag: [...formData?.tag, res?.tag_id]})
        setShowTagModal(false)
      } else {
        toast.error('Something wrong')
      }
    } else {
      toast.error(res.message)
    }
  }
  const updateTag = async () => {
    const res = await queryRequest(
      `${POST_UPDATE_TAG}/${tagEdit?.id}`,
      {
        tag_id: tagEdit.id,
        title: tagEdit.title,
      },
      'put'
    )
    if (res.success && res.status_code === 200) {
      setTagList(res.data)
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
          const {data: res} = await axios.delete(`${POST_DELETE_TAG}/${id}`)
          if (res.success && res.status_code === 200) {
            setTagList(res.data)
            toast.success('Delete successfully!')
          } else {
            toast.error(res.message)
          }
        } catch (err) {
          toast.error('Sorry! Something went wrong.')
        }
      }
    })
  }

  return (
    <>
      <Can access='Add Tag' group='products'>
        <div className='row'>
          <div className='col'>
            <label className='fs-6 form-label fw-bolder text-dark'>Tag Name</label>
            <input
              type='text'
              className='form-control form-control'
              name=''
              placeholder='Enter tag name'
              value={tag.title}
              onChange={(e) => setTag({title: e.target.value.toUpperCase()})}
            />
          </div>
          <div className='col-auto align-self-end text-end'>
            <Button variant='dark' onClick={() => saveTag()}>
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
            {tagList &&
              tagList.length > 0 &&
              tagList.map((tag, i) => (
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
                          value={tagEdit.title}
                          onChange={(e) =>
                            setTagEdit({...tagEdit, title: e.target.value.toUpperCase()})
                          }
                        />
                      </div>
                    ) : (
                      tag.title
                    )}
                  </td>
                  <td className='text-end'>
                    {tagEdit && tagEdit.id === tag.id ? (
                      <>
                        <button
                          className='btn btn-sm btn-icon btn-light-success w-30px h-30px'
                          onClick={() => updateTag()}
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
                        <Can access='Edit Tag' group='products'>
                          <button
                            className='btn btn-sm btn-icon btn-light-primary w-30px h-30px'
                            onClick={() => setTagEdit(tag)}
                          >
                            <i className='fas fa-pencil-alt fs-3'></i>
                          </button>
                        </Can>
                        <Can access='Delete Tag' group='products'>
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

export default TagPopUp

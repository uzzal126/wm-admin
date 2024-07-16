import 'cropperjs/dist/cropper.css'
import moment from 'moment'
import {useState} from 'react'
import Flatpickr from 'react-flatpickr'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import {POST_CAMPAIGN_UPDATE} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import CropperComponents from '../../../modules/components/cropper/CropperComponents'

const EditNewCapaign = ({edit, setEdit, cmp, setData}) => {
  const [post, setPost] = useState(edit)
  const [start_at, setstart_at] = useState(
    edit.start_at || moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  )
  const [end_at, setend_at] = useState(
    edit.end_at || moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  )

  // // console.log(edit)

  const handleSubmitForm = async (post) => {
    const postDate = {
      ...post,
      camp_id: post.id,
      start_at: moment.unix(start_at).format('YYYY-MM-DD hh:mm:ss'),
      end_at: moment.unix(end_at).format('YYYY-MM-DD hh:mm:ss'),
    }
    // // console.log(moment(start_at).isSameOrBefore(end_at, 'hour'))

    if (post.name === '' || post.slug === '') {
      toast.error('Campaign Title Required! Please Enter your title', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (!moment(start_at).isSameOrBefore(end_at, 'hour')) {
      toast.error('End Date greater than Start Date', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const res = await queryRequest(`${POST_CAMPAIGN_UPDATE}/${post?.id}`, postDate, 'put')
      if (res.success && res.status_code === 200) {
        setData(res.data)
        setEdit([])
        toast('Campaign Added Successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        toast.error(res.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  }

  return (
    <div className='col position-relative'>
      <div className={`card`}>
        <div className='card-header'>
          <h2 className='card-title'>Edit Campaign</h2>
        </div>
        <div className='card-body'>
          <h2>{cmp && cmp.length > 0 && cmp[0].title}</h2>
          <div className='row g-4'>
            <div className='col'>
              <label className='fs-6 form-label fw-bolder text-dark'>Title</label>
              <input
                type='text'
                className='form-control input-max form-control'
                placeholder='Enter campaign name'
                value={post.name}
                onChange={(e) =>
                  setPost({
                    ...post,
                    name: e.target.value,
                    slug: slugify(e.target.value),
                  })
                }
              />
            </div>
            <div className='col-5'>
              <div className='row row-cols-1 row-cols-lg-2'>
                <div className='col'>
                  <label className='fs-6 form-label fw-bolder text-dark'>Start Date</label>
                  <Flatpickr
                    placeholder='Start date'
                    className='form-control'
                    data-enable-time
                    value={start_at}
                    onChange={([date]) => setstart_at(moment(date).format('YYYY-MM-DD hh:mm:ss'))}
                  />
                </div>
                <div className='col'>
                  <label className='fs-6 form-label fw-bolder text-dark'>End Date</label>
                  <Flatpickr
                    placeholder='End date'
                    className='form-control'
                    data-enable-time
                    value={end_at}
                    onChange={([date]) => setend_at(moment(date).format('YYYY-MM-DD hh:mm:ss'))}
                  />
                </div>
              </div>
            </div>
            <div className='col'>
              <label className='fs-6 form-label fw-bolder text-dark'>
                Desktop Banner (1920x300)
              </label>
              <CropperComponents
                onCroped={(e) =>
                  setPost({
                    ...post,
                    desktop_image: e[0],
                  })
                }
                width={1920}
                height={300}
                full={true}
                src={post.desktop_image || ''}
                className='w-100 h-50px'
              />
            </div>
            <div className='col'>
              <label className='fs-6 form-label fw-bolder text-dark'>
                Mobile Banner (1080x450)
              </label>
              <CropperComponents
                onCroped={(e) =>
                  setPost({
                    ...post,
                    mobile_image: e[0],
                  })
                }
                width={1080}
                height={450}
                full={true}
                src={post.mobile_image || ''}
                className='w-100 h-50px'
              />
            </div>
          </div>
          <div className='d-flex'>
            <div className='me-2 '>
              <select
                className='form-select'
                value={post.active_status}
                onChange={(e) => setPost({...post, active_status: e.target.value})}
              >
                <option>Select Status</option>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
                <option value='Draft'>Draft</option>
                <option value='Ended'>Ended</option>
                <option value='Pending'>Pending</option>
                <option value='Rejected'>Rejected</option>
              </select>
            </div>
            <div className=' align-self-center'>
              <button className='btn btn-dark' onClick={() => handleSubmitForm(post)}>
                Update
              </button>
              <button className='btn btn-light ms-3' onClick={() => setEdit([])}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditNewCapaign

import 'cropperjs/dist/cropper.css'
import moment from 'moment'
import {useState} from 'react'
import Flatpickr from 'react-flatpickr'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import {POST_ADD_CAMPAIGN} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import CropperComponents from '../../../modules/components/cropper/CropperComponents'

const AddNewCapaign = ({cmp, setData}) => {
  const postInisitla = {
    group_id: cmp?.id || 0,
    name: '',
    slug: '',
    desktop_image: '',
    mobile_image: '',
  }
  const [active, setActive] = useState(false)

  const [post, setPost] = useState(postInisitla)
  const [date, setDate] = useState({
    start_at: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    end_at: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  })

  const updateFromState = (key, val) => {
    setDate({
      group_id: cmp.id,
      ...date,
      [key]: val,
    })
  }

  const handleSubmitForm = async (post) => {
    const postDate = {
      ...post,
      ...date,
    }
    // // console.log(postDate)
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
    } else if (post.desktop_image === '' || post.mobile_image === '') {
      toast.error('Campaign Desktop & Mobile banner Required!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const res = await queryRequest(POST_ADD_CAMPAIGN, postDate)
      if (res.success && res.status_code === 200) {
        // // console.log(res.data)
        setActive(!active)
        setData(res.data)
        setPost(postInisitla)
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
      <button
        className='position-absolute z-index-1 top-0 end-0 btn btn-circle btn-icon btn-primary pulse pulse-white'
        onClick={() => setActive(!active)}
      >
        <i className={`fas fa-${!active ? 'plus' : 'minus'}`}></i>
        <span className='pulse-ring'></span>
      </button>
      <div className={`card ${!active && 'd-none'}`}>
        <div className='card-header'>
          <h2 className='card-title'>Add New Campaign</h2>
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
            <div className='col'>
              <div className='row row-cols-1 row-cols-lg-2'>
                <div className='col'>
                  <label className='fs-6 form-label fw-bolder text-dark'>Start Date</label>
                  <Flatpickr
                    placeholder='Start date'
                    className='form-control'
                    data-enable-time
                    value={date.start_at}
                    onChange={([date]) =>
                      updateFromState('start_at', moment(date).format('YYYY-MM-DD hh:mm:ss'))
                    }
                  />
                </div>
                <div className='col'>
                  <label className='fs-6 form-label fw-bolder text-dark'>End Date</label>
                  <Flatpickr
                    placeholder='End date'
                    className='form-control'
                    data-enable-time
                    value={date.end_at}
                    onChange={([date]) =>
                      updateFromState('end_at', moment(date).format('YYYY-MM-DD hh:mm:ss'))
                    }
                  />
                </div>
              </div>
            </div>
            <div className='col'>
              <label className='fs-6 form-label fw-bolder text-dark'>
                Desktop Banner(1920x300)
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
              <label className='fs-6 form-label fw-bolder text-dark'>Mobile Banner(1080x450)</label>
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
            <div className='col-auto align-self-center'>
              <button className='btn btn-dark' onClick={() => handleSubmitForm(post)}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddNewCapaign

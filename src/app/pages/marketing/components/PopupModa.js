import {useState} from 'react'
import TextEditor from '../../../../_metronic/partials/content/forms/editor/textEditor'
import CropperComponents from '../../../modules/components/cropper/CropperComponents'

const defaultText = `<h4 class="text-uppercase font-weight-normal fs-25">Get Up to<span class="text-primary">25% Off</span></h4>
<h2 class="ls-25">Sign up to Webmanza</h2>
<p class="text-light ls-10">Subscribe to the Webmanza market newsletter to 
    receive updates on special offers.</p>`

const PopupModa = ({post, setPost, data}) => {
  const [popupPost, setPopup] = useState(
    data?.code
      ? JSON.parse(decodeURIComponent(`${data?.code}`))
      : {
          background: '',
          contents: '',
          btn: {
            text: '',
            link: '',
          },
          showForm: false,
        }
  )

  const onChangeValue = (key, value) => {
    const d = {
      ...popupPost,
      [key]: value,
    }
    setPopup(d)
    setPost({...post, code: JSON.stringify(d)})
  }

  return (
    <div>
      <CropperComponents
        onCroped={(e) => onChangeValue('background', e[0])}
        width={780}
        height={400}
        full={true}
        src={popupPost.background || 'https://dummyimage.com/780x400/37a1c7/fff'}
        className='w-100 h-250px'
      />
      <div className='mb-5'>
        <label className='fs-6 form-label fw-bolder text-dark'>Short Description</label>
        <TextEditor
          defaultValue={popupPost.contents}
          setTextEditor={(value) => onChangeValue('contents', value)}
        />
      </div>

      <div className='form-check form-check-custom form-check-solid'>
        <input
          className='form-check-input'
          type='checkbox'
          value=''
          checked={popupPost.showForm}
          onChange={() => onChangeValue('showForm', !popupPost.showForm)}
          id='flexCheckDefault'
        />
        <label className='form-check-label' htmlFor='flexCheckDefault'>
          Show Form
        </label>
      </div>
    </div>
  )
}

export default PopupModa

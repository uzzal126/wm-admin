import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useCookies} from 'react-cookie'
import {uploadImageBase64} from '../../../../library/api.helper'
import ImageCropping from '../../../../modules/helper/imageCropping'

const defaultSrc = '/media/products/dummy-product.jpg'

const CropperComponent = ({
  imageUrl,
  onCroped,
  width,
  height,
  className,
  full,
  src = defaultSrc,
}) => {
  const [cookies, setCookie] = useCookies()
  const [cropperModal, setCropperModal] = useState(false)
  const [image, setImage] = useState(src ? src : defaultSrc)
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState()
  const [cropRatio, setCropRatio] = useState()

  // useEffect(() => {
  //     if (cropper)
  //         cropper.destroy();
  // }, [])

  const onChange = (e) => {
    e.preventDefault()
    setCropRatio(width / height)

    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    // // console.log(files)
    const reader = new FileReader()
    reader.onload = (event) => {
      getImageSize(event.target.result, function (imageWidth, imageHeight, mg) {
        if (imageWidth == width && imageHeight == height) {
          uploadFileHandler(event.target.result)
        } else {
          setImage(reader.result)
          setCropperModal(true)
        }
      })
    }
    reader.readAsDataURL(files[0])
  }

  const getImageSize = (imageURL, callback) => {
    var image = new Image()
    image.onload = function () {
      if (!callback) {
        // console.log("Error getting image size: no callback. Image URL: " + imageURL);
      } else {
        callback(this.naturalWidth, this.naturalHeight, this)
      }
    }
    image.src = imageURL
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas({width: width, height: height}).toDataURL())
      // setFormData({...formData, cat_image: cropper.getCroppedCanvas({ width: width, height: height }).toDataURL()});
      handleClose()
      let croped = cropper.getCroppedCanvas({width: width, height: height}).toDataURL()
      uploadFileHandler(croped)
    }
  }

  const uploadFileHandler = async (image) => {
    const res = await uploadImageBase64(cookies.access_token, 1, image)
    if (res.success || res.status_code == 200) {
      onCroped(res.uploaded_files[0])
    }
    // // console.log(res)
    setCropData(image)
    // onCroped(image);
    // const res = await FileUpload(image);
    if (res.status_code === 200) {
      setCropData(res.uploaded_files[0])
      onCroped(res.uploaded_files[0])
    }

    handleClose()
  }

  const handleClose = () => setCropperModal(false)
  return (
    <div>
      <div
        className={`image-input image-input-empty image-input-outline mb-3 bgi-position-center ${
          full && 'w-100'
        }`}
        style={{backgroundImage: `url(${src.length > 5 ? src : defaultSrc})`}}
      >
        <div
          className={`image-input-wrapper img-thumb-preview ${
            className ? className : 'w-150px h-150px'
          } bgi-position-center`}
          style={{backgroundImage: `url(${imageUrl.length > 5 ? imageUrl : defaultSrc})`}}
        ></div>
        <label
          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='change'
          data-bs-toggle='tooltip'
          title='Change avatar'
          htmlFor='uploader'
        >
          <i className='bi bi-pencil-fill fs-7'></i>
          <input
            type='file'
            id='uploader'
            className='js-photo-upload'
            onChange={onChange}
            name='upload'
            accept='.png, .jpg, .jpeg'
            img-bg-preview='.img-thumb-preview'
          />
          <input type='hidden' name='avatar_remove' />
        </label>
        <span
          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='cancel'
          data-bs-toggle='tooltip'
          title='Cancel avatar'
        >
          <i className='bi bi-x fs-2'></i>
        </span>
        <span
          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='remove'
          data-bs-toggle='tooltip'
          title='Remove avatar'
        >
          <i className='bi bi-x fs-2'></i>
        </span>
      </div>
      <Modal show={cropperModal} onHide={handleClose}>
        <Modal.Body className='p-0'>
          <ImageCropping
            image={image}
            cropRatio={cropRatio}
            cropWidth={width}
            cropHeight={height}
            setCropper={setCropper}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={getCropData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CropperComponent

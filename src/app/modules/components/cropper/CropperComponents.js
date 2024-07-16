import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import {FileUpload} from '../../../library/api.helper'
import ImageCropping from './imageCropping'
import { isUndefinedNullOrWhiteSpaceString } from '../../../../common'
import { useEffectEnhanced } from '../../../hooks'

// const defaultSrc = '/media/products/dummy-product.jpg'
const defaultSrc = '/media/products/blank-image.png'

const CropperComponents = ({
  onCroped,
  width,
  height,
  full,
  className,
  src,
  isRemove = false,
  showPencil = true,
  isMultiple = false,
}) => {
  const [cropperModal, setCropperModal] = useState(false)
  const [_src, setSrc] = useState(isUndefinedNullOrWhiteSpaceString(src) ? defaultSrc : src)
  const [image, setImage] = useState(_src)
  const [cropData, setCropData] = useState(_src)
  const [cropper, setCropper] = useState()
  const [cropRatio, setCropRatio] = useState()

  const [name, setName] = useState()

  const onChange = (e) => {
    e.preventDefault()
    if (cropper) cropper.destroy()

    setCropRatio(width / height)

    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      const fName = slugify(`${Date.now()}-${files[0].name}`)
      setName(fName)
      getImageSize(event.target.result, function (imageWidth, imageHeight, mg) {
        if (imageWidth == width && imageHeight == height) {
          uploadFileHandler(event.target.result, fName)
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
        // console.log('Error getting image size: no callback. Image URL: ' + imageURL)
      } else {
        callback(this.naturalWidth, this.naturalHeight, this)
      }
    }
    image.src = imageURL
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      let type = 'image/jpeg'
      if (cropper.url !== '') {
        let matches = cropper.url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length >= 3) type = matches[1]
      }
      let croped = cropper
        .getCroppedCanvas({
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
          width: width,
          fillColor: type === 'image/png' ? 'transparent' : '#ffffff',
          height: height,
        })
        .toDataURL(type === 'image/png' ? type : 'image/jpeg', 1)
      uploadFileHandler(croped, name)
    }
  }

  const uploadFileHandler = async (image, n) => {
    const res = await FileUpload(image, n)
    if (res.status_code === 200) {
      setCropData(image)
      setCropData(res.uploaded_files)
      onCroped([...res.uploaded_files, n])
    } else {
      toast.error(res.message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    handleClose()
  }

  const handleClose = () => setCropperModal(false)

  useEffectEnhanced(() => {
    const _src = isUndefinedNullOrWhiteSpaceString(src) ? defaultSrc : src;

    setSrc(_src);
  }, [src]);

  // // console.log("s", src,isRemove)
  return (
    <>
      <div
        className={`image-input mb-3 ${
          isRemove === true ? (_src === defaultSrc ? 'image-input-empty' : '') : 'image-input-empty'
        } bgi-position-center image-input-outline ${full && 'w-100'}`}
      >
        <label className={`cursor-pointer w-100`}>
          <div
            className={`image-input-wrapper img-thumb-preview ${
              className ? className : 'w-150px h-150px'
            } bgi-position-center`}
            style={{backgroundImage: `url(${_src || cropData || defaultSrc})`}}
          ></div>
          {showPencil && (
            <div
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='fas fa-pencil-alt'></i>

              <input
                type='file'
                multiple={isMultiple}
                className='js-photo-upload'
                onChange={onChange}
                onClick={event => event.target.value = null}
                name='upload'
                accept='.png, .jpg, .jpeg'
                img-bg-preview='.img-thumb-preview'
              />
              <input type='hidden' name='avatar_remove' />
            </div>
          )}
        </label>
        <span
          onClick={() => onCroped(['', ''])}
          className='btn btn-icon btn-circle btn-color-danger btn-light-danger w-25px h-25px bg-body shadow start-50 position-absolute'
          data-kt-image-input-action='remove'
        >
          <i className='bi bi-x fs-2'></i>
        </span>
      </div>
      <Modal show={cropperModal} onHide={handleClose} backdrop='static' centered keyboard={false}>
        <Modal.Body className='p-0' style={{height: 400, width: '100%'}}>
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
    </>
  )
}

export default CropperComponents

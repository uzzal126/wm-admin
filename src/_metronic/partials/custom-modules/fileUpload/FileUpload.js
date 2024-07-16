import {useState} from 'react'
import slugify from 'react-url-slugify'
import {uploadFile} from '../../../../app/library/api.helper'
import './file-upload.css'

const FileUpload = ({label, initValues, onChange}) => {
  const [selectedfile, SetSelectedFile] = useState(initValues)
  const [Files, SetFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const InputChange = (e) => {
    // --For Multiple File Input
    let images = []
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i])
      let reader = new FileReader()
      let file = e.target.files[i]
      reader.onloadend = async (event) => {
        const fName = slugify(`${Date.now()}-${e.target.files[i].name}`)
        setLoading(true)
        const res = await uploadFileHandler(event.target.result, fName)
        setLoading(false)
        if (res?.status_code === 200) {
          SetSelectedFile((preValue) => {
            return [
              ...preValue,
              {
                id: fName,
                filename: fName,
                filetype: e.target.files[i].type,
                fileimage: reader.result,
                datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                filesize: filesizes(e.target.files[i].size),
                url: res?.uploaded_files[0],
              },
            ]
          })
          // set values for Formik attachments
          onChange([
            ...selectedfile,
            {
              id: fName,
              filename: fName,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
              filesize: filesizes(e.target.files[i].size),
              url: res?.uploaded_files[0],
            },
          ])
        }
      }
      if (e.target.files[i]) {
        reader.readAsDataURL(file)
      }
    }
  }

  const DeleteSelectFile = (id) => {
    if (window.confirm('Are you sure you want to delete this Image?')) {
      const result = selectedfile.filter((data) => data.id !== id)
      SetSelectedFile(result)
      onChange([...result])
    } else {
      // alert('No');
    }
  }

  const FileUploadSubmit = async (e) => {
    e.preventDefault()

    // form reset on submit
    e.target.reset()
    if (selectedfile.length > 0) {
      for (let index = 0; index < selectedfile.length; index++) {
        SetFiles((preValue) => {
          return [...preValue, selectedfile[index]]
        })
      }
      SetSelectedFile([])
    } else {
      alert('Please select file')
    }
  }

  const DeleteFile = async (id) => {
    if (window.confirm('Are you sure you want to delete this Image?')) {
      const result = Files.filter((data) => data.id !== id)
      SetFiles(result)
    } else {
      // alert('No');
    }
  }

  const uploadFileHandler = async (file, name) => {
    const res = await uploadFile(file, name)
    return res
  }

  return (
    <div className='kb-data-box'>
      <div className='kb-modal-data-title'>
        <div className='kb-data-title'>
          <h6>{label}</h6>
        </div>
      </div>
      <form onSubmit={FileUploadSubmit}>
        <div className='kb-file-upload'>
          <div className='file-upload-box'>
            <input
              type='file'
              id='fileupload'
              className='file-upload-input'
              onChange={InputChange}
              multiple
            />
            {loading ? (
              <span>uploading...</span>
            ) : (
              <span>
                Drag and drop or <span className='file-link'>Choose your files</span>
              </span>
            )}
          </div>
        </div>
        <div className='kb-attach-box mb-3'>
          {selectedfile.map((data, index) => {
            const {id, filename, filetype, fileimage, datetime, filesize, url} = data
            return (
              <div className='file-atc-box' key={id}>
                {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                  <div className='file-image'>
                    {' '}
                    <img src={fileimage || url} alt='' />
                  </div>
                ) : (
                  <div className='file-image'>
                    <i className='far fa-file-alt'></i>
                  </div>
                )}
                <div className='file-detail'>
                  <h6>{filename}</h6>
                  <p></p>
                  <p>
                    <span>Size : {filesize}</span>
                    <span className='ml-2'>Modified Time : {datetime}</span>
                  </p>
                  <div className='file-actions'>
                    <button
                      type='button'
                      className='file-action-btn'
                      onClick={() => DeleteSelectFile(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* <div className='kb-buttons-box'>
                    <button type='submit' className='btn btn-primary form-submit'>
                      Upload
                    </button>
                  </div> */}
      </form>
      {Files.length > 0 ? (
        <div className='kb-attach-box'>
          <hr />
          {Files.map((data, index) => {
            const {id, filename, filetype, fileimage, datetime, filesize} = data
            return (
              <div className='file-atc-box' key={index}>
                {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                  <div className='file-image'>
                    {' '}
                    <img src={fileimage} alt='' />
                  </div>
                ) : (
                  <div className='file-image'>
                    <i className='far fa-file-alt'></i>
                  </div>
                )}
                <div className='file-detail'>
                  <h6>{filename}</h6>
                  <p>
                    <span>Size : {filesize}</span>
                    <span className='ml-3'>Modified Time : {datetime}</span>
                  </p>
                  <div className='file-actions'>
                    <button className='file-action-btn' onClick={() => DeleteFile(id)}>
                      Delete
                    </button>
                    <a href={fileimage} className='file-action-btn' download={filename}>
                      Download
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default FileUpload

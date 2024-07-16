import {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {Can} from '../../../../_metronic/redux/ability'
import {POST_DATA_UPDATE_TOOLS, POST_UNINSTALL_TOOLS} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import PopupModa from '../components/PopupModa'

const PopupHandler = ({item, refatch}) => {
  const [show, setShow] = useState(false)
  const [btn, setBtn] = useState([])
  const [post, setPost] = useState({
    tool_id: item?.id,
    code: {},
  })

  useEffect(() => {
    let code = ''
    try {
      code = decodeURIComponent(item?.code)
      code = item?.route !== 'popup' ? JSON.parse(code) : code
    } catch (e) {
      code = ''
    }
    setPost({
      ...post,
      code: code,
    })
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = (e) => {
    e.preventDefault()
    setBtn(item)
    setShow(true)
  }

  const htmlTagsCheck = (str) => {
    const regex =
      /<\/?(div|p|img|a|h[1-6]|ul|ol|li|table|tr|td|th|thead|tbody|tfoot|span|br|input|button|textarea|form|iframe|noscript)[\s\S]*?>/i
    return regex.test(str)
  }

  const uninstallTools = async () => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to Uninstall '${btn.title}' tools`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        setBtn({
          ...item,
          installation_status: btn?.installation_status === 1 ? 0 : 1,
        })

        const res = await queryRequest(POST_UNINSTALL_TOOLS, {
          tool_id: btn.id,
        })

        if (res.success && res.status_code === 200) {
          refatch(res.data)
          toast.success(res.message)
          handleClose()
        } else {
          toast.error(res.message)
        }
      }
    })
  }
  const saveData = async () => {
    const newPost = {
      ...post,
      code: post?.tool_id === 3 ? post?.code : JSON.stringify(post.code),
    }
    const res = await queryRequest(POST_DATA_UPDATE_TOOLS, newPost)

    if (res.success && res.status_code === 200) {
      refatch(res.data)
      toast.success(res.message)
      handleClose()
    } else {
      toast.error(res.message)
    }
  }

  const onChangeHandler = (key, value) => {
    if (htmlTagsCheck(value)) {
      toast.error('Invalid code please insert code into <body> tag')
    } else {
      setPost({
        ...post,
        code: {
          body: post.code?.body,
          [key]: JSON.stringify(value),
        },
      })
    }
  }

  return (
    <Can access={item.route} group='marketing'>
      <>
        <div className='col mb-6'>
          <Link to={`/plugins/${item.id}`} className='plugin-card'>
            <div className='plugin-card--icon'>
              <SVG src={item.icon} />
            </div>
            <div className='plugin-card--content'>
              <h4 className='title'>{item.title}</h4>
              <p className='desc'>
                {item?.details?.description.slice(0, 80) ||
                  'Enhance success! Understand, track, and optimize ads effortlessly for superior results.'}
              </p>
              <button
                type='button'
                onClick={handleShow}
                className='plugin-install-btn plugin-settings-btn'
              >
                <span className='icon'>
                  <SVG src='/media/icons/settings.svg' />
                </span>
                Settings
              </button>
            </div>
            <div className='shape'>
              <SVG src='/media/plugins/plugin-shape.svg' />
            </div>
          </Link>
        </div>
        {btn && (
          <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton className=''>
              <Modal.Title>{btn.title}</Modal.Title>
              {/* <label className='form-check form-switch form-check-custom form-check-solid mx-auto'>
                <span className='form-check-label me-2'>Uninstall</span>
                <input
                  className='form-check-input h-25px w-50px'
                  type='checkbox'
                  checked={btn?.installation_status === 1 ? true : false}
                  onChange={(e) => uninstallTools()}
                />
              </label> */}
            </Modal.Header>
            {item?.route === 'career' ? (
              <Modal.Body>
                <div className='card card-flush h-xl-100'>
                  <div className='d-flex flex-column flex-center'>
                    <div className='fs-1 fw-bolder text-dark mb-4'>{`Welcome to the ${
                      item?.title || 'job portal'
                    }.`}</div>
                    <span className='text-muted fw-semibold fs-7 mb-5'>
                      Explore the features and go to the next step!
                    </span>
                  </div>
                  <div className='clearfix text-primary text-center d-flex flex-center'>
                    <Link to={`/career/jobs/index`}>
                      <button
                        className='btn btn-sm btn-primary w-100 text-center'
                        id='kt_widget_5_load_more_btn'
                      >
                        <span className='indicator-label'>{`Go to ${
                          item?.title || 'job portal'
                        }`}</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </Modal.Body>
            ) : (
              <Modal.Body>
                {btn.route === 'popup' ? (
                  <PopupModa data={btn} post={post} setPost={setPost} />
                ) : (
                  btn && (
                    <>
                      <div className='clearfix'>
                        <label className='fs-6 form-label fw-bolder text-dark'>
                          Enter Your Code {`<head>`}
                        </label>
                        <textarea
                          className='form-control'
                          rows={10}
                          spellCheck='false'
                          value={
                            post?.code?.head ? JSON.parse(`${post?.code?.head || post?.code}`) : ''
                          }
                          onChange={(e) => onChangeHandler('head', e.target.value)}
                        />
                      </div>
                      <div className='clearfix'>
                        <label className='fs-6 form-label fw-bolder text-dark'>
                          Enter Your Code {`<body>`}
                        </label>
                        <textarea
                          className='form-control'
                          rows={10}
                          spellCheck='false'
                          value={
                            post?.code?.body ? JSON.parse(`${post?.code?.body || post?.code}`) : ''
                          }
                          onChange={(e) =>
                            setPost({
                              ...post,
                              code: {head: post.code?.head, body: JSON.stringify(e.target.value)}, //JSON.stringify(e.target.value),
                            })
                          }
                        />
                      </div>
                    </>
                  )
                )}
              </Modal.Body>
            )}
            {item?.route !== 'career' && (
              <Modal.Footer>
                <button
                  type='button'
                  className='btn btn-sm btn-danger'
                  style={{marginRight: 'auto'}}
                  onClick={() => {
                    uninstallTools()
                  }}
                >
                  Uninstall
                </button>
                <button type='button' className='btn btn-sm btn-dark' onClick={() => saveData()}>
                  Save
                </button>
              </Modal.Footer>
            )}
          </Modal>
        )}
      </>
    </Can>
  )
}

export default PopupHandler

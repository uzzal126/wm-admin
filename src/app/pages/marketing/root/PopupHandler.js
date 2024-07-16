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
  const handleShow = () => {
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
      code: JSON.stringify(post.code),
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
          <button
            onClick={handleShow}
            className='position-relative btn d-flex align-items-center min-h-150px w-100 shadow bg-white bg-hover-light justify-content-center flex-column'
          >
            <div
              className='ribbon ribbon-triangle ribbon-top-start border-success'
              style={{borderColor: 'var(--bs-success)'}}
            >
              <div
                className='ribbon-icon'
                style={{
                  marginTop: '-20px',
                  marginLeft: '-20px',
                }}
              >
                <i className='bi bi-check2 fs-2x text-white'></i>
              </div>
            </div>
            <span className='svg-icon svg-icon-5x'>
              <SVG src={item.icon} />
            </span>
            <span className='fs-4 text-uppercase mt-2'>{item.title}</span>
          </button>
        </div>
        {btn && (
          <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton className=''>
              <Modal.Title>{btn.title}</Modal.Title>
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
            {
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
                {item?.route !== 'career' && (
                  <button type='button' className='btn btn-sm btn-dark' onClick={() => saveData()}>
                    Save
                  </button>
                )}
              </Modal.Footer>
            }
          </Modal>
        )}
      </>
    </Can>
  )
}

export default PopupHandler

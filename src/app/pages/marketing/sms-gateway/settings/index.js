import {useEffect, useMemo, useState} from 'react'
import {Accordion, Form, Modal} from 'react-bootstrap'
import {useMutation} from '@tanstack/react-query'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import PageToolbar from '../../../../../_metronic/layout/components/toolbar/PageToolbar'
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
import {breadcrumbs} from '../components/helpers'
import TemplateModal from './components/TemplateModal'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseLoading,
} from './core/QueryResponseProvider'
import {updateAllUsers, updateUser} from './core/_requests'

const SMSSettings = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const res = useQueryResponseData()
  const isLoading = useQueryResponseLoading()

  const settingsRes = useMemo(() => res, [res])
  const [modal, setModal] = useState(false)

  const [settingsList, setSettingList] = useState([])
  const [settingsGroups, setSettingsGroups] = useState([])
  const [config, setConfig] = useState({})
  const [settingForEdit, setSettingForEdit] = useState(null)

  const {refetch} = useQueryResponse()

  const checkAllGroupSettings = (group_id) => {
    const updatedSettings = settingsList.map((item) => {
      if (item?.group_id === group_id) {
        return {...item, status: true} // Update the object
      }
      return item
    })

    // setSettingList(updatedSettings)
    submitAll.mutateAsync(updatedSettings)
  }

  const clearAllGroupSettings = (group_id) => {
    const updatedSettings = settingsList.map((item) => {
      if (item?.group_id === group_id) {
        return {...item, status: false} // Update the object
      }
      return item
    })

    // setSettingList(updatedSettings)
    submitAll.mutateAsync(updatedSettings)
  }

  const settingChangeHandler = (data) => {
    // const updatedSettings = settingsList.map((item) => {
    //   if (item?.id === data?.id) {
    //     return {...item, ...data} // Update the object
    //   }
    //   return item
    // })

    // setSettingList(updatedSettings)
    submit.mutateAsync(data)
  }

  const submitAll = useMutation({
    mutationFn: (data) => updateAllUsers(data),
    onSuccess: () => {
      refetch()
      toast.success('Settings updated successfully!')
    },
    onError: (error) => {
      console.error('An error occurred while updating settings:', error)
      toast.error('Error updating settings. Please try again.')
    },
  })

  const submit = useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => {
      refetch()
      toast.success('Settings updated successfully!')
    },
    onError: (error) => {
      console.error('An error occurred while updating settings:', error)
      toast.error('Error updating settings. Please try again.')
    },
  })

  const handleSubmit = async () => {
    submitAll.mutateAsync(settingsList)
  }

  useEffect(() => {
    let settings = []
    let groups = []

    try {
      const {data} = settingsRes
      settings = data?.settings || []
      groups = data?.groups || []
    } catch (err) {
      groups = []
      settings = []
    } finally {
      setSettingsGroups(groups)
      setSettingList(settings)
    }
  }, [settingsRes])

  // if (error) return <div>An error occurred: {error.message}</div>

  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('setting')}></PageToolbar>
      <KTCard className='mb-4'>
        <KTCardBody className='pb-2'>
          {Array.isArray(settingsGroups) && settingsGroups?.length > 0 ? (
            settingsGroups?.map((item, indx) => (
              <Accordion key={indx} className='pb-2' defaultActiveKey={'0'}>
                <Accordion.Item key={indx} eventKey={`${indx}`}>
                  <Accordion.Header>
                    <h3 className='fs-4 text-gray-800 fw-bold mb-0 ms-4'>{item?.name}</h3>
                  </Accordion.Header>
                  <Accordion.Body key={indx}>
                    <div className='mb-4 d-flex align-items-center gap-4'>
                      <Form.Check
                        type='radio'
                        name={item?.name}
                        id={`${item?.id}-select-all`}
                        label={<h4>Select All</h4>}
                        onClick={() => checkAllGroupSettings(item?.id)}
                      />
                      <Form.Check
                        type='radio'
                        name={item?.name}
                        id={`${item?.id}-custom`}
                        defaultChecked={true}
                        label={<h4>Custom</h4>}
                      />
                      <Form.Check
                        type='radio'
                        name={item?.name}
                        id={`${item?.id}-clear-all`}
                        label={<h4>Clear All</h4>}
                        onClick={() => clearAllGroupSettings(item?.id)}
                      />
                    </div>

                    <div className='row row-cols-3 row-cols-lg-5 py-4 g-5'>
                      {settingsList.filter((e) => e?.group_id === item?.id).length > 0 &&
                        settingsList
                          .filter((e) => e?.group_id === item?.id)
                          .map((subItem, indx) => (
                            <div className='col' key={indx}>
                              <div className='rounded shadow p-xl-3'>
                                <h4 className='pb-3'>{subItem?.title}</h4>
                                <Form.Check
                                  type='switch'
                                  inline
                                  reverse
                                  id={subItem?.id}
                                  title={subItem?.title}
                                  value={subItem?.id}
                                  onChange={() =>
                                    settingChangeHandler({
                                      id: subItem?.id,
                                      title: subItem?.title,
                                      slug: subItem?.slug,
                                      group_id: item?.id,
                                      status: !subItem.status,
                                    })
                                  }
                                  checked={subItem?.status}
                                  label={subItem?.status ? 'On' : 'Off'}
                                />
                                <label
                                  className='btn btn-light-primary py-0 px-3 mt-2'
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setSettingForEdit(subItem?.id)
                                    setModal(true)
                                  }}
                                >
                                  SMS Template
                                </label>
                              </div>
                            </div>
                          ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          ) : (
            <div style={{backgroundImage: `url('/media/auth/bg1.jpg');`}}>
              <div className='d-flex flex-column flex-center text-center p-10'>
                <div className='card card-flush w-lg-650px py-5'>
                  {isLoading ? (
                    <LoaderComponent />
                  ) : (
                    <div className='card-body py-15 py-lg-20'>
                      <h1 className='fw-bolder fs-2hx text-gray-900 mb-4'>Oops!</h1>
                      <div className='fw-semibold fs-6 text-gray-500 mb-7'>
                        We can't find any setting option for your store.
                      </div>
                      <div className='mb-3'>
                        <img
                          src='/media/auth/404-error.png'
                          className='mw-100 mh-300px theme-light-show'
                          alt=''
                        />
                        <img
                          src='/media/auth/404-error-dark.png'
                          className='mw-100 mh-300px theme-dark-show'
                          alt=''
                        />
                      </div>
                      <div className='mb-0'>
                        <Link to='/marketing/sms-gateway/index' className='btn btn-sm btn-primary'>
                          Go Back
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <Modal show={modal} onHide={() => setModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update SMS Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TemplateModal
                setting={settingsList.filter((e) => e?.id === settingForEdit)[0]}
                setModal={setModal}
              />
            </Modal.Body>
          </Modal>
        </KTCardBody>
        {/* <div className='card-footer'>
          <div className='d-flex align-items-center justify-content-end'>
            <Link to='/marketing/sms-gateway/index' className='btn btn-light me-5'>
              Cancel
            </Link>
            <button
              type='submit'
              id='kt_ecommerce_add_product_submit'
              className='btn btn-dark'
              onClick={handleSubmit}
              // onClick={addNewProduct}
              // disabled={isSubmitting || !isValid || !touched}
            >
              {false ? (
                <span className='indicator-progress d-block'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='indicator-label'>Update Settings</span>
              )}
            </button>
          </div>
        </div> */}
      </KTCard>
    </>
  )
}

const SMSSettingsWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <SMSSettings />
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SMSSettingsWrapper}

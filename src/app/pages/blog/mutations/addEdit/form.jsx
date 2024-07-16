import {ErrorMessage, Formik} from 'formik'
import {useEffect, useState} from 'react'
import {Col, Form} from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import {Toaster} from 'react-hot-toast'
import {useNavigate, useParams} from 'react-router-dom'
import Select from 'react-select'
import swal from 'sweetalert'

import {getVisibilityStatusList} from '../../../../../_metronic/partials/content/forms/publish-status/StatusHelper'
import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
import {Link} from '../../../../modules/helper/linkHandler'
import {OnlyTooltip, ToolTipLabel} from '../../../../modules/helper/misc'

import moment from 'moment'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import TextEditor from '../../../../../_metronic/partials/content/forms/editor'
import {
  blogApi,
  useAddPostMutation,
  useUpdatePostMutation,
} from '../../../../../_metronic/redux/slices/blog'
import {useAppDispatch} from '../../../../../_metronic/redux/store'
import {getAuth} from '../../../../modules/auth'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import FormTextField from '../../../../modules/components/formik/fields/form-field'
import {ErrorMessagesInPage} from '../../../../modules/errors/ErrorMessage'
import CategoryPopup from './category'
import {initialFormData} from './helper/inisialValue'
import {schema} from './helper/validation'

const BlogForm = () => {
  const auth = getAuth()
  const {slug} = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusList, setStatusList] = useState([])
  const [initialData, setInitialData] = useState(initialFormData)
  let navigate = useNavigate()

  const [blogPost] = useAddPostMutation()
  const [updatePost] = useUpdatePostMutation()
  const dispatch = useAppDispatch()

  const handleFormSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    try {
      let res = {}
      if (slug !== undefined) {
        const post = {
          id: values?.id,
          data: values,
        }
        res = await updatePost(post).unwrap()
      } else {
        res = await blogPost(values).unwrap()
      }
      if (res.success && res.status_code === 200) {
        swal('Success!', res.message, 'success').then(() => {
          navigate('/blogs/index')
        })
      } else {
        toast.error(res?.message || 'Sorry! An error occurred.')
      }
    } catch (ex) {
      console.error(ex)
      toast.error(ex?.message || 'Sorry! An error occurred.')
    } finally {
      setSubmitting(true)
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (slug !== undefined) {
      const getPost = async () => {
        const {data, isLoading} = await dispatch(blogApi.endpoints.postBySlug.initiate(slug))
        setLoading(isLoading)
        if (data && data.success && data.status_code === 200) {
          const newData = {
            ...initialFormData,
            ...data?.data,
            thumbnail:
              data?.data.thumbnail !== null ? data?.data.thumbnail : initialFormData.thumbnail,
            banner: data?.data.banner !== null ? data?.data.banner : initialFormData.banner,
            seo: data?.data.seo !== null ? data?.data.seo : initialFormData.seo,
            cat_ids: data?.data?.category ? data?.data?.category.map((f) => f.id) : [],
            scheduled_at: moment(data?.data?.scheduled_at).format('YYYY-MM-DD hh:mm:ss'),
          }
          delete newData.category
          delete newData.is_active
          delete newData.updated_at
          delete newData.updated_by
          delete newData.created_by
          delete newData.created_at
          delete newData.sid

          setInitialData(newData)
        } else {
          setError(data?.message)
        }
      }
      getPost()
    }
  }, [slug])

  const init = async () => {
    const status = await getVisibilityStatusList()
    setStatusList(status)
    setLoading(false)
  }

  if (loading) return <LoaderComponent />
  if (error) return <ErrorMessagesInPage errors={error} />
  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={schema}
        onSubmit={handleFormSubmit}
        initialValues={initialData}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isUserLoading,
          isValid,
          isSubmitting,
          setFieldValue,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className='form d-flex flex-column flex-lg-row container mx-auto'>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className={`mb-5 card card-flush py-4`}>
                    <div className='card-header min-h-auto'>
                      <div className='card-title pb-2'>
                        <h3>
                          Thumbnail <small>(1280 X 720px)</small>
                          <OnlyTooltip
                            tooltip='Set the post thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted.'
                            className={'required'}
                          />
                        </h3>
                      </div>
                    </div>
                    <div className='card-body text-center py-0'>
                      <CropperComponents
                        onCroped={(e) => {
                          setFieldValue('thumbnail', {
                            alt: e[1],
                            src: e[0],
                          })
                        }}
                        height={720}
                        width={1280}
                        src={values.thumbnail.src}
                        full={true}
                        className={`w-100 h-175px`}
                      />
                      <ErrorMessage
                        name={'thumbnail.src'}
                        render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                      />
                    </div>
                  </div>
                  <div className='card card-flush py-4 mb-5'>
                    <div className='card-body py-0'>
                      <div className=''>
                        <CategoryPopup setFieldValue={setFieldValue} values={values} />
                      </div>
                      <div className=''>
                        <h2>
                          Status
                          <OnlyTooltip tooltip='Set the post status.' className='required' />
                        </h2>
                        <Select
                          value={[statusList[values.status_id]]}
                          name='status'
                          options={statusList}
                          className='multi-select mb-2'
                          classNamePrefix='select'
                          onChange={(e) => setFieldValue('status_id', e.value)}
                        />
                        <div className={`${values.status_id !== 2 && 'd-none'} mt-10`}>
                          <label
                            htmlFor='kt_ecommerce_add_status_datepicker'
                            className='form-label'
                          >
                            Select publishing date and time
                          </label>
                          <Flatpickr
                            placeholder='Pick date &amp; time'
                            className='form-control'
                            data-enable-time
                            value={values.scheduled_at}
                            onChange={([date]) =>
                              setFieldValue(
                                'scheduled_at',
                                moment(date).format('YYYY-MM-DD hh:mm:ss')
                              )
                            }
                          />
                        </div>
                        <ErrorMessage
                          name={'status_id'}
                          render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className={`mb-5 card card-flush py-4 mb-5`}>
                    <div className='card-header min-h-auto'>
                      <div className='card-title pb-2'>
                        <h3>
                          Banner <small>(Recommended 1920px X 720px)</small>
                          <OnlyTooltip
                            tooltip='Set the post banner image. Only *.png, *.jpg and *.jpeg image files are accepted.'
                            className={'required'}
                          />
                        </h3>
                      </div>
                    </div>
                    <div className='card-body text-center py-0'>
                      <CropperComponents
                        onCroped={(e) => {
                          setFieldValue('banner', {
                            alt: e[1],
                            src: e[0],
                          })
                        }}
                        src={values.banner.src}
                        full={true}
                        className={`w-100 h-175px`}
                      />
                      <ErrorMessage
                        name={'banner.src'}
                        render={(msg) => <div className='text-danger mt-2'>{msg}</div>}
                      />
                      <div className='text-start'>
                        <FormTextField
                          as={Col}
                          controlId='validationFormik01'
                          label='Banner Caption'
                          type='text'
                          name='banner.caption'
                          tooltip='Banner caption is required.'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='card card-flush py-4 mb-5'>
                    <div className='card-body py-0'>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          onChange={(e) => {
                            setFieldValue('title', e.target.value)
                            setFieldValue('slug', slugify(e.target.value))
                            setFieldValue('seo.title', e.target.value)
                          }}
                          controlId='validationFormik01'
                          label='Title'
                          type='text'
                          name='title'
                          tooltip='A post name is required.'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          controlId='validationFormik-slug'
                          label='Slug'
                          type='text'
                          name='slug'
                          tooltip='A post slug is required and recommended to be unique.'
                          inputGroupPrepend={
                            <span className='input-group-text' id='basic-url'>
                              https://{`${auth?.shop_info?.domain}`}/blog/
                            </span>
                          }
                          required
                        />
                      </div>
                      <div className='mb-5 fv-row' onMouse>
                        <ToolTipLabel
                          label={'Post Description'}
                          tooltip={'Post Description'}
                          className='required'
                        />
                        <TextEditor
                          defaultValue={unescape(values.description)}
                          setTextEditor={(value) => setFieldValue('description', value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='card mb-5'>
                    <div className='card-header'>
                      <div className='card-title'>Meta Options</div>
                    </div>
                    <div className='card-body'>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          controlId='validationFormik01'
                          label='Meta Tag Title'
                          type='text'
                          name='seo.title'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          controlId='validationFormik01'
                          label='Meta Tag Description'
                          type='textarea'
                          name='seo.description'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          controlId='validationFormik01'
                          label='Meta Tag Keywords'
                          type='textarea'
                          name='seo.keywords'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex justify-content-end mb-3'>
                    <Link to='/posts/index' className='btn btn-light me-5'>
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      id='kt_ecommerce_add_post_submit'
                      className='btn btn-dark'
                      disabled={isUserLoading || isSubmitting}
                    >
                      {isUserLoading ? (
                        <span className='indicator-progress d-block'>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      ) : (
                        <span className='indicator-label'>Save Changes</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Toaster />
    </div>
  )
}

export default BlogForm

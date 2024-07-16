import {Formik} from 'formik'
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
  jobApi,
  useAddJobPostMutation,
  useUpdateJobPostMutation,
} from '../../../../../_metronic/redux/slices/job'
import {useAppDispatch} from '../../../../../_metronic/redux/store'
import {getAuth} from '../../../../modules/auth'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import FormTextField from '../../../../modules/components/formik/fields/form-field'
import {genders, jobTypes, locations} from './helper/constants'
import {initialFormData} from './helper/inisialValue'
import {schema} from './helper/validation'

const JobForm = () => {
  const auth = getAuth()
  const {slug} = useParams()
  const [editPost, setEditPost] = useState(initialFormData)

  const [loading, setLoading] = useState(true)
  const [statusList, setStatusList] = useState([])
  let navigate = useNavigate()

  const [jobPost] = useAddJobPostMutation()
  const [updateJobPost] = useUpdateJobPostMutation()
  const dispatch = useAppDispatch()

  const handleFormSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true)
    try {
      const data = {
        ...values,
        employment_status: values?.jobType,
        banner: values?.image?.src,
      }
      const res =
        slug === undefined
          ? await jobPost(data).unwrap()
          : await updateJobPost({id: values.id, data: data}).unwrap()

      if (res.success && res.status_code === 200) {
        swal('Success!', res.message, 'success').then(() => {
          navigate('/jobs/index')
        })
      } else {
        toast.error(res?.message || 'Sorry! An error occurred.')
      }
    } catch (ex) {
      console.error(ex)
      toast.error(ex?.data?.message || 'Sorry! An error occurred.')
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
        const {data} = await dispatch(jobApi.endpoints.jobPostBySlug.initiate(slug))
        if (data && data.success && data.status_code === 200) {
          const newData = {
            ...initialFormData,
            ...data?.data,
            jobType: data?.data?.employment_status,
            deadline: moment.unix(data?.data?.deadline).format(),
            scheduled_at: moment.unix(data?.data?.scheduled_at).format(),
            image: {
              src: data?.data?.banner,
              alt: data?.data?.title,
            },
            banner: {
              src: data?.data?.banner,
              alt: data?.data?.title,
            },
          }
          setEditPost(newData)
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

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={schema}
        onSubmit={handleFormSubmit}
        initialValues={editPost}
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
                  <div className='card card-flush py-4'>
                    <div className='card-body py-0'>
                      <div className='mb-5 fv-row'>
                        <span>
                          Job-Type
                          <OnlyTooltip tooltip='Set the job-status.' className='required' />
                        </span>
                        <Select
                          value={[jobTypes.filter((e) => e?.value === values?.jobType)][0]}
                          name='jobType'
                          options={jobTypes}
                          className='multi-select mb-2'
                          classNamePrefix='select'
                          onChange={(e) => setFieldValue('jobType', e.value)}
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <span>
                          Location
                          <OnlyTooltip tooltip='Set the job location.' className='required' />
                        </span>
                        <Select
                          value={[locations.filter((e) => e?.value === values?.location)][0]}
                          name='location'
                          options={locations}
                          className='multi-select mb-2'
                          classNamePrefix='select'
                          onChange={(e) => setFieldValue('location', e.value)}
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <span>
                          Gender
                          <OnlyTooltip tooltip='Set the gender.' className='required' />
                        </span>
                        <Select
                          value={[genders.filter((e) => e?.value === values?.gender)][0]}
                          name='gender'
                          options={genders}
                          className='multi-select mb-2'
                          classNamePrefix='select'
                          onChange={(e) => setFieldValue('gender', e.value)}
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          onChange={(e) => {
                            setFieldValue('vacancy', e.target.value)
                          }}
                          controlId='validationFormik01'
                          label='Vacancy'
                          type='text'
                          name='vacancy'
                          tooltip='vacancy is required.'
                          className='required'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          onChange={(e) => {
                            setFieldValue('age', e.target.value)
                          }}
                          controlId='validationFormik01'
                          label='Age'
                          type='text'
                          name='age'
                          tooltip='age is required.'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          onChange={(e) => {
                            setFieldValue('salary', e.target.value)
                          }}
                          controlId='validationFormik01'
                          label='Salary'
                          type='text'
                          name='salary'
                          tooltip='Salary is required.'
                          className='required'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          onChange={(e) => {
                            setFieldValue('experience', e.target.value)
                          }}
                          controlId='validationFormik01'
                          label='Experience'
                          type='number'
                          name='experience'
                          tooltip='Job type is required.'
                          className='required'
                        />
                      </div>
                      <div className='mb-5 fv-row'>
                        <label className='form-label required'>
                          <span className='me-1'>Deadline</span>
                          <i className='fas fa-info-circle fs-6' />
                        </label>
                        <Flatpickr
                          placeholder='Pick date &amp; time'
                          className='form-control'
                          data-enable-time
                          value={values.deadline}
                          onChange={([date]) =>
                            setFieldValue('deadline', moment(date).format('YYYY-MM-DD hh:mm:ss'))
                          }
                        />
                        {errors?.deadline && <div className='text-danger'>{errors.deadline}</div>}
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className={`mb-5 card card-flush py-4`}>
                    <div className='card-header min-h-auto'>
                      <div className='card-title pb-2'>
                        <h3>
                          Banner <small>(Recommended 1920px X 720px)</small>
                          <OnlyTooltip
                            tooltip='Set the post banner image. Only *.png, *.jpg and *.jpeg image files are accepted.'
                            className='required'
                          />
                        </h3>
                      </div>
                    </div>
                    <div className='card-body text-center py-0'>
                      <CropperComponents
                        onCroped={(e) => {
                          setFieldValue('image', {
                            alt: e[1],
                            src: e[0],
                          })
                        }}
                        src={values.image.src}
                        full={true}
                        // height={720}
                        // width={1920}
                        className={`m-auto`}
                      />
                    </div>
                  </div>
                  <div className='card card-flush py-4'>
                    <div className='card-body py-0'>
                      <div className='mb-5 fv-row'>
                        <FormTextField
                          as={Col}
                          onChange={(e) => {
                            setFieldValue('title', e.target.value)
                            setFieldValue('slug', slugify(e.target.value))
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
                              https://{`${auth?.shop_info?.domain}`}/job/
                            </span>
                          }
                          required
                        />
                      </div>
                      <div className='mb-5 fv-row' onMouse>
                        <ToolTipLabel
                          label={' Description'}
                          tooltip={'post Short Description'}
                          className='required'
                        />
                        <TextEditor
                          defaultValue={unescape(values.description)}
                          setTextEditor={(value) => setFieldValue('description', value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex justify-content-end mb-3'>
                    <Link to='/jobs/index' className='btn btn-light me-5'>
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

export default JobForm

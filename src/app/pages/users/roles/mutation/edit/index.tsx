import {Formik} from 'formik'
import {useEffect, useState} from 'react'
import {Accordion, Form} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import slugify from 'react-url-slugify'
import * as yup from 'yup'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {BackLink, PageTitle} from '../../../../../../_metronic/layout/core'
import {
  authApi,
  useEditRoleMutation,
  useGetUserPermissionsQuery,
} from '../../../../../../_metronic/redux/slices/auth'
import {useAppDispatch} from '../../../../../../_metronic/redux/store'
import {useAuth} from '../../../../../modules/auth'
import LoaderComponent from '../../../../../modules/components/loader/LoaderComponent'
import {ErrorMessagesInPage} from '../../../../../modules/errors/ErrorMessage'
import SingleSection from '../copm/singleSection'

const PageBack: Array<BackLink> = [
  {
    title: 'Back Roles',
    path: '/users/roles',
  },
]

const initialFormData = {
  name: '',
  slug: '',
  description: '',
  permission_ids: [],
  store_category: '',
}

const schema = yup.object({
  name: yup.string().required('Name Required'),
  slug: yup.string(),
  description: yup.string(),
  store_category: yup.string(),
})

const RoleEdit = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const {id} = useParams()

  const {data: userPermissions, isLoading} = useGetUserPermissionsQuery(undefined)
  const [editRole] = useEditRoleMutation()
  const dispatch = useAppDispatch()

  const [initial, setInitial] = useState(initialFormData)
  const [role, setRole] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const {auth} = useAuth()

  useEffect(() => {
    if (id) {
      const getRoles = async () => {
        const res = await dispatch(authApi.endpoints.getRoleById.initiate(id))
        setLoading(res.isLoading)
        if (res.data?.success && res.data?.status_code) {
          const {data} = res
          const newInitialData = {
            name: data?.role.name || '',
            slug: data?.role.slug || '',
            store_category: data?.role.store_category || '',
            description: data?.role.description || '',
            permission_ids: data?.role.permissions
              ? data?.role.permissions.map((f: any) => f.id)
              : [],
          }
          setRole(data?.role)
          setInitial(newInitialData)
        } else {
          setError(res.data?.message || 'Role not found')
        }
      }
      getRoles()
    }
  }, [dispatch, id])

  const handleFormSubmit = async (values: any, {setSubmitting}: any) => {
    setSubmitting(true)
    try {
      const post = {
        id: id,
        data: {
          ...values,
          slug: slugify(values.name),
        },
      }
      const res = await editRole(post).unwrap()
      if (res.success && res.status_code === 200) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (ex) {
      // toast.error('Error found')
      const {data}: any = ex
      toast.error(data?.message)
      console.error(ex)
    } finally {
      setSubmitting(true)
    }
  }

  if (isLoading || loading) return <LoaderComponent />

  if (id === '' || (!auth?.user?.role_id_string?.includes('1') && role?.owner === 'super_admin'))
    return (
      <>
        <PageTitle backLink={PageBack}>
          <span className='text-capitalize'>Role ID</span>
        </PageTitle>
        <ErrorMessagesInPage errors={'Id not found'} />
      </>
    )
  if (error)
    return (
      <>
        <PageTitle backLink={PageBack}>
          <span className='text-capitalize'>Role Error</span>
        </PageTitle>
        <ErrorMessagesInPage errors={error} />
      </>
    )

  return (
    <>
      <PageTitle backLink={PageBack}>
        <span className='text-capitalize'>Edit Role</span>
      </PageTitle>
      <Formik
        validationSchema={schema}
        onSubmit={handleFormSubmit}
        initialValues={initial}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isValid,
          isSubmitting,
          setFieldValue,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <KTCard>
              <div className='card-header'>
                <div className='card-title'>Edit Role</div>
              </div>
              <KTCardBody>
                <div className='mb-5 fv-row'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    type='text'
                    placeholder='Enter role name'
                    isValid={touched['name'] && isValid}
                    isInvalid={touched['name'] && !isValid}
                    value={values.name}
                    name='name'
                  />
                  <Form.Control.Feedback type='invalid'>{errors['name']}</Form.Control.Feedback>
                </div>
                <div className='mb-5 fv-row'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    onChange={handleChange}
                    type='text'
                    name='description'
                    value={values.description}
                    placeholder='Enter role description'
                    isValid={touched['description'] && isValid}
                    isInvalid={touched['description'] && !isValid}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors['description']}
                  </Form.Control.Feedback>
                </div>
                {auth?.user?.role_id_string?.includes('1') && (
                  <div className='mb-5 fv-row'>
                    <Form.Label>Store Category</Form.Label>
                    <Form.Select
                      aria-label='Store Category'
                      name='store_category'
                      onChange={handleChange}
                      isValid={touched['store_category'] && isValid}
                      isInvalid={touched['store_category'] && !isValid}
                      value={values.store_category}
                    >
                      <option>Select Store Category</option>
                      <option value='blog'>Blog</option>
                      <option value='portfolio'>Portfolio</option>
                      <option value='ecommerce'>eCommerce</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                      {errors['description']}
                    </Form.Control.Feedback>
                  </div>
                )}
                <Accordion defaultActiveKey='0'>
                  {userPermissions &&
                    userPermissions.data &&
                    userPermissions.data.length > 0 &&
                    userPermissions.data.map((section: any, i: number) => (
                      <Accordion.Item eventKey={`${i}`} key={i}>
                        <Accordion.Header>
                          <span className='accordion-icon'>
                            <KTSVG
                              className='svg-icon svg-icon-4'
                              path='/media/icons/duotune/arrows/arr064.svg'
                            />
                          </span>
                          <h3 className='fs-4 text-gray-800 fw-bold mb-0 ms-4'>
                            {section?.group_name}
                          </h3>
                        </Accordion.Header>
                        <SingleSection
                          section={section}
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      </Accordion.Item>
                    ))}
                </Accordion>
              </KTCardBody>
              <div className='card-footer'>
                <div className='d-flex align-items-center justify-content-end'>
                  <Link to='/users/roles' className='btn btn-light me-5'>
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    id='kt_ecommerce_add_product_submit'
                    className='btn btn-dark'
                    // onClick={addNewProduct}
                    disabled={isSubmitting || !isValid || !touched}
                  >
                    {isSubmitting ? (
                      <span className='indicator-progress d-block'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    ) : (
                      <span className='indicator-label'>Update Role</span>
                    )}
                  </button>
                </div>
              </div>
            </KTCard>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RoleEdit

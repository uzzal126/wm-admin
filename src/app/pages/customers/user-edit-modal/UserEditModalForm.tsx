import clsx from 'clsx'
import {useFormik} from 'formik'
import {FC, useState} from 'react'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import AddressFinder from '../../../../_metronic/partials/content/addressFinder'
import {CUSTOMER_ADD, EXISTING_CUSTOMER_ADDRESS} from '../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'
import CropperComponents from '../../../modules/components/cropper/CropperComponents'
import {DataTableLoading} from '../../../modules/datatable/loading/DataTableLoading'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
}

const editUserSchema = Yup.object().shape(
  {
    email: Yup.string()
      .email('Wrong email format')
      .test(
        'Unique Email',
        'Email already in use', // <- key, message
        function (value: any) {
          return new Promise(async (resolve, reject) => {
            if (!value || typeof value !== 'string' || value.trim() === '') {
              return resolve(true)
            }
            const res: any = await getQueryRequest(
              EXISTING_CUSTOMER_ADDRESS + `?email=${(value || '').trim()}`
            )
            if (res.success && res.status_code) {
              if (res.customer_id === 0) resolve(true)
              else resolve(false)
            } else {
              resolve(true)
            }
          })
        }
      )
      .when('msisdn', {
        is: (msisdn: any) => !msisdn,
        then: Yup.string().required('Email is required when phone is not provided'),
      }),
    name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Name is required'),
    street_address: Yup.string()
      .min(5, 'Address must be at least 5 characters long')
      .max(50, 'Maximum 50 characters'),
    msisdn: Yup.string()
      .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid phone number')
      .test('Unique Mobile', 'Mobile already in use', function (value: any) {
        return new Promise(async (resolve, reject) => {
          console.log({value})
          if (!value || typeof value !== 'string' || value.trim() === '') {
            return resolve(true)
          }
          const res: any = await getQueryRequest(
            EXISTING_CUSTOMER_ADDRESS + `?msisdn=${(value || '').trim()}`
          )
          if (res.success && res.status_code) {
            if (res.customer_id === 0) resolve(true)
            else resolve(false)
          } else {
            resolve(true)
          }
        })
      })
      .when('email', {
        is: (email: any) => !email,
        then: Yup.string().required('Phone is required when email is not provided'),
      }),
  },
  [['msisdn', 'email']]
)

const UserEditModalForm: FC<Props> = ({isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    customer_type: 'Guest',
    name: '',
    msisdn: '',
    email: '',
    avatar: '',
    country: 'BD',
    address: {
      address_type: 'Home',
      name: '',
      msisdn: '',
      region_id: 0,
      city_id: 0,
      zone_id: 0,
      area_id: 0,
      street_address: '',
    },
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      if (values?.address?.street_address?.length < 5) {
        setSubmitting(false)
        return toast.error('Address must be at least 5 characters long')
      }
      if (!values?.address?.region_id) {
        setSubmitting(false)
        return toast.error('Address area must be provided')
      }
      try {
        values = {
          ...values,
          address: {
            ...values.address,
            name: values.name,
            msisdn: values.msisdn.toString(),
          },
        }
        const res: any = await queryRequest(CUSTOMER_ADD, values)
        if (res.success && res.status_code === 200) {
          toast.success('Customer created successfully')
          setSubmitting(true)
          cancel(true)
        } else {
          toast.error(res.message)
        }
      } catch (ex) {
        console.error(ex)
      }
    },
  })
  const handleLocation = (location: any) => {
    let address: any = {...formik.values.address}
    if (location && Object.keys(location).length > 0) {
      address = {
        ...address,
        ...location,
      }
    }
    formik.setFieldValue('address', address)
  }
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column'>
          <div className='row mb-4'>
            <div className='fv-row col-4'>
              <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
              <CropperComponents
                className='w-125px h-125px'
                full=''
                height={400}
                width={400}
                onCroped={(img: any) => formik.setFieldValue('avatar', img[0])}
                src={formik.values.avatar || blankImg}
              />
            </div>
            <div className='col'>
              <div className='fv-row mb-4 '>
                <div className='d-flex align-items-center'>
                  <label className='required fw-bold fs-6 me-2 min-w-60px'>Name</label>
                  <div>
                    <input
                      placeholder='Full name'
                      {...formik.getFieldProps('name')}
                      type='text'
                      name='name'
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': formik.touched.name && formik.errors.name},
                        {
                          'is-valid': formik.touched.name && !formik.errors.name,
                        }
                      )}
                      autoComplete='off'
                      disabled={formik.isSubmitting || isUserLoading}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* end::Input */}
                <div className='fv-row mb-4'>
                  <div className='d-flex align-items-center mt-4'>
                    <label className='fw-bold fs-6 me-2 min-w-60px'>Email</label>
                    <div>
                      <input
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                        className={clsx(
                          'form-control mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.email && formik.errors.email},
                          {
                            'is-valid': formik.touched.email && !formik.errors.email,
                          }
                        )}
                        type='email'
                        name='email'
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='fv-row mb-4'>
                  <div className='d-flex align-items-center mt-4'>
                    <label className='fw-bold fs-6 me-2 min-w-60px'>Mobile</label>
                    <div>
                      <input
                        placeholder='88017XXXXXXXX'
                        {...formik.getFieldProps('msisdn')}
                        className={clsx(
                          'form-control mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.msisdn && formik.errors.msisdn},
                          {
                            'is-valid': formik.touched.msisdn && !formik.errors.msisdn,
                          }
                        )}
                        type='text'
                        name='msisdn'
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.msisdn && formik.errors.msisdn && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.msisdn}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='mb-2'>
            <AddressFinder label='' onChange={(e: any) => handleLocation(e)} setData={{}} />
          </div>
          {/* end::Input group */}

          <div className='col'>
            <div className='fv-row mb-4'>
              <label className='fw-bold fs-6 mb-2'>Full Address</label>
              <textarea
                placeholder='Apartment No.(At least 5 Characters Long)'
                name='street_address'
                {...formik.getFieldProps('street_address')}
                className={clsx(
                  'form-control mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.street_address && formik.errors.street_address},
                  {
                    'is-valid': formik.touched.street_address && !formik.errors.street_address,
                  }
                )}
                value={formik.values.address.street_address}
                autoComplete='off'
                onChange={(e: any) =>
                  formik.setFieldValue('address', {
                    ...formik.values.address,
                    street_address: e.target.value,
                  })
                }
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.street_address && formik.errors.street_address && (
                <div className='fv-plugins-message-container'>
                  <span role='alert'>{formik.errors.street_address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-5'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Cancel
          </button>

          <button
            type='submit'
            className='btn btn-dark'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Save</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <DataTableLoading />}
    </>
  )
}

export {UserEditModalForm}

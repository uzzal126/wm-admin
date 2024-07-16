import clsx from 'clsx'
import {useFormik} from 'formik'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import AddressFinder from '../../../../../_metronic/partials/content/addressFinder'
import {ADD_CUSTOMER_ADDRESS, UPDATE_CUSTOMER_ADDRESS} from '../../../../constants/api.constants'
import {queryRequest} from '../../../../library/api.helper'

const editUserSchema = Yup.object().shape(
  {
    name: Yup.string()
      .min(5, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Name is required'),
    // msisdn: Yup.string()
    //   .min(10, 'Minimum 11 symbols')
    //   .max(14, 'Maximum 14 symbols')
    //   .required('Mobile is required'),
    street_address: Yup.string().min(15, 'Minimum 15 characters').required('Address is required'),
    region_id: Yup.number().required('Select Region').positive().integer(),
    city_id: Yup.number().required('Select City').positive().integer(),
    zone_id: Yup.number().required('Select Zone').positive().integer(),
    area_id: Yup.number().required('Select Area').positive().integer(),
    msisdn: Yup.string()
      .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid phone number')
      .when('email', {
        is: (email) => !email,
        then: Yup.string().required('Phone is required when email is not provided'),
      }),

    email: Yup.string()
      .email('Invalid email format')
      .when('msisdn', {
        is: (msisdn) => !msisdn,
        then: Yup.string().required('Email is required when phone is not provided'),
      }),
  },
  [['msisdn', 'email']]
)

const AddressModal = ({data, address, refatch, setAddressModal, setAddress}) => {
  const [userForEdit] = useState({
    address_type: address?.address_type || 'Home',
    name: address?.name || '',
    msisdn: address?.msisdn || '',
    email: address?.email || '',
    region_id: address?.region_id || 0,
    city_id: address?.city_id || 0,
    area_id: address?.area_id || 0,
    zone_id: address?.zone_id || 0,
    street_address: address?.street_address || '',
    customer_id: data?.id || 0,
  })

  const handleLocation = (e) => {
    e &&
      Object.keys(e).map((key) => {
        formik.setFieldValue([key], e[key])
      })
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        let res = []
        if (address && address?.id) {
          values = {
            ...values,
            address_id: address?.id,
          }
          res = await queryRequest(
            `${UPDATE_CUSTOMER_ADDRESS}/${address?.id}`,
            {
              ...values,
              msisdn: values.msisdn.toString(),
            },
            'put'
          )
        } else {
          res = await queryRequest(ADD_CUSTOMER_ADDRESS, {
            ...values,
            msisdn: values.msisdn.toString(),
          })
        }
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
          setAddressModal(false)
          refatch()
          setAddress([])
        } else {
          toast.error(res.message)
        }
        // }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })

  return (
    <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      <Modal.Body>
        <div className='row pb-8'>
          <div className='col'>
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
                disabled={formik.isSubmitting}
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.name}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Input */}
          </div>
          <div className='col'>
            <div className='fv-row'>
              <label className='fw-bold fs-6 me-2 min-w-60px'>Mobile</label>
              <div>
                <input
                  placeholder='Mobile'
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
                  disabled={formik.isSubmitting}
                />
                {formik.touched.msisdn && formik.errors.msisdn && (
                  <div className='fv-plugins-message-container'>
                    <span role='alert'>{formik.errors.msisdn}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='fv-row'>
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
                  disabled={formik.isSubmitting}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <AddressFinder label='' onChange={(e) => handleLocation(e)} setData={userForEdit} />
          {formik.values.area_id ||
          formik.values.area_id ||
          formik.values.region_id ||
          formik.values.zone_id ? (
            ''
          ) : (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{'Please select city, zone and area!'}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col'>
          <div className='fv-row mb-0'>
            <label className='fw-bold fs-6 mb-2'>Full Address</label>
            <textarea
              placeholder='Apartment No.'
              name='street_address'
              {...formik.getFieldProps('street_address')}
              className={clsx('form-control mb-3 mb-lg-0')}
              autoComplete='off'
              disabled={formik.isSubmitting}
            />
            {formik.touched.street_address && formik.errors.street_address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.street_address}</span>
                </div>
              </div>
            )}
          </div>
          <div
            className={`text-end ${
              formik.values.street_address.length < 15 ? 'text-danger' : 'text-success'
            }`}
          >
            Total: <span>{formik.values.street_address.length}</span>
          </div>
        </div>
      </Modal.Body>
      <div className='text-center pb-5'>
        <button
          type='reset'
          onClick={() => {
            setAddressModal(false)
            setAddress([])
          }}
          className='btn btn-light me-3'
          address-kt-users-modal-action='cancel'
          disabled={formik.isSubmitting}
        >
          Cancel
        </button>

        <button
          type='submit'
          className='btn btn-dark'
          address-kt-users-modal-action='submit'
          disabled={formik.isSubmitting}
        >
          <span className='indicator-label'>Save</span>
          {formik.isSubmitting && (
            <span className='indicator-progress'>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

export default AddressModal

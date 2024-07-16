import clsx from 'clsx'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {POST_USER_UPDATE} from '../../../../constants/api.constants'
import {queryRequest} from '../../../../library/api.helper'
import {getAuth, setAuth} from '../../../../modules/auth'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  msisdn: Yup.string()
    .min(10, 'Minimum 11 symbols')
    .max(14, 'Maximum 14 symbols')
    .required('Mobile is required'),
})

const InfoModal = ({data, setInfoModal}) => {
  const [userForEdit] = useState({
    type: 'general',
    name: data?.user.name || '',
    msisdn: data?.user.msisdn || '',
    address: data?.user.address || 'Banglades',
    profile: data?.user.avatar || '',
  })

  const blankImg = data?.user.avatar || toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const res = await queryRequest(POST_USER_UPDATE, values)
        if (res.success && res.status_code === 200) {
          const user = getAuth()
          let newUser = {
            ...user,
            user: {
              ...user.user,
              avatar: values.profile,
              name: values.name,
              msisdn: values.msisdn,
              address: values.address,
            },
          }
          setAuth(newUser)
          toast.success(res.message)
          setInfoModal(false)
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
        <div className='row'>
          <div className='fv-row col-4'>
            <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
            <CropperComponents
              className='w-125px h-125px'
              full=''
              height={400}
              width={400}
              onCroped={(img) => formik.setFieldValue('profile', img[0])}
              src={formik.values.profile || blankImg}
            />
          </div>
          <div className='col'>
            <div className='fv-row '>
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
              </div>
              {/* end::Input */}
              <div className='fv-row mb-4'>
                <div className='d-flex align-items-center mt-4'>
                  <label className='required fw-bold fs-6 me-2 min-w-60px'>Mobile</label>
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
                      type='number'
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
              <div className='fv-row mb-4'>
                <div className='d-flex mt-4'>
                  <label className='required fw-bold fs-6 me-2 min-w-60px'>Full Address</label>
                  <div>
                    <textarea
                      placeholder='Address'
                      {...formik.getFieldProps('address')}
                      className={clsx(
                        'form-control mb-3 mb-lg-0',
                        {'is-invalid': formik.touched.address && formik.errors.address},
                        {
                          'is-valid': formik.touched.address && !formik.errors.address,
                        }
                      )}
                      type='text'
                      name='address'
                      autoComplete='off'
                      disabled={formik.isSubmitting}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <div className='text-center pb-5'>
        <button
          type='reset'
          onClick={() => setInfoModal(false)}
          className='btn btn-light me-3'
          data-kt-users-modal-action='cancel'
          disabled={formik.isSubmitting}
        >
          Cancle
        </button>

        <button
          type='submit'
          className='btn btn-dark'
          data-kt-users-modal-action='submit'
          disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
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

export default InfoModal

import React, {useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {IProfileDetails} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {queryRequest} from '../../../../../library/api.helper'
import {POST_USER_UPDATE} from '../../../../../constants/api.constants'
import {getAuth, setAuth} from '../../../../../modules/auth'
import {toast} from 'react-toastify'
import clsx from 'clsx'
import CropperComponents from '../../../../../modules/components/cropper/CropperComponents'

const profileDetailsSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  msisdn: Yup.string()
    .min(10, 'Minimum 11 symbols')
    .max(14, 'Maximum 14 symbols')
    .required('Mobile is required'),
})

const ProfileDetails: React.FC = () => {
  const user = getAuth()

  const [data, setData] = useState<IProfileDetails>({
    profile: user.user.avatar,
    name: user.user.name,
    msisdn: user.user.msisdn,
    address: user.user.address,
  })

  const formik = useFormik<IProfileDetails>({
    initialValues: data,
    validationSchema: profileDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const res = await queryRequest(POST_USER_UPDATE, {...values, type: 'general'})
        if (res.success && res.status_code === 200) {
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
        } else {
          toast.error(res.message)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        const updatedData = Object.assign(data, values)
        setData(updatedData)
        setSubmitting(false)
      }
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <CropperComponents
                  className='w-125px h-125px'
                  full=''
                  height={400}
                  width={400}
                  onCroped={(img: any) => formik.setFieldValue('profile', img[0])}
                  src={formik.values.profile || toAbsoluteUrl('/media/avatars/blank.png')}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg  mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.name}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Contact Phone</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg '
                  placeholder='Phone number'
                  {...formik.getFieldProps('msisdn')}
                />
                {formik.touched.msisdn && formik.errors.msisdn && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.msisdn}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-4'>
              <label className='required fw-bold fs-6 col-lg-4'>Full Address</label>
              <div className='col-lg-8 mt-4'>
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

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              {!formik.isSubmitting && 'Save Changes'}
              {formik.isSubmitting && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}

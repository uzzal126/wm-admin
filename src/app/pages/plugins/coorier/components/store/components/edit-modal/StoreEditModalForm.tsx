import clsx from 'clsx'
import {useFormik} from 'formik'
import {FC, useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import AddressFinder from '../../../../../../../../_metronic/partials/content/addressFinder'
import {
  GET_COURIER_STORE_NAME,
  POST_CREATE_COURIER_STORE,
} from '../../../../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../../../../library/api.helper'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {User, initialUser} from '../core/_models'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  store_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Store Name is required'),
  contact_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Contact Name is required'),
  contact_number: Yup.string()
    .min(10, 'Minimum 10 symbols')
    .max(14, 'Maximum 14 symbols')
    .required('Contact number is required'),
  address: Yup.string().min(10, 'Minimum 10 symbols').required('Address is required'),
  city_id: Yup.number().required('City is required'),
  zone_id: Yup.number().required('Zone is required'),
  area_id: Yup.number().required('Area is required'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const [storePrefix, setStorePrefix] = useState('')
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    store_name: user.store_name || initialUser.store_name,
    contact_name: user.contact_name || initialUser.contact_name,
    contact_number: user.contact_number || initialUser.contact_number,
    address: user.address || initialUser.address,
    city_id: user.city_id || initialUser.city_id,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  // console.log('user,', user)

  useEffect(() => {
    getPrefix()
  }, [])
  const getPrefix = async () => {
    const res = await getQueryRequest(GET_COURIER_STORE_NAME)
    // console.log(res)
    if (res.success && res.status_code === 200) {
      setStorePrefix(res.suggested_courier_store_name)
    }
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        // if (isNotEmpty(values.id)) {
        //   await updateUser(values)
        // } else {
        // await createUser(values)
        let post = {
          ...values,
          store_name: `${storePrefix} - ${values.store_name}`,
        }
        // console.log(post)
        const res = await queryRequest(POST_CREATE_COURIER_STORE, post)
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
          cancel(true)
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

  const handleLocation = (location: any) => {
    if (location && Object.keys(location).length > 0) {
      Object.keys(location).map((loc: any) => {
        formik.setFieldValue(loc, location[loc])
      })
    }
  }

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column'>
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Store Name</label>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>
                {storePrefix}-
              </span>
              <input
                placeholder='Store name'
                {...formik.getFieldProps('store_name')}
                type='text'
                name='store_name'
                className={clsx(
                  'form-control  mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.store_name && formik.errors.store_name},
                  {
                    'is-valid': formik.touched.store_name && !formik.errors.store_name,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
            </div>

            {formik.touched.store_name && formik.errors.store_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span>{formik.errors.store_name}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Contact Name</label>
            <input
              placeholder='Contact name'
              {...formik.getFieldProps('contact_name')}
              type='text'
              name='contact_name'
              className={clsx(
                'form-control  mb-3 mb-lg-0',
                {'is-invalid': formik.touched.contact_name && formik.errors.contact_name},
                {
                  'is-valid': formik.touched.contact_name && !formik.errors.contact_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.contact_name && formik.errors.contact_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span>{formik.errors.contact_name}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Contact Number</label>
            <input
              placeholder='Contact Number'
              {...formik.getFieldProps('contact_number')}
              type='text'
              name='contact_number'
              className={clsx(
                'form-control  mb-3 mb-lg-0',
                {'is-invalid': formik.touched.contact_number && formik.errors.contact_number},
                {
                  'is-valid': formik.touched.contact_number && !formik.errors.contact_number,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.contact_number && formik.errors.contact_number && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span>{formik.errors.contact_number}</span>
                </div>
              </div>
            )}
          </div>
          <div className='mb-3'>
            <AddressFinder label='' onChange={(e: any) => handleLocation(e)} setData={{}} />
          </div>
          {/* end::Input group */}
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Full Address</label>
            <textarea
              placeholder='Full Address'
              {...formik.getFieldProps('address')}
              name='address'
              className={clsx(
                'form-control  mb-3 mb-lg-0',
                {'is-invalid': formik.touched.address && formik.errors.address},
                {
                  'is-valid': formik.touched.address && !formik.errors.address,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.address && formik.errors.address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span>{formik.errors.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
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
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}

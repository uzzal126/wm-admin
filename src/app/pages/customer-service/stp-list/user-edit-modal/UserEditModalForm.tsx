import clsx from 'clsx'
import {useFormik} from 'formik'
import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useListView} from '../core/ListViewProvider'
// import {UsersListLoading} from '../components/loading/UsersListLoading'
import {toast} from 'react-toastify'
import {useGetRolesQuery} from '../../../../../_metronic/redux/slices/auth'
import {DataTableLoading} from '../../../../modules/datatable/loading/DataTableLoading'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {createUser, updateUser} from '../core/_requests'

type Props = {
  isUserLoading: boolean
  user: any
}

const editUserSchema = Yup.object().shape({
  serial: Yup.number().min(0),
  branch: Yup.string().required(),
  service_hour: Yup.string().required(),
  weekend: Yup.string().required(),
  address_bangla: Yup.string().required(),
  address_english: Yup.string().required(),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const {data: rolesData, isLoading: roleLoading} = useGetRolesQuery(undefined)
  const edit = Object.keys(user).length > 0 && user.hasOwnProperty('setting_id') && user.setting_id
  // const [addUser] = useAddUserMutation()
  // const [editUser] = useEditUserMutation()
  const [store, setStore] = useState('')

  // const dispatch = useAppDispatch()
  const [userForEdit] = useState<any>({
    serial: user['Sl. No.'] || 0,
    branch: user['Branch'] || '',
    service_hour: user['Service Hour'] || '',
    weekend: user['Weekend'] || '',
    address_bangla: user['Address_Bangla'] || '',
    address_english: user['Address_English'] || '',
    setting_id: user['setting_id'],
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (edit) {
          // info (edit data)
          setSubmitting(true)
          const res: any = await updateUser({
            action_type: 'edit',
            setting_name: 'stp_list',
            setting_data: {
              Address_Bangla: values.address_bangla,
              Address_English: values.address_english,
              Branch: values.branch,
              'Service Hour': values.service_hour,
              'Sl. No.': values.serial,
              Weekend: values.weekend,
              setting_id: values.setting_id,
            },
          })
          if (res?.success && res?.status_code === 200) {
            cancel(true)
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        } else {
          // info (add data)
          const res: any = await createUser({
            action_type: 'add',
            setting_name: 'stp_list',
            setting_data: {
              Address_Bangla: values.address_bangla,
              Address_English: values.address_english,
              Branch: values.branch,
              'Service Hour': values.service_hour,
              'Sl. No.': values.serial,
              Weekend: values.weekend,
              setting_id: 0,
            },
          })
          if (res?.success && res?.status_code === 200) {
            cancel(true)
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        }
      } catch (ex: any) {
        toast.error(
          ex?.data?.errors?.msisdn ||
            ex?.data?.errors?.role_ids ||
            ex?.data?.errors?.address ||
            'Something wrong please try again'
        )
      } finally {
        setSubmitting(true)
      }
    },
  })

  if (roleLoading) return <></>

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column me-n7 pe-7'>
          {!edit && (
            <div className='fv-row mb-7'>
              {/* begin::Label */}
              <label className='required fw-bold fs-6 mb-2'>Branch</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='Branch'
                {...formik.getFieldProps('branch')}
                type='text'
                name='branch'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.branch && formik.errors.branch},
                  {
                    'is-valid': formik.touched.branch && !formik.errors.branch,
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
              {/* end::Input */}
            </div>
          )}

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Service Hour</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Service Hour'
              {...formik.getFieldProps('service_hour')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.email && formik.errors.email},
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
              type='text'
              name='service_hour'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.service_hour && formik.errors.service_hour && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.service_hour}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2 required'>Weekend</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Weekend'
              {...formik.getFieldProps('weekend')}
              type='text'
              name='weekend'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.weekend && formik.errors.weekend},
                {
                  'is-valid': formik.touched.weekend && !formik.errors.weekend,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.weekend && formik.errors.weekend && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.weekend}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2 required'>Address Bangla</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Address Bangla'
              {...formik.getFieldProps('address_bangla')}
              type='text'
              name='address_bangla'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.address_bangla && formik.errors.address_bangla},
                {
                  'is-valid': formik.touched.address_bangla && !formik.errors.address_bangla,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.address_bangla && formik.errors.address_bangla && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.address_bangla}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2 required'>Address English</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Address English'
              {...formik.getFieldProps('address_english')}
              type='text'
              name='address_english'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.address_english && formik.errors.address_english},
                {
                  'is-valid': formik.touched.address_english && !formik.errors.address_english,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.address_english && formik.errors.address_english && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.address_english}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
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
      {(formik.isSubmitting || isUserLoading) && <DataTableLoading />}
    </>
  )
}

export {UserEditModalForm}

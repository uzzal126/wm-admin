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
  District: Yup.string().required(),
  RetailerName: Yup.string().required(),
  Address: Yup.string().required(),
  Contact: Yup.string().required(),
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
    District: user['District'] || '',
    RetailerName: user['RetailerName'] || '',
    Address: user['Address'] || '',
    Contact: user['Contact'] || '',
    serial: user['Sl. No.'],
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
            setting_name: 'eo_list',
            setting_data: {
              ...values,
              'Sl. No.': values.serial,
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
            setting_name: 'eo_list',
            setting_data: {...values, 'Sl. No.': 0},
          })
          if (res?.success && res?.status_code === 200) {
            cancel(true)
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        }
      } catch (ex: any) {
        toast.error(ex.message || 'Something wrong please try again')
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
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>District</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='District'
              {...formik.getFieldProps('District')}
              type='text'
              name='District'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.District && formik.errors.District},
                {
                  'is-valid': formik.touched.District && !formik.errors.District,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.District && formik.errors.District && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.District}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Retailer Name</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Retailer Name'
              {...formik.getFieldProps('RetailerName')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.RetailerName && formik.errors.RetailerName},
                {
                  'is-valid': formik.touched.RetailerName && !formik.errors.RetailerName,
                }
              )}
              type='text'
              name='RetailerName'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.RetailerName && formik.errors.RetailerName && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.RetailerName}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2 required'>Address</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Address'
              {...formik.getFieldProps('Address')}
              type='text'
              name='Address'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.Address && formik.errors.Address},
                {
                  'is-valid': formik.touched.Address && !formik.errors.Address,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.Address && formik.errors.Address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.Address}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {!edit && (
            <div className='fv-row mb-7'>
              {/* begin::Label */}
              <label className='fw-bold fs-6 mb-2 required'>Contact</label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                placeholder='Contact'
                {...formik.getFieldProps('Contact')}
                type='text'
                name='Contact'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.Contact && formik.errors.Contact},
                  {
                    'is-valid': formik.touched.Contact && !formik.errors.Contact,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.Contact && formik.errors.Contact && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.Contact}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          )}
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

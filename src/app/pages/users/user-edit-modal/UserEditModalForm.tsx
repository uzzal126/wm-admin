import clsx from 'clsx'
import {useFormik} from 'formik'
import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useListView} from '../core/ListViewProvider'
// import {UsersListLoading} from '../components/loading/UsersListLoading'
import {Form} from 'react-bootstrap'
import Select from 'react-select'
import SelectSearch from 'react-select-search'
import {toast} from 'react-toastify'
import {Can} from '../../../../_metronic/redux/ability'
import {
  authApi,
  useAddUserMutation,
  useEditUserMutation,
  useGetRolesQuery,
} from '../../../../_metronic/redux/slices/auth'
import {useAppDispatch} from '../../../../_metronic/redux/store'
import {DataTableLoading} from '../../../modules/datatable/loading/DataTableLoading'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {User} from '../core/_models'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  msisdn: Yup.string().min(11, 'Minimum 11 symbols').max(14, 'Maximum 14 symbols'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const {data: rolesData, isLoading: roleLoading} = useGetRolesQuery(undefined)
  const [addUser] = useAddUserMutation()
  const [editUser] = useEditUserMutation()
  const [store, setStore] = useState('')

  const dispatch = useAppDispatch()
  const [userForEdit] = useState<User>({
    id: user.id || 0,
    name: user.name || '',
    email: user.email || '',
    password: user.password || '',
    msisdn: user.msisdn || '',
    avatar: user.avatar || '',
    address: user.address || '',
    role_ids: user.roles && user.roles.length > 0 ? user.roles.map((f) => f.id) : [],
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
        if (store !== '') {
          const chStore = JSON.parse(store)
          values = {
            ...values,
            store_id: chStore.id,
            sid: chStore.sid,
          }
        }
        if (values.id && values.id > 0) {
          const post = {
            id: values.id,
            data: {
              ...values,
            },
          }
          const res = await editUser(post).unwrap()
          if (res.success && res.status_code === 200) {
            cancel(true)
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        } else {
          const res = await addUser(values).unwrap()
          if (res.success && res.status_code === 200) {
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

  const roleOptions = () => {
    const lists: any = []
    if (rolesData?.roles && rolesData?.roles.length > 0) {
      rolesData?.roles.map((role: any) => {
        lists.push({
          ...role,
          label: role.name,
          value: role.id,
        })
      })
    }
    return lists
  }

  const loadOptions = async (search: string) => {
    const param = `?search=${search}&page=1&items_per_page=50`
    const res = await dispatch(authApi.endpoints.getStore.initiate(param))
    const lists: any = []
    if (res?.data.success && res?.data.status_code === 200) {
      const {data} = res.data
      if (data && data.length > 0) {
        data.map((item: any) => {
          lists.push({
            ...item,
            name: item.domain,
            value: JSON.stringify(item),
          })
        })
      }
    }
    return lists
  }

  if (roleLoading) return <></>

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column me-n7 pe-7'>
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Full Name</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Full name'
              {...formik.getFieldProps('name')}
              type='text'
              name='name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
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
            {/* end::Input */}
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Email</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Email'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
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
            {/* end::Input */}
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2'>Mobile Number</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Mobile Number'
              {...formik.getFieldProps('msisdn')}
              type='text'
              name='msisdn'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.msisdn && formik.errors.msisdn},
                {
                  'is-valid': formik.touched.msisdn && !formik.errors.msisdn,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.msisdn && formik.errors.msisdn && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.msisdn}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          <Can access='permission' group='users'>
            <Form.Group className='mb-3' controlId='route'>
              <Form.Label>Store</Form.Label>
              <SelectSearch
                options={[]}
                value={store}
                search
                getOptions={(query) => loadOptions(query)}
                onChange={(e: any) => setStore(e)}
                emptyMessage='Store not found'
                placeholder='Search your Store'
              />
            </Form.Group>
          </Can>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>Role</Form.Label>
            <Select
              defaultValue={[]}
              isMulti
              name='role_ids'
              options={roleOptions()}
              onChange={(e: any) =>
                formik.setFieldValue(
                  'role_ids',
                  e.map((f: any) => f.value)
                )
              }
              classNamePrefix='select'
            />
          </Form.Group>
          {(!user.id || user.id <= 0) && (
            <Form.Group className='mb-3' controlId='route'>
              <Form.Label>password</Form.Label>
              <Form.Control
                {...formik.getFieldProps('password')}
                type='password'
                name='password'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.msisdn && formik.errors.msisdn},
                  {
                    'is-valid': formik.touched.msisdn && !formik.errors.msisdn,
                  }
                )}
              />
            </Form.Group>
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

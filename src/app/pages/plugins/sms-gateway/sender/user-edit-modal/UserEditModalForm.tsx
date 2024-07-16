import {useFormik} from 'formik'
import {FC, useState} from 'react'
import swal from 'sweetalert'
import * as Yup from 'yup'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {utf8ByteLength} from '../../../../../modules/helper/misc'
import {UsersListLoading} from '../../../coorier/components/store/components/components/loading/UsersListLoading'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {Template} from '../core/_models'
import {createUser, updateUser} from '../core/_requests'

type Props = {
  isUserLoading: boolean
  user: Template
}

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('name is required'),
  text: Yup.string().required('Text is required'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<Template>({
    ...user,
    name: user.name || '',
    text: user.text || '',
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const res: any = await updateUser({
            id: values.id,
            name: values.name,
            text: values.text,
          })
          if (res?.success) {
            cancel(true)
          } else {
            swal({
              title: 'Sorry!',
              text: res?.message,
              icon: 'error',
            })
          }
        } else {
          const res: any = await createUser({
            name: values.name,
            text: values.text,
          })
          if (res?.success) {
            cancel(true)
          } else {
            swal({
              title: 'Sorry!',
              text: res?.message,
              icon: 'error',
            })
          }
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  return (
    <>
      <form
        className='form'
        action='#'
        id='kt_modal_update_customer_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='modal-body'>
          <div className='row mb-3'>
            <label htmlFor='tempname' className='col-sm-2 col-form-label'>
              Template Name
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='tempname'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.name || ''}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='row mb-3'>
            <label htmlFor='smscontent' className='col-sm-2 col-form-label'>
              SMS Text
            </label>
            <div className='col-sm-10'>
              <textarea
                className='form-control'
                id='smscontent'
                name='text'
                value={formik.values.text}
                onChange={formik.handleChange}
              />
              {formik.touched.text && formik.errors.text && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.text}</span>
                  </div>
                </div>
              )}
              <div className='d-flex mt-2'>
                <span className=''>{`${utf8ByteLength(formik.values.text)} Characters`}</span>
                <span className='w-1px bg-light-dark mx-2'></span>
                <span className=''>{`${Math.ceil(
                  utf8ByteLength(formik.values.text) / 160
                )} SMS`}</span>
                <span className='w-1px bg-light-dark mx-2'></span>
                <span className=''>160 Char/SMS</span>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer flex-center py-2'>
          <button
            type='reset'
            id='kt_modal_update_customer_cancel'
            className='btn btn-light me-3 btn-sm'
            onClick={() => cancel()}
          >
            Discard
          </button>
          <button
            type='submit'
            id='kt_modal_update_customer_submit'
            className='btn btn-primary btn-sm'
          >
            <span className='indicator-label'>Submit</span>
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}

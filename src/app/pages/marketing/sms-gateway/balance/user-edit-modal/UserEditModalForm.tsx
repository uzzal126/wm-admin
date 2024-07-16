import {ErrorMessage, Field, Form, Formik} from 'formik'
import {FC, useState} from 'react'
import * as Yup from 'yup'

import {toast} from 'react-toastify'
import FileUpload from '../../../../../../_metronic/partials/custom-modules/fileUpload/FileUpload'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {Bundle} from '../core/_models'
import {createUser, updateUser} from '../core/_requests'

type Props = {
  isUserLoading: boolean
  user: Bundle
}

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const editUserSchema = Yup.object().shape({
    number_of_sms: Yup.number()
      .min(100, 'Number of SMS must be al least 1!')
      .required('Amount is required'),
    account_type: Yup.string().oneOf(['Masking', 'Non-Masking']).required(),
    pricing: Yup.number().min(1, 'Pricing must be al least 1!').required(),
    total_price: Yup.number().min(100).required('Total price is required'),
    remarks: Yup.string(),
    attachments: Yup.array().of(
      Yup.object().shape({
        file: Yup.mixed()
          .test('is-file-too-big', 'File exceeds 10MB', (value) => {
            if (value) {
              const size = value.size / 1024 / 1024
              return size <= 10
            }
            return true
          })
          .test('is-file-of-correct-type', 'File is not of a supported type', (value) => {
            if (value) {
              const type = value.type.split('/')[1]
              const validTypes = [
                'zip',
                'xml',
                'xhtml+xml',
                'plain',
                'svg+xml',
                'rtf',
                'pdf',
                'jpeg',
                'png',
                'jpg',
                'ogg',
                'json',
                'html',
                'gif',
                'csv',
              ]
              return validTypes.includes(type)
            }
            return true
          }),
        description: Yup.string(),
      })
    ),
  })

  const [userForEdit] = useState<Bundle>({
    ...user,
    number_of_sms: user?.number_of_sms || 100,
    account_type: user?.account_type || 'Non-Masking',
    pricing: user?.pricing || 1,
    total_price: user?.total_price || 100,
    remarks: user?.remarks || '',
    attachments: user?.attachments ? JSON.parse(user?.attachments) : [],
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  return (
    <Formik
      initialValues={userForEdit}
      validationSchema={editUserSchema}
      onSubmit={async (values, actions) => {
        // console.log({values})
        try {
          const res: any = user?.id
            ? await updateUser({
                id: user?.id,
                number_of_sms: values.number_of_sms,
                account_type: values.account_type,
                pricing: values.pricing,
                total_price: values.total_price,
                remarks: values.remarks,
                attachments: values.attachments.map(({fileimage, ...rest}: any) => rest),
              })
            : await createUser({
                number_of_sms: values.number_of_sms,
                account_type: values.account_type,
                pricing: values.pricing,
                total_price: values.total_price,
                remarks: values.remarks,
                attachments: values.attachments.map(({fileimage, ...rest}: any) => rest),
              })
          if (res?.success) {
            cancel(true)
          } else {
            toast.error(res?.message || 'Sorry! An error occured.')
          }
        } catch (err: any) {
          toast.error(err.message || 'Sorry! An error occured.')
        }
      }}
    >
      {({isSubmitting, touched, setFieldValue, values}) => (
        <Form>
          <div className='mb-3'>
            <label htmlFor='number_of_sms' style={{fontSize: '15px', fontWeight: 600}}>
              Number of SMS*
            </label>
            <Field
              type='number'
              name='number_of_sms'
              id='number_of_sms'
              className='form-control col-sm-10'
              min={100}
              onChange={(e: any) => {
                const newAmount = parseFloat(e.target.value)
                if (!isNaN(newAmount)) {
                  // Calculate pricing as 1.5 * number_of_sms
                  setFieldValue('number_of_sms', newAmount)
                  setFieldValue('total_price', newAmount * 1)
                } else {
                  // Handle invalid input
                  setFieldValue('total_price', 0) // Clear pricing if number_of_sms is not a valid number
                }
              }}
            />
            <div className='d-flex mt-2'>
              <span>{`Pricing: ${values.pricing}`}</span>
              <span className='w-1px bg-light-dark mx-2'></span>
              <span>{`Total Price: ${values.total_price} ৳`}</span>
            </div>
            <ErrorMessage name='number_of_sms' component='div' className='text-danger' />
          </div>

          <div className='mb-3'>
            <label htmlFor='account_type' style={{fontSize: '15px', fontWeight: 600}}>
              Balance Type*
            </label>
            <Field as='select' name='account_type' className='form-control col-sm-10'>
              <option>Select Balance Type</option>
              <option value='Masking'>Masking</option>
              <option value='Non-Masking'>Non-Masking</option>
            </Field>
            <ErrorMessage name='account_type' component='div' className='text-danger' />
          </div>

          {/* <div className='mb-3'>
            <label
              htmlFor='number_of_sms'
              className='col-sm-2 col-form-label'
              style={{fontSize: '15px', fontWeight: 600}}
            >
              Pricing
            </label>
            <Field
              type='number'
              name='pricing'
              id='number_of_sms'
              className='form-control col-sm-10'
              min={1}
              readOnly
            />
            <ErrorMessage name='number_of_sms' component='div' className='text-danger' />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='number_of_sms'
              className='col-sm-2 col-form-label'
              style={{fontSize: '15px', fontWeight: 600}}
            >
              Total Price*
            </label>
            <Field
              type='number'
              name='total_price'
              id='total_price'
              className='form-control col-sm-10'
              min={1}
              readOnly
            />
            <ErrorMessage name='total_price' component='div' className='text-danger' />
          </div> */}

          <div className='mb-3'>
            <label htmlFor='remarks' style={{fontSize: '15px', fontWeight: 600}}>
              Remarks
            </label>
            <textarea
              className='form-control'
              name='remarks'
              id='remarks'
              value={values.remarks}
              onChange={(e: any) => {
                setFieldValue('remarks', e.target.value)
              }}
            ></textarea>
          </div>

          <div className='mb-3'>
            <FileUpload
              label='Attachments'
              initValues={userForEdit?.attachments}
              onChange={(files: any) => setFieldValue('attachments', files)}
            />
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
              {isSubmitting && (
                <span className='indicator-progress'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2' />
                </span>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export {UserEditModalForm}

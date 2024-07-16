// import React from 'react'
// import {Formik} from 'formik'
// import {Col, Form} from 'react-bootstrap'
// import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
// import PageToolbar from '../../../../../../_metronic/layout/components/toolbar/PageToolbar'
// import {POST_COURIER_CONFIG} from '../../../../../constants/api.constants'
// import {queryRequest} from '../../../../../library/api.helper'
// import FormTextField from '../../../../../modules/components/formik/fields/form-field'
// import {breadcrumbs} from '../../helpers/helpers'
// import * as yup from 'yup'
// import {toast} from 'react-toastify'

// const initialData = {
//   courier_partner_id: 0,
//   username: '',
//   password: '',
//   client_secret: '',
//   client_id: 0,
// }

// export const schema = yup.object({
//   courier_partner_id: yup.number().required('Courier Partner Id required').positive().integer(),
//   client_id: yup.number().required('Courier Client Id required').positive().integer(),
//   client_secret: yup.string().required('Courier Secret Required'),
//   username: yup.string().required('Courier username Required'),
//   password: yup.string().required('Courier password Required'),
// })

// const CourierSettings = ({courier}) => {
//   let bodyStyles = ''
//   bodyStyles += '--kt-toolbar-height: 55px;'
//   bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
//   document.body.setAttribute('style', bodyStyles)

//   const handleFormSubmit = async (values, {setSubmitting}) => {
//     setSubmitting(true)
//     try {
//       // console.log(values)
//       const res = await queryRequest(POST_COURIER_CONFIG, values)
//       if (res.success && res.status_code === 200) {
//         toast.success(res.message)
//       } else {
//         toast.error(res.message)
//       }
//     } catch (ex) {
//       console.error(ex)
//     } finally {
//       setSubmitting(true)
//     }
//   }

//   return (
//     <>
//       <PageToolbar breadcrumbs={breadcrumbs('setting', courier?.id)}></PageToolbar>
//       <KTCard>
//         <div className='mw-450px mx-auto w-100'>
//           <div className='card-header min-h-auto pt-8'>
//             <h2 className=' flex-grow-1 text-center'>Install {courier.name}</h2>
//           </div>
//           <KTCardBody>
//             <Formik
//               validationSchema={schema}
//               onSubmit={handleFormSubmit}
//               initialValues={{...initialData, courier_partner_id: parseInt(courier?.id || 0)}}
//             >
//               {({
//                 handleSubmit,
//                 handleChange,
//                 values,
//                 errors,
//                 isUserLoading,
//                 isValid,
//                 isSubmitting,
//                 setFieldValue,
//                 touched,
//               }) => (
//                 <Form noValidate onSubmit={handleSubmit}>
//                   <FormTextField
//                     as={Col}
//                     controlId='validationFormik-value'
//                     type='number'
//                     label='Client ID'
//                     name='client_id'
//                     onChange={(e) => setFieldValue('client_id', parseInt(e.target.value))}
//                   />
//                   <FormTextField
//                     as={Col}
//                     controlId='validationFormik-value'
//                     type='text'
//                     label='Client Secret'
//                     name='client_secret'
//                   />
//                   <FormTextField
//                     as={Col}
//                     controlId='validationFormik-value'
//                     type='text'
//                     label='Courier Username'
//                     name='username'
//                   />
//                   <FormTextField
//                     as={Col}
//                     controlId='validationFormik-value'
//                     type='password'
//                     label='Courier Password'
//                     name='password'
//                   />
//                   <div className='d-flex justify-content-end mt-8'>
//                     <button
//                       type='submit'
//                       className='btn btn-dark'
//                       disabled={isUserLoading || isSubmitting || !isValid || !touched}
//                     >
//                       {isUserLoading ? (
//                         <span className='indicator-progress d-block'>
//                           Please wait...
//                           <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//                         </span>
//                       ) : (
//                         <span className='indicator-label'>Update Now</span>
//                       )}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </KTCardBody>
//         </div>
//       </KTCard>
//     </>
//   )
// }

// export default CourierSettings

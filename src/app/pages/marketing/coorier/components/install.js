// import React, {useEffect, useState} from 'react'
// import {Link, useNavigate, useParams} from 'react-router-dom'
// import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
// import {PageTitle} from '../../../../../_metronic/layout/core'
// import * as yup from 'yup'
// import {Formik} from 'formik'
// import {Col, Form} from 'react-bootstrap'
// import swal from 'sweetalert'
// import {ErrorMessagesInPage} from '../../../../modules/errors/ErrorMessage'
// import {getQueryRequest, queryRequest} from '../../../../library/api.helper'
// import {GET_COURIER_PARTNER, POST_COURIER_CONFIG} from '../../../../constants/api.constants'
// import LoaderComponent from '../../../../modules/components/loader/LoaderComponent'
// import FormTextField from '../../../../modules/components/formik/fields/form-field'

// const PageBack = [
//   {
//     title: 'Back Courier',
//     path: '/marketing/courier',
//   },
// ]

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

// const InstallCourier = () => {
//   const {id} = useParams()
//   const navigate = useNavigate()

//   const [loading, setLoading] = useState(true)
//   const [courier, setCourier] = useState([])

//   useEffect(() => {
//     getCourier(id)
//   }, [id])

//   const getCourier = async (id) => {
//     let res = await getQueryRequest(GET_COURIER_PARTNER)
//     if (res.success && res.status_code === 200) {
//       let cour = res.data.filter((f) => f.id === parseInt(id))
//       if (cour && cour.length > 0) {
//         setCourier(cour[0])
//         setLoading(false)
//       }
//     } else {
//       setLoading(false)
//     }
//   }

//   const handleFormSubmit = async (values, {setSubmitting}) => {
//     setSubmitting(true)
//     try {
//       // console.log(values)
//       const res = await queryRequest(POST_COURIER_CONFIG, values)
//       if (res.success && res.status_code === 200) {
//         swal('Success!', res.message, 'success').then(() => {
//           navigate('/marketing/courier/' + id)
//         })
//       } else {
//         swal('Sorry!', res.message, 'error')
//       }
//     } catch (ex) {
//       console.error(ex)
//     } finally {
//       setSubmitting(true)
//     }
//   }

//   if (loading) return <LoaderComponent />
//   if (!id && id === '') return <ErrorMessagesInPage errors={'Something wrong please check again'} />
//   if (courier.length <= 0)
//     return <ErrorMessagesInPage errors={'Partner not find! please check again'} />

//   return (
//     <div>
//       <PageTitle backLink={PageBack}>{courier.name}</PageTitle>
//       <KTCard>
//         <div className='mw-450px mx-auto w-100'>
//           <div className='card-header min-h-auto pt-8'>
//             <h2 className=' flex-grow-1 text-center'>Install {courier.name}</h2>
//           </div>
//           <KTCardBody>
//             <Formik
//               validationSchema={schema}
//               onSubmit={handleFormSubmit}
//               initialValues={{...initialData, courier_partner_id: parseInt(id)}}
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
//                     <Link to='/marketing/courier' className='btn btn-light me-5'>
//                       Cancel
//                     </Link>
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
//                         <span className='indicator-label'>Install Now</span>
//                       )}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </KTCardBody>
//         </div>
//       </KTCard>
//     </div>
//   )
// }

// export default InstallCourier

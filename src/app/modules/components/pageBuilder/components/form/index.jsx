import {useFormik} from 'formik'
import * as Yup from 'yup'
const FormComp = ({data}) => {
  const schema = Yup.object().shape({
    name: Yup.string().optional(),
    gender: Yup.string().optional(),
    email: Yup.string().email('invalid email').optional(),
    phone: Yup.string()
      .matches(/^(?:\+?88)?(?<phone>0?1[3-9]\d{8})$/, 'invalid phone no')
      .optional(),
    address: Yup.string().optional(),
    additionalInfo: Yup.string().optional(),
  })

  const initialValues = {
    email: '',
    name: '',
    gender: '',
    phone: '',
    address: '',
    additionalInfo: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <div className={`d-flex flex-column align-items-${data?.setting?.position}`}>
      {data?.content?.title ? (
        <>
          <h2>{data?.content?.title}</h2>
          <form
            className={`form px-2 py-2`}
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
            style={{width: '400px'}}
          >
            <div className='mb-3' style={{display: data?.content?.name ? 'block' : 'none'}}>
              <label for='exampleInputEmail1' class='form-label'>
                Name
              </label>
              <input
                type='name'
                {...formik.getFieldProps('name')}
                className='form-control'
                placeholder='Your Name'
                id='name'
                aria-describedby='name'
              />
              {formik.touched.name && formik.errors.name && (
                <div className='text-danger'>
                  <span>{formik.errors.name}</span>
                </div>
              )}
            </div>
            <div className='mb-3' style={{display: data?.content?.email ? 'block' : 'none'}}>
              <label for='exampleInputEmail1' class='form-label'>
                Email address
              </label>
              <input
                type='email'
                {...formik.getFieldProps('email')}
                className='form-control'
                placeholder='Your Email'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='text-danger'>
                  <span>{formik.errors.email}</span>
                </div>
              )}
            </div>
            <div className='mb-3' style={{display: data?.content?.phone ? 'block' : 'none'}}>
              <label for='exampleInputPassword1' className='form-label'>
                Phone
              </label>
              <input
                type='phone'
                {...formik.getFieldProps('phone')}
                name='phone'
                className='form-control'
                id='phone'
                placeholder='Your Phone'
                aria-describedby='phone'
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='text-danger'>
                  <span>{formik.errors.phone}</span>
                </div>
              )}
            </div>
            <div
              className='mb-3'
              style={{display: data?.content?.gender ? 'flex' : 'none', flexDirection: 'column'}}
            >
              <label for='exampleInputEmail1' class='form-label'>
                Gender
              </label>
              <select
                className='my-2 py-2 px-2 border border-light rounded'
                id='gender'
                name='gender'
                placeholder='Your Gender'
                {...formik.getFieldProps('gender')}
                style={{width: '200px'}}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='others'>Others</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className='text-danger'>
                  <span>{formik.errors.gender}</span>
                </div>
              )}
            </div>
            <div class='mb-3' style={{display: data?.content?.address ? 'block' : 'none'}}>
              <label for='address' className='form-label'>
                Address
              </label>
              <textarea
                className='form-control'
                {...formik.getFieldProps('address')}
                id='address'
                rows='3'
                name='address'
                placeholder='Your Address'
              ></textarea>
              {formik.touched.address && formik.errors.address && (
                <div className='text-danger'>
                  <span>{formik.errors.address}</span>
                </div>
              )}
            </div>
            <div class='mb-3' style={{display: data?.content?.additionalInfo ? 'block' : 'none'}}>
              <label for='additionalInfo' className='form-label'>
                Additional Info
              </label>
              <textarea
                className='form-control'
                {...formik.getFieldProps('additionalInfo')}
                id='additionalInfo'
                rows='3'
                name='additionalInfo'
                placeholder='Additional Info'
              ></textarea>
              {formik.touched.additionalInfo && formik.errors.additionalInfo && (
                <div className='text-danger'>
                  <span>{formik.errors.additionalInfo}</span>
                </div>
              )}
            </div>
            <div
              style={{
                display:
                  data?.content?.email ||
                  data?.content?.phone ||
                  data?.content?.address ||
                  data?.content?.additionalInfo
                    ? 'flex'
                    : 'none',
                flexDirection: 'column',
                alignItems: data?.setting?.position,
              }}
            >
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <form
            className={`form px-2 py-2`}
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
            style={{width: '400px'}}
          >
            <div className='mb-3' style={{display: 'block'}}>
              <label for='exampleInputEmail1' class='form-label'>
                Name
              </label>
              <input
                type='name'
                {...formik.getFieldProps('name')}
                className='form-control'
                placeholder='Your Name'
                id='name'
                aria-describedby='name'
              />
              {formik.touched.name && formik.errors.name && (
                <div className='text-danger'>
                  <span>{formik.errors.name}</span>
                </div>
              )}
            </div>
            <div className='mb-3' style={{display: 'block'}}>
              <label for='exampleInputEmail1' class='form-label'>
                Email address
              </label>
              <input
                type='email'
                {...formik.getFieldProps('email')}
                className='form-control'
                placeholder='Your Email'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='text-danger'>
                  <span>{formik.errors.email}</span>
                </div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default FormComp

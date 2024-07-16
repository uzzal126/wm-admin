import {useFormik} from 'formik'
import {useState} from 'react'
import * as Yup from 'yup'
const Settings = ({component, handleChange, close}) => {
  const [pos, setPos] = useState(component.body.setting.position)
  const schema = Yup.object().shape({
    title: Yup.string().optional(),
    externalLink: Yup.boolean().optional(),
    position: Yup.string().optional(),
  })

  const initialValues = {
    title: component?.body?.setting?.title,
    externalLink: component.body.setting.externalLink,
    position: pos,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleChange('setting', {
        ...component.body.setting,
        title: values?.title,
        externalLink: values?.externalLink,
        position: pos,
      })
      close()
    },
  })
  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='d-flex flex-column input-group mb-3'>
        <div class='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Title'
            {...formik.getFieldProps('title')}
            aria-label='Title'
            aria-describedby='Title'
            name='title'
          />
        </div>
        {/* <div>
          <div className='form-check mb-3'>
            <input
              className='form-check-input'
              type='checkbox'
              id='externalLink'
              name='externalLink'
              defaultChecked={component.body.setting.externalLink}
              {...formik.getFieldProps('externalLink')}
            />
            <label className='form-check-label' for='externalLink'>
              External Link
            </label>
          </div>
        </div> */}
        <div className='mt-3 mb-3'>
          <h5 className='text-muted my-2'>Position</h5>
          <div className='d-flex align-items-center'>
            <div className='form-check mx-2'>
              <input
                className='form-check-input'
                type='radio'
                name='position'
                id='pos-left'
                value={'start'}
                {...formik.getFieldProps('position')}
                defaultChecked={component.body.setting.position === 'start'}
                onChange={(e) => {
                  setPos('start')
                }}
              />
              <label className='form-check-label' for='pos-left'>
                Left
              </label>
            </div>
            <div className='form-check mx-2'>
              <input
                className='form-check-input'
                type='radio'
                name='position'
                id='pos-center'
                {...formik.getFieldProps('position')}
                defaultChecked={component.body.setting.position === 'center'}
                onChange={(e) => {
                  setPos('center')
                }}
              />
              <label className='form-check-label' for='pos-center'>
                Center
              </label>
            </div>
            <div className='form-check mx-2'>
              <input
                className='form-check-input'
                type='radio'
                name='position'
                id='pos-right'
                {...formik.getFieldProps('position')}
                defaultChecked={component.body.setting.position === 'end'}
                onChange={(e) => {
                  setPos('end')
                }}
              />
              <label className='form-check-label' for='pos-right'>
                Right
              </label>
            </div>
          </div>
          <div className='d-flex flex-column align-items-center mt-5'>
            <button
              className='btn btn-primary'
              type='submit'
              style={{
                width: '300px',
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Settings

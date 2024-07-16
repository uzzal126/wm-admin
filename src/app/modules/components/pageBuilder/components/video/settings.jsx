import {useFormik} from 'formik'
import {useState} from 'react'
import * as Yup from 'yup'
const Settings = ({component, handleChange, close}) => {
  const [pos, setPos] = useState(component.body.setting.position)
  const [disableWidth, setDisableWidth] = useState(component.body.setting.fullWidth)
  const schema = Yup.object().shape({
    title: Yup.string().optional(),
    width: Yup.string().optional(),
    height: Yup.string().optional(),
    fullWidth: Yup.boolean().optional(),
    muted: Yup.boolean().optional(),
    loop: Yup.boolean().optional(),
    position: Yup.string().optional(),
  })

  const initialValues = {
    title: component?.body?.setting?.title,
    width: component.body.setting.width,
    height: component.body.setting.height,
    fullWidth: component.body.setting.fullWidth,
    muted: component.body.setting.muted,
    loop: component.body.setting.loop,
    position: pos,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('video settings submit', values)
      handleChange('setting', {
        ...component.body.setting,
        title: values?.title,
        width: values?.width,
        height: values?.height,
        fullWidth: disableWidth,
        muted: values?.muted,
        loop: values?.loop,
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
        <div className='d-flex flex-row'>
          <div class='input-group mb-3'>
            <input
              type='number'
              className='form-control'
              placeholder='Width'
              aria-label='Width'
              aria-describedby='Width'
              name='width'
              {...formik.getFieldProps('width')}
              disabled={disableWidth}
            />
            <span class='input-group-text' id='basic-addon2'>
              W(px)
            </span>
          </div>
          <div class='input-group mb-3'>
            <input
              type='number'
              className='form-control'
              placeholder='Height'
              aria-label='height'
              disabled={disableWidth}
              aria-describedby='height'
              name='height'
              {...formik.getFieldProps('height')}
            />
            <span class='input-group-text' id='basic-addon2'>
              H(px)
            </span>
          </div>
        </div>
        <div>
          <div className='form-check mb-3'>
            <input
              className='form-check-input'
              type='checkbox'
              id='fullWidth'
              name='fullWidth'
              defaultChecked={component.body.setting.fullWidth}
              {...formik.getFieldProps('fullWidth')}
              onChange={(e) => {
                setDisableWidth(e.target.checked)
              }}
            />
            <label className='form-check-label' for='fullWidth'>
              Full Width
            </label>
          </div>
          <div>
            <div className='form-check mb-3'>
              <input
                className='form-check-input'
                type='checkbox'
                id='muted'
                name='muted'
                defaultChecked={component.body.setting.muted}
                {...formik.getFieldProps('muted')}
              />
              <label className='form-check-label' for='muted'>
                Muted
              </label>
            </div>
          </div>
          <div>
            <div className='form-check mb-3'>
              <input
                className='form-check-input'
                type='checkbox'
                id='loop'
                name='loop'
                defaultChecked={component.body.setting.loop}
                {...formik.getFieldProps('loop')}
              />
              <label className='form-check-label' for='loop'>
                Loop
              </label>
            </div>
          </div>
        </div>
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

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
    padding: Yup.string().optional(),
    fontSize: Yup.string().optional(),
    bold: Yup.boolean().optional(),
    italic: Yup.boolean().optional(),
    bg: Yup.string().optional(),
    roundedBtn: Yup.boolean().optional(),
    shadow: Yup.boolean().optional(),
    position: Yup.string().optional(),
  })

  const initialValues = {
    title: component?.body?.setting?.title,
    width: component.body.setting.width,
    height: component.body.setting.height,
    fontSize: component.body.setting.fontSize,
    padding: component.body.setting.padding,
    bg: component.body.setting.bg,
    roundedBtn: component.body.setting.roundedBtn,
    bold: component.body.setting.bold,
    italic: component.body.setting.italic,
    shadow: component.body.setting.shadow,
    lazyLoading: component.body.setting.lazyLoading,
    position: pos,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleChange('setting', {
        ...component.body.setting,
        title: values?.title,
        width: values?.width,
        height: values?.height,
        padding: values?.padding,
        bold: values?.bold,
        roundedBtn: values?.roundedBtn,
        bg: values?.bg,
        italic: values?.italic,
        fontSize: values?.fontSize,
        shadow: values?.shadow,
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
          <div class='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Background Color'
              aria-label='bg'
              aria-describedby='bg'
              name='bg'
              {...formik.getFieldProps('bg')}
            />
            <span class='input-group-text' id='basic-addon2'>
              Background Color
            </span>
          </div>
          <div class='input-group mb-3'>
            <input
              type='number'
              className='form-control'
              placeholder='Padding'
              aria-label='padding'
              aria-describedby='padding'
              name='padding'
              {...formik.getFieldProps('padding')}
            />
            <span class='input-group-text' id='basic-addon2'>
              Padding (px)
            </span>
          </div>
          <div class='input-group mb-3'>
            <input
              type='number'
              className='form-control'
              placeholder='Font Size'
              aria-label='fontSize'
              aria-describedby='fontSize'
              name='fontSize'
              {...formik.getFieldProps('fontSize')}
            />
            <span class='input-group-text' id='basic-addon2'>
              Font Size (px)
            </span>
          </div>
          <div className='d-flex align-items-center'>
            <div className='form-check mb-3'>
              <input
                className='form-check-input'
                type='checkbox'
                id='bold'
                name='bold'
                defaultChecked={component.body.setting.bold}
                {...formik.getFieldProps('bold')}
              />
              <label className='form-check-label' for='bold'>
                Bold
              </label>
            </div>
            <div style={{marginLeft: '20px'}}>
              <div className='form-check mb-3'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='italic'
                  name='italic'
                  defaultChecked={component.body.setting.italic}
                  {...formik.getFieldProps('italic')}
                />
                <label className='form-check-label' for='italic'>
                  Italic
                </label>
              </div>
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <div className='form-check mb-3'>
              <input
                className='form-check-input'
                type='checkbox'
                id='roundedBtn'
                name='roundedBtn'
                defaultChecked={component.body.setting.roundedBtn}
                {...formik.getFieldProps('roundedBtn')}
              />
              <label className='form-check-label' for='roundedBtn'>
                Rounded Button
              </label>
            </div>
            <div className='form-check mb-3' style={{marginLeft: '20px'}}>
              <input
                className='form-check-input'
                type='checkbox'
                id='shadow'
                name='shadow'
                defaultChecked={component.body.setting.shadow}
                {...formik.getFieldProps('shadow')}
              />
              <label className='form-check-label' for='shadow'>
                Shadow
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

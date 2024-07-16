import {useFormik} from 'formik'
import {useState} from 'react'
import * as Yup from 'yup'
const Settings = ({component, handleChange, close}) => {
  const [pos, setPos] = useState(component?.body?.setting?.position)
  const [disableWidth, setDisableWidth] = useState(component?.body?.setting?.fullWidth)
  const schema = Yup.object().shape({
    title: Yup.string().optional(),
    width: Yup.string().optional(),
    height: Yup.string().optional(),
    fullWidth: Yup.boolean().optional(),
    autoplay: Yup.boolean().optional(),
    autoHeight: Yup.boolean().optional(),
    dots: Yup.boolean().optional(),
    arrows: Yup.boolean().optional(),
    infinite: Yup.boolean().optional(),
    position: Yup.string().optional(),
    style: Yup.string().optional(),
  })

  const initialValues = {
    width: component?.body?.setting?.width,
    height: component?.body?.setting?.height,
    fullWidth: component?.body?.setting?.fullWidth,
    autoHeight: component?.body?.setting?.autoHeight,
    dots: component?.body?.setting?.dots,
    arrows: component?.body?.setting?.arrows,
    autoplay: component?.body?.setting?.autoplay,
    infinite: component?.body?.setting?.infinite,
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
        fullWidth: disableWidth,
        autoHeight: values?.autoHeight,
        dots: values?.dots,
        arrows: values?.arrows,
        autoplay: values?.autoplay,
        infinite: values?.infinite,
        style: values?.style,
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
        {/* <div class='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Title'
            {...formik.getFieldProps('title')}
            aria-label='Title'
            aria-describedby='Title'
            name='title'
          />
        </div> */}
        <h5 className='text-muted my-2'>Image Size - </h5>
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
        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            id='autoHeight'
            name='autoHeight'
            defaultChecked={component.body.setting.autoHeight}
            {...formik.getFieldProps('autoHeight')}
          />
          <label className='form-check-label' for='autoHeight'>
            Height Auto
          </label>
        </div>
        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            id='autoplay'
            name='autoplay'
            defaultChecked={component.body.setting.autoplay}
            {...formik.getFieldProps('autoplay')}
          />
          <label className='form-check-label' for='autoplay'>
            Autoplay
          </label>
        </div>
        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            id='dots'
            name='dots'
            defaultChecked={component.body.setting.dots}
            {...formik.getFieldProps('dots')}
          />
          <label className='form-check-label' for='dots'>
            Show Slider Dots
          </label>
        </div>
        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            id='infinite'
            name='infinite'
            defaultChecked={component.body.setting.infinite}
            {...formik.getFieldProps('infinite')}
          />
          <label className='form-check-label' for='infinite'>
            Infinite
          </label>
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

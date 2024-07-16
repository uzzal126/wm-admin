import {useFormik} from 'formik'
import {useState} from 'react'
import {Button, Nav, Tab} from 'react-bootstrap'
import * as Yup from 'yup'
import Settings from './settings'

const MapModal = ({close, show, component, onChange}) => {
  const [url, setUrl] = useState(component?.body?.content?.url || '')

  const schema = Yup.object().shape({
    url: Yup.string().url('Invalid url').required('Url is required'),
  })

  const initialValues = {
    url: url,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('video submit data >>', values)
      handleOnChange('content', {
        ...component.body.content,
        url: values?.url,
      })
    },
  })
  // const handleOnChange = (data) => {
  //   let changed = {
  //     ...component,
  //     body: {
  //       ...component.body,
  //       content: {
  //         url: data?.url,
  //       },
  //       setting: {
  //         width: width,
  //         height: height,
  //         tittle: tittle,
  //         lazyLoading: lazyLoading,
  //         fullscreen: fullscreen,
  //       },
  //     },
  //   }
  //   console.log('map changed', changed)
  //   onChange(changed)
  // }
  const handleOnChange = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        [key]: value,
      },
    }
    console.log('map changed', changed)
    onChange(changed)
  }
  return (
    <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
      <div className='drag-header handle'>
        <div className='d-flex w-100 align-items-center justify-content-between'>
          <Nav className=''>
            <Nav.Item>
              <Nav.Link eventKey='first'>Content</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Settings</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button
            variant='light-danger'
            size='sm'
            className='btn-icon'
            onClick={() => close(!show)}
          >
            <i className='fas fa-times' />
          </Button>
        </div>
      </div>
      <div className='drag-body'>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
            <form
              className='form w-100'
              onSubmit={formik.handleSubmit}
              noValidate
              id='kt_login_signin_form'
            >
              <div className='input-group mb-3 d-flex flex-column'>
                <div className='d-flex flex-row'>
                  <input
                    type='text'
                    className={`form-control`}
                    {...formik.getFieldProps('url')}
                    style={{
                      border: formik.errors.url ? '1px solid red' : '1px solid #EEEEEE',
                    }}
                    placeholder='Video URL'
                    name='url'
                    defaultValue={component?.body?.content?.url}
                  />
                  <div className='input-group-append'>
                    <button className='btn btn-outline-primary' type='submit'>
                      Add
                    </button>
                  </div>
                </div>
                {formik.touched.url && formik.errors.url && (
                  <div className='text-danger'>
                    <span>{formik.errors.url}</span>
                  </div>
                )}
              </div>
            </form>
            <div className='alert alert-primary my-2' role='alert'>
              It may take few seconds to update the video
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <Settings
              handleChange={handleOnChange}
              component={component}
              close={() => close(!show)}
            />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  )
}

export default MapModal

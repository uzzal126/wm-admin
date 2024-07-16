import {useFormik} from 'formik'
import {useState} from 'react'
import {Button, Nav, Tab} from 'react-bootstrap'
import * as Yup from 'yup'
import Settings from './settings'

const AccordionModal = ({close, show, component, onChange}) => {
  const [accorTitle1, setAccorTitle1] = useState(
    (component?.body?.content?.accordions && component?.body?.content?.accordions[0].title) ||
      'Title 1'
  )
  const [accorTitle2, setAccorTitle2] = useState(
    (component?.body?.content?.accordions && component?.body?.content?.accordions[1].title) || ''
  )
  const [accorTitle3, setAccorTitle3] = useState(
    (component?.body?.content?.accordions && component?.body?.content?.accordions[2].title) || ''
  )
  const [accorBody1, setAccorBody1] = useState(
    (component?.body?.content?.accordions && component?.body?.content?.accordions[0].body) ||
      'Body of the accordion'
  )
  const [accorBody2, setAccorBody2] = useState(
    (component?.body?.content?.accordions && component?.body?.content?.accordions[1].body) || ''
  )
  const [accorBody3, setAccorBody3] = useState(
    (component?.body?.content?.accordions && component?.body?.content?.accordions[2].body) || ''
  )
  const schema = Yup.object().shape({
    accordions: Yup.array().optional(),
  })

  const initialValues = {
    accordions: component?.body?.content?.accordions ? component?.body?.content?.accordions : [],
  }
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleOnChange('content', {
        ...component.body.content,
        accordions: [
          {
            id: 1,
            title: accorTitle1,
            body: accorBody1,
          },
          {
            id: 2,
            title: accorTitle2,
            body: accorBody2,
          },
          {
            id: 3,
            title: accorTitle3,
            body: accorBody3,
          },
        ],
      })
      close(!show)
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
  let accordionFields = [
    {
      id: 1,
      field: 'Accordion 1 - ',
      title: accorTitle1,
      body: accorBody1,
      setTitle: setAccorTitle1,
      setBody: setAccorBody1,
    },
    {
      id: 2,
      field: 'Accordion 2 - ',
      title: accorTitle2,
      body: accorBody2,
      setTitle: setAccorTitle2,
      setBody: setAccorBody2,
    },
    {
      id: 3,
      field: 'Accordion 3 - ',
      title: accorTitle3,
      body: accorBody3,
      setTitle: setAccorTitle3,
      setBody: setAccorBody3,
    },
  ]
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
                {accordionFields?.map((item) => (
                  <div key={item.id} className='my-1 mx-1'>
                    <h5 className='text-muted'>{item.field}</h5>
                    <div className='d-flex flex-column'>
                      <input
                        type='text'
                        className={`form-control`}
                        placeholder={'Title'}
                        name={item.field}
                        defaultValue={item.title}
                        onChange={(e) => item.setTitle(e.target.value)}
                      />
                      <textarea
                        className='form-control my-2'
                        id='body'
                        rows='3'
                        defaultValue={item.body}
                        onChange={(e) => item.setBody(e.target.value)}
                        placeholder='Body'
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
              <div className='d-flex flex-column align-items-center'>
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
            </form>
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

export default AccordionModal

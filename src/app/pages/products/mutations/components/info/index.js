import {FieldArray} from 'formik'
import {useState} from 'react'
import {Button, Col, Modal} from 'react-bootstrap'
import FormDatalistField from '../../../../../modules/components/formik/fields/form-datalist-field'
import EditorHelper from '../../../../../modules/components/pageBuilder'

const AdditionalInfo = ({additional_info, setFieldValue}) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(null)

  const infoValue = {
    label: 'Sample Label',
    body: [],
  }
  const keyList = ['Overview', 'Specifications', 'Description']

  const handleOnChange = (data) => {
    let newInfo = [...additional_info]
    newInfo[active] = {
      ...newInfo[active],
      body: data,
    }
    setFieldValue('additional_info', newInfo)
  }

  return (
    <>
      <div className='d-flex flex-column'>
        <h5>Additional Info Section</h5>
        <span>share extra information about your product</span>
        <FieldArray
          name='additional_info'
          render={(arrayHelpers) => {
            return (
              <div>
                {additional_info && additional_info.length > 0 ? (
                  <>
                    <table className='table align-middle table-row-dashed fs-6 gy-1'>
                      <thead>
                        <tr>
                          <th className='text-center'>#</th>
                          <th>Label</th>
                          <th className='text-end w-100px'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {additional_info.map((info, i) => (
                          <tr key={'inf' + i}>
                            <td className='text-center'>{i + 1}</td>
                            <td>
                              <FormDatalistField
                                as={Col}
                                size='sm'
                                datalist={keyList}
                                controlId={`additional_info.${i}.label`}
                                label=''
                                type='text'
                                name={`additional_info.${i}.label`}
                              />
                            </td>
                            <td className='text-end'>
                              <Button
                                type='button'
                                variant='danger'
                                size='sm'
                                className='btn-icon'
                                onClick={() => arrayHelpers.remove(i)} // remove a friend from the list
                              >
                                <i className='fas fa-minus' />
                              </Button>
                              <Button
                                type='button'
                                variant='info'
                                size='sm'
                                className='btn-icon mx-2'
                                onClick={() => {
                                  setActive(i)
                                  setShow(true)
                                }} // remove a friend from the list
                              >
                                <i className='fas fa-pen-alt' />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className='text-end' colSpan={3}>
                            <Button
                              type='button'
                              variant='light-success'
                              size='sm'
                              onClick={() => arrayHelpers.push(infoValue)}
                            >
                              + Add
                            </Button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </>
                ) : (
                  <Button
                    type='button'
                    variant='light-primary'
                    size='sm'
                    onClick={() => arrayHelpers.push(infoValue)}
                  >
                    <i className='fas fa-plus'></i> Add Information
                  </Button>
                )}
              </div>
            )
          }}
        />
      </div>

      <Modal
        show={show}
        scrollable
        fullscreen
        centered
        onHide={() => setShow(false)}
        dialogClassName='modal-95w'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add an info section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditorHelper
            onChange={handleOnChange}
            value={additional_info && additional_info[active]?.body}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AdditionalInfo

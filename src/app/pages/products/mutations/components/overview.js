import {FieldArray} from 'formik'
import React, {useState} from 'react'
import {Button, Col, Modal} from 'react-bootstrap'
import FormDatalistField from '../../../../modules/components/formik/fields/form-datalist-field'
import EditorHelper from '../../../../modules/components/pageBuilder'
import {OnlyTooltip} from '../../../../modules/helper/misc'

const TechOverview = ({values, setFieldValue}) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(null)

  const infoValue = {
    label: 'Overview',
    body: [],
  }
  const keyList = ['Overview', 'Specifications', 'Gallery']

  const handleOnChange = (data) => {
    let newInfo = [...values.overview?.data]
    newInfo[active] = {
      ...newInfo[active],
      body: data,
    }
    setFieldValue('overview.data', newInfo)
  }
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>
            Technology Overview
            <OnlyTooltip tooltip='Set the product description page(eg. Mobile specification page).' />
          </h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <div className='row align-items-center'>
          <div className='col'>
            <label className='form-check form-switch form-check-custom form-check-solid '>
              <span className='form-check-label me-5'>External Overview</span>
              <input
                className='form-check-input'
                id='id-overview-url-enable'
                type='checkbox'
                name='overview.has'
                value=''
                checked={values.overview?.has}
                onChange={() => setFieldValue('overview.has', !values.overview?.has)}
              />
            </label>
          </div>
        </div>
        {values.overview?.has && (
          <div className='fv-row py-3'>
            <div className='btn-group'>
              <label className='btn btn-outline btn-color-muted btn-active-success'>
                <input className='btn-check' type='radio' name='method' value='1' />
                From URL
              </label>

              <label className='btn btn-outline btn-color-muted btn-active-success active'>
                <input
                  className='btn-check'
                  type='radio'
                  name='method'
                  checked='checked'
                  value='2'
                />
                Custom Page
              </label>
            </div>
            <div className='mt-2 border border-dashed rounded p-4'>
              <FieldArray
                name='overview.data'
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {values.overview?.data && values.overview?.data.length > 0 ? (
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
                              {values.overview?.data.map((info, i) => (
                                <tr key={'inf' + i}>
                                  <td className='text-center'>{i + 1}</td>
                                  <td>
                                    <FormDatalistField
                                      as={Col}
                                      size='sm'
                                      datalist={keyList}
                                      controlId={`overview.data.${i}.label`}
                                      label=''
                                      type='text'
                                      name={`overview.data.${i}.label`}
                                    />
                                  </td>
                                  <td className='text-end'>
                                    <Button
                                      type='button'
                                      variant='danger'
                                      size='sm'
                                      className='btn-icon'
                                      onClick={() => arrayHelpers.remove(i)}
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
                                      }}
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
                          <i className='fas fa-plus'></i> Add Section
                        </Button>
                      )}
                    </div>
                  )
                }}
              />
              <Modal
                show={show}
                scrollable
                fullscreen
                centered
                onHide={() => setShow(false)}
                dialogClassName='modal-95w'
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add an product overview section</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditorHelper
                    onChange={handleOnChange}
                    value={values.overview?.data[active]?.body}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TechOverview

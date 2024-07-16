import React, {FC, useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {GET_PRODUCT_VARIANTS_DELETED} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
type Props = {
  pid: any
}

const DeletedVariants: FC<Props> = ({pid}) => {
  const [attributes, setAttributes] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  useEffect(() => {
    getVariants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid])

  const getVariants = async () => {
    let res: any = {}
    res = await getQueryRequest(`${GET_PRODUCT_VARIANTS_DELETED}/${pid}`)

    if (res.success && res.status_code === 200) {
      setAttributes(res.data)
    }
  }

  return (
    <>
      <Button variant='light-danger' onClick={() => setShow(true)}>
        Deleted Variants
      </Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className=' w-100'>Deleted Variants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='table-responsive'>
            {attributes && attributes.length > 0 ? (
              <table className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer opacity-50'>
                <thead>
                  <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
                    <th className='text-left'>Variants</th>
                    <th className='text-center'>Price (৳)</th>
                    <th className='text-center'>Unit Sold</th>
                    <th className='text-center'>COMMITTED</th>
                    <th className='text-end'>Returned</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((at: any, i: any) => (
                    <tr key={i}>
                      <td className='text-start'>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                            <div className='symbol-label'>
                              <img src={at?.thumbnail.src} alt={''} className='w-100' />
                            </div>
                          </div>
                          <div className='d-flex gap-4'>
                            {at.option && at.option !== 'null' ? (
                              <div className='d-flex flex-column'>
                                {at.option === 'Variant' ? at.name : at.option}
                                <span className='fw-bold text-gray-400'>
                                  {at.value !== 'Default' ? at.value : ''}
                                </span>
                              </div>
                            ) : null}
                            {at.option2 && at.option2 !== 'null' ? (
                              <div className='d-flex flex-column'>
                                {at.option2}
                                <span className='fw-bold text-gray-400'>{at.value2}</span>
                              </div>
                            ) : null}
                            {at.option3 && at.option3 !== 'null' ? (
                              <div className='d-flex flex-column'>
                                {at.option3}
                                <span className='fw-bold text-gray-400'>{at.value3}</span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className='text-center'>{at.price.selling_price}</td>
                      {/* <td className='text-center'>{at.total_added}</td> */}
                      <td className='text-center'>{at.sold}</td>
                      <td className='text-center'>{at.committed}</td>
                      <td className='text-end'>{at.returned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='text-center py-3'>No Variant Deleted</div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeletedVariants

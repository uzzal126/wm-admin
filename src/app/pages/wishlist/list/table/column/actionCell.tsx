import {FC, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'

type Type = {
  user: any
}

const ActionCell: FC<Type> = ({user}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='light-success' size='sm' className='btn-icon' onClick={() => handleShow()}>
        <i className='fas fa-eye'></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className='flex-column justify-content-between d-flex'>
            <h5>{user.name}</h5>
            <span className='fs-7 text-muted'>SKU: {user.sku}</span>
          </div>
        </Modal.Header>
        <Modal.Body className='pt-2'>
          <h4>User List</h4>
          <table className='table align-middle table-row-dashed fs-6 gy-1 dataTable no-footer opacity-50'>
            <thead>
              <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
                <th className='text-left'>Name</th>
                <th className='text-center'>Mobile</th>
                <th className='text-center'>Email</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user?.customer &&
                user?.customer.length > 0 &&
                user?.customer.map((at: any, i: any) => (
                  <tr key={i}>
                    <td className='text-start'>{at.name}</td>
                    <td className='text-center'>{at.msisdn !== 'undefined' ? at.msisdn : ''}</td>
                    <td className='text-end'>{at.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ActionCell

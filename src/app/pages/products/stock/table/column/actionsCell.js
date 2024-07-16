import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {getStockHistory} from '../../core/_requests'

const ActionsCell = ({id, attrId}) => {
  const [show, setShow] = useState(false)
  const [historyData, setHistory] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = async () => {
    const prop = {
      id: id,
      attribute_id: attrId || 0,
    }
    const data = await getStockHistory(prop)
    if (data.success && data.status_code === 200) setHistory(data.data)
    setShow(true)
  }

  return (
    <>
      <button className='btn btn-primary btn-sm btn-icon' onClick={handleShow}>
        <i className='fas fa-eye'></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock Level Adjustments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='table-responsive'>
            <table className='table table-striped table-light p-5'>
              <thead>
                <tr>
                  <th className='pl-2'>Date</th>
                  <th>Description</th>
                  <th>Adjusted Quantity</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length > 0 &&
                  historyData.map((item, i) => (
                    <tr key={`hi-${i}`}>
                      <td className='pl-2'>{item?.updated_at}</td>
                      <td>{item?.description}</td>
                      <td>{item?.qty}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export {ActionsCell}

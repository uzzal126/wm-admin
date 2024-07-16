import {Fragment, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {Link} from '../../../../modules/helper/linkHandler'

const StockTable = ({data}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [stock, setStock] = useState({
    id: 0,
    attr_id: 0,
    quantity: 0,
  })

  const handlerStock = (e, id, attr) => {
    setStock({
      id: id,
      attr_id: attr || null,
      quantity: e.target.value,
    })
  }
  const submitStock = () => {
    // // console.log(stock)
  }
  return (
    <div className='table-responsive'>
      <table
        id='kt_profile_overview_table'
        className='table table-row-bordered mb-0 align-middle g-1'
      >
        <thead className='fs-7 text-gray-400 text-uppercase fw-bolder'>
          <tr>
            <th className=''>Product</th>
            <th className=''>Attributes</th>
            <th className=''>On Hand</th>
            <th className=''>Committed</th>
            <th className=''>Available to Sell</th>
            <th className='w-200px'>Add Stock</th>
            <th className='w-70px text-end'>Details</th>
          </tr>
        </thead>
        <tbody className='fs-6'>
          {data.length > 0
            ? data.map((prod, i) => (
                <Fragment key={i}>
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='me-5 position-relative'>
                          <div className='symbol symbol-50px symbol-circle'>
                            <img alt='Pic' src={prod.thumbnail} />
                          </div>
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                          <Link
                            to={`/products/edit/${prod.id}`}
                            className='fs-6 text-gray-800 text-hover-primary'
                          >
                            {prod.name}
                          </Link>
                          <div className='fw-bold text-gray-400'>ID: {prod.id}</div>
                        </div>
                      </div>
                    </td>
                    <td></td>
                    <td>{prod.on_hand}</td>
                    <td>{prod.commited}</td>
                    <td>{prod.available}</td>
                    <td>
                      {prod?.attributes.length <= 0 ? (
                        <div className='row'>
                          <div className='col'>
                            <input
                              type='number'
                              className='form-control form-control-sm'
                              onChange={(e) => handlerStock(e, prod.id)}
                              value={stock.id === prod.id ? stock.quantity : ''}
                            />
                          </div>
                          <div className='col-auto'>
                            <button
                              className='btn btn-icon btn-secondary btn-sm'
                              disabled={stock.id !== prod.id ? true : false}
                              onClick={submitStock}
                            >
                              <span className='indicator-label'>
                                <i className='fas fa-plus'></i>
                              </span>
                              <span className='indicator-progress'>
                                <span className='spinner-border spinner-border-sm align-middle'></span>
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </td>
                    <td className='text-end'>
                      {prod?.attributes.length <= 0 ? (
                        <button className='btn btn-primary btn-sm btn-icon' onClick={handleShow}>
                          <i className='fas fa-eye'></i>
                        </button>
                      ) : null}
                    </td>
                  </tr>
                  {prod?.attributes && prod?.attributes.length > 0
                    ? prod.attributes.map((at, a) => (
                        <tr key={a}>
                          <td></td>
                          <td>
                            {at.color !== '' ? 'Color: ' + at.color : ''}
                            {at.size !== '' ? ' Size: ' + at.size : ''}
                          </td>
                          <td>{at.on_hand}</td>
                          <td>{at.commited}</td>
                          <td>{at.available}</td>
                          <td>
                            <div className='row'>
                              <div className='col'>
                                <input
                                  type='number'
                                  className='form-control form-control-sm'
                                  onChange={(e) => handlerStock(e, prod.id, at.attribute_id)}
                                  value={stock.attr_id === at.attribute_id ? stock.quantity : ''}
                                />
                              </div>
                              <div className='col-auto'>
                                <button
                                  className='btn btn-icon btn-secondary btn-sm'
                                  disabled={stock.attr_id !== at.attribute_id ? true : false}
                                  onClick={submitStock}
                                >
                                  <span className='indicator-label'>
                                    <i className='fas fa-plus'></i>
                                  </span>
                                  <span className='indicator-progress'>
                                    <span className='spinner-border spinner-border-sm align-middle'></span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className='text-end'>
                            <button
                              className='btn btn-primary btn-sm btn-icon'
                              onClick={handleShow}
                            >
                              <i className='fas fa-eye'></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </Fragment>
              ))
            : null}
        </tbody>
      </table>
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
                <tr>
                  <td className='pl-2'>November 18th, 2021 15:35</td>
                  <td>Initial stock</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default StockTable

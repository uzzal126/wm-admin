import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import swal from 'sweetalert'
import {GET_PRODUCT_LIST} from '../../../../../../constants/api.constants'
import {assignProductsToCategory, getQueryRequest} from '../../../../../../library/api.helper'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const DatatableToolbar = ({category}) => {
  const {refetch} = useQueryResponse()
  const [show, setShow] = useState(false)
  const [sresults, setSresults] = useState([])
  const [selectedProducts, setProducts] = useState([])
  const [key, setKey] = useState('')

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const getData = async (key) => {
    setKey(key)
    if (key.length === 0) return

    const resp = await getQueryRequest(
      `${GET_PRODUCT_LIST}?page=1&items_per_page=999&status_id=1&search=${key}`
    )
    if (resp.success && resp.status_code === 200) {
      const ar = []
      for (let i = 0; i < resp.data.length; i++) {
        ar.push({...resp.data[i], checked: false})
      }
      setSresults(ar)
    } else {
      setSresults([])
    }
  }

  const handleSelectProduct = (id) => {
    if (!selectedProducts.includes(id)) {
      const ar = selectedProducts
      ar.push(id)
      setProducts(ar)
      const results = []
      for (let i = 0; i < sresults.length; i++) {
        if (sresults[i].id === id) {
          results.push({...sresults[i], checked: true})
        } else {
          results.push(sresults[i])
        }
      }
      setSresults(results)
    } else {
      const ar = []
      for (let i = 0; i < selectedProducts.length; i++) {
        if (id != selectedProducts[i]) {
          ar.push(selectedProducts[i])
        }
      }
      setProducts(ar)
      const results = []
      for (let i = 0; i < sresults.length; i++) {
        if (sresults[i].id === id) {
          results.push({...sresults[i], checked: false})
        } else {
          results.push(sresults[i])
        }
      }
      setSresults(results)
    }
  }

  const handleCheckAll = () => {
    const ar = []
    const results = []
    if (selectedProducts.length < sresults.length) {
      for (let i = 0; i < sresults.length; i++) {
        ar.push(sresults[i].id)
        results.push({...sresults[i], checked: true})
      }
    } else {
      for (let i = 0; i < sresults.length; i++) {
        results.push({...sresults[i], checked: false})
      }
    }
    setProducts(ar)
    setSresults(results)
  }

  const assignCategoryProducts = async () => {
    const resp = await assignProductsToCategory(
      parseInt(category.id) || parseInt(category.original.id),
      selectedProducts
    )
    if (resp.success) {
      swal('Success!', 'category products added successfully', 'success')
      refetch()
      setProducts([])
      handleClose()
    } else {
      swal('Sorry!', resp.message, 'error')
    }
  }
  return (
    <>
      <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
        <div className='d-flex justify-content-end' data-kt-docs-table-toolbar='base'>
          <button type='button' className='btn btn-light-primary' onClick={handleShow}>
            <i className='fas fa-plus'></i> Product
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        centered
        scrollable
        keyboard={false}
      >
        <Modal.Header closeButton className='py-2'>
          <div>
            <Modal.Title>
              <h5 className='modal-title'>Search Products</h5>
            </Modal.Title>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='mt-2 flex-grow-1'>
                <input
                  type='text'
                  className='form-control'
                  name=''
                  placeholder='Search Products'
                  value={key}
                  onChange={(e) => getData(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {sresults && sresults.length > 0 ? (
            <div className='table-responsive'>
              <table
                id='kt_product_search_table'
                className='table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder mb-0'
              >
                <thead className='fs-7 text-gray-400 text-uppercase'>
                  <tr>
                    <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='1'
                          data-kt-check='true'
                          data-kt-check-target='.widget-13-check'
                          checked={selectedProducts.length === sresults.length}
                          onChange={handleCheckAll}
                        />
                      </div>
                    </th>
                    <th className='min-w-100px'>PRODUCT</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody className='fs-6'>
                  {sresults.map((item, indx) => (
                    <tr key={indx}>
                      <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value='1'
                            data-kt-check='true'
                            data-kt-check-target='.widget-13-check'
                            checked={item.checked}
                            onChange={() => handleSelectProduct(item.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='me-5 position-relative'>
                            <div className='symbol symbol-50px symbol-circle'>
                              <img alt='Pic' src={item.thumbnail?.src} />
                            </div>
                          </div>
                          <div className='d-flex flex-column justify-content-center'>
                            <a
                              href='#'
                              className='fs-6 text-gray-800 text-hover-primary'
                              onClick={() => handleSelectProduct(item.id)}
                            >
                              {item.name}
                            </a>
                            <div className='fw-bold text-gray-400'>SKU: {item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.price?.min === item.price?.max
                          ? item.price?.min
                          : `${item.price?.min} - ${item.price?.max}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='mb-0 text-center text-danger'>No Product found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='dark' onClick={assignCategoryProducts}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export {DatatableToolbar}

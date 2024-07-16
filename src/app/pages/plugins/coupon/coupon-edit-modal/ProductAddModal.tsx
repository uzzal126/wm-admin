import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {GET_PRODUCT_LIST} from '../../../../constants/api.constants'
import {getQueryRequest} from '../../../../library/api.helper'

type Props = {
  setProductList: any
  disabled?: boolean
  productList: any[]
  refetch: any
}

const ProductAddModal = ({
  setProductList,
  disabled = false,
  productList,
  refetch = () => null,
}: Props) => {
  // const {refetch} = useQueryResponse()
  const [show, setShow] = useState(false)
  const [sresults, setSresults] = useState<any>([])
  const [selectedProducts, setProducts] = useState<any>([])
  const [key, setKey] = useState('')

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const getData = async (key: any) => {
    setKey(key)
    if (key.length === 0) return

    const resp = await getQueryRequest(
      `${GET_PRODUCT_LIST}?page=1&items_per_page=999&status_id=1&search=${key}`
    )
    if (resp.success && resp.status_code === 200) {
      const ar: any[] = []
      for (let i = 0; i < resp.data.length; i++) {
        ar.push({...resp.data[i], checked: false})
      }
      setSresults(ar)
    } else {
      setSresults([])
    }
  }

  const handleSelectProduct = (id: any) => {
    if (!selectedProducts.includes(id)) {
      const ar = selectedProducts
      ar.push(id?.toString())
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
        ar.push(sresults[i].id?.toString())
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

  return (
    <>
      <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
        <div className='d-flex justify-content-end' data-kt-docs-table-toolbar='base'>
          <button
            type='button'
            className={disabled ? 'btn btn-light' : 'btn btn-light-primary'}
            onClick={handleShow}
            disabled={disabled}
          >
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
        <Modal.Header
          closeButton
          className='py-2 shadow-xl'
          style={{
            background: '#f4f8fa',
            borderLeft: '1px solid #cccccc',
            borderTop: '1px solid #cccccc',
            borderRight: '1px solid #cccccc',
          }}
        >
          <div>
            {/* <Modal.Title>
              <h5 className='modal-title'>Search Products</h5>
            </Modal.Title> */}
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
        <Modal.Body
          style={{
            background: '#f4f8fa',
            borderLeft: '1px solid #cccccc',
            borderRight: '1px solid #cccccc',
          }}
          className='shadow-xl'
        >
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
                          className='form-check-input-coupon'
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
                  {sresults
                    .filter((f: any) => !productList.includes(f.id?.toString()))
                    .map((item: any, indx: number) => (
                      <tr key={indx}>
                        <td>
                          <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                              className='form-check-input-coupon'
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
                              <div
                                style={{cursor: 'pointer'}}
                                className='fs-6 text-gray-800 text-hover-primary'
                                onClick={() => handleSelectProduct(item.id)}
                              >
                                {item.name}
                              </div>
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
          ) : key.length !== 0 ? (
            <p className='mb-0 text-center text-danger'>No Product found</p>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            background: '#f4f8fa',
            borderLeft: '1px solid #cccccc',
            borderBottom: '1px solid #cccccc',
            borderRight: '1px solid #cccccc',
          }}
          className='shadow-xl'
        >
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='dark'
            onClick={() => {
              let prevArr = [...productList]
              setProductList([...prevArr, ...selectedProducts])
              refetch()
              handleClose()
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export {ProductAddModal}

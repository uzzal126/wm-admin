import {useEffect, useState} from 'react'
import {Button, Modal, Nav, Tab, Table} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {
  GET_COURIER_FEE,
  GET_COURIER_PARTNER,
  POST_COURIER_ACTIVE,
  POST_COURIER_ACTIVE_REQUEST,
} from '../../../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../../../library/api.helper'

const CourierRoot = () => {
  const navigate = useNavigate()
  const [courier, setCourier] = useState([])
  const [courierPrice, setCourierPrice] = useState([])
  const [show, setShow] = useState(false)

  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  useEffect(() => {
    getCourier()
  }, [])

  const getCourier = async () => {
    let res = await getQueryRequest(GET_COURIER_PARTNER)
    if (res.success && res.status_code === 200) {
      setCourier(res.data)
    }
  }

  const activeCourier = async (id) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to Active this courier`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const res = await queryRequest(POST_COURIER_ACTIVE, {courier_partner_id: id})
        // console.log(res)
        if (res.success && res.status_code === 200) {
          toast.success('Uninstall successfully')
          navigate('/marketing/courier/' + id)
        } else {
          toast.error(res.message)
        }
      }
    })
  }
  const requestToActive = async (id) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want request to Active this courier`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (dl) => {
      if (dl) {
        const res = queryRequest(POST_COURIER_ACTIVE_REQUEST, {courier_partner_id: id})
        if (res.success && res.status_code === 200) {
          if (res.success && res.status_code === 200) {
            // navigate('/marketing/courier/' + id)
          } else {
            toast.error(res.message)
          }
        }
      }
    })
  }

  const getPriceList = async () => {
    const res = await getQueryRequest(GET_COURIER_FEE)
    if (res.success && res.status_code === 200) {
      setCourierPrice(res.data)
      setShow(true)
    } else {
      toast.error(res.message)
    }
  }
  return (
    <>
      <div className='row row-cols-1 row-cols-lg-4'>
        {courier &&
          courier.length > 0 &&
          courier.map((item, i) => (
            <div className='col mb-6 position-relative' key={i}>
              <div className='position-absolute end-0 mt-1 me-4'>
                <Button variant='primary' size='sm' onClick={() => getPriceList()}>
                  Details
                </Button>
              </div>
              {item.is_active ? (
                <Link to={`/marketing/courier/${item.id}`}>
                  <div className='rounded-2 d-flex align-items-center min-h-150px w-100 shadow bg-white justify-content-center flex-column'>
                    <span className='mb-2'>
                      <img src={item.icon_url} alt='' className='img-fluid' />
                    </span>
                    <span className='fs-4 text-uppercase mt-0'>{item.name}</span>
                    <label className='cursor-pointer badge badge-success px-3 py-2 mt-2'>
                      Active
                    </label>
                  </div>
                </Link>
              ) : (
                <div className='rounded-2 d-flex align-items-center min-h-150px w-100 shadow bg-white justify-content-center flex-column'>
                  <span className='mb-2'>
                    <img src={item.icon_url} alt='' className='img-fluid' />
                  </span>
                  <span className='fs-4 text-uppercase mt-0'>{item.name}</span>
                  {item.status === null ? (
                    <button
                      className='btn btn btn-info btn-sm mt-2'
                      onClick={() => {
                        requestToActive(item.id)
                        getCourier()
                      }}
                    >
                      Request to Active
                    </button>
                  ) : item.status === 'accepted' ? (
                    <label
                      className='cursor-pointer badge badge-primary px-3 py-2 mt-2'
                      onClick={() => {
                        activeCourier(item.id)
                        getCourier()
                      }}
                    >
                      Active Now
                    </label>
                  ) : (
                    <label className='badge badge-warning px-3 py-2 mt-2'>{item.status}</label>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      <Modal show={show} scrollable size='lg' onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Pricing Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container id='tabs-pricing' defaultActiveKey='0'>
            <div className='mb-3'>
              <Nav variant='pills' className=''>
                {courierPrice &&
                  courierPrice.length > 0 &&
                  courierPrice.map((item, i) => (
                    <Nav.Item key={i}>
                      <Nav.Link eventKey={i} className='border border-primary'>
                        {item.location}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
              </Nav>
            </div>
            <div>
              <Tab.Content>
                {courierPrice &&
                  courierPrice.length > 0 &&
                  courierPrice.map((item, i) => (
                    <Tab.Pane eventKey={i} key={i}>
                      <Table striped bordered hover size='sm' className='text-center'>
                        <thead className='fw-bolder border-bottom'>
                          <tr>
                            <th>Delivery Time</th>
                            <th>0 gm to 1 Kilo</th>
                            <th>Additional per KG</th>
                            <th>COD Charge</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{item.location === 'Express Delivery' ? '12h' : '48h'}</td>
                            <td>{item.price_for_merchants_per_kg}</td>
                            <td>{item.additional_charge_per_kg}</td>
                            <td>{item.cash_on_delivery_percentage}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </div>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CourierRoot

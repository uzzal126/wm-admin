import {ListGroup, Modal, Table} from 'react-bootstrap'
import {check_date_expiry, dateUnixReadable} from '../../../../../modules/helper/misc'
import {TableModal} from '../../core/_models'
import {ImageCell} from './ImageCell'

type Props = {
  show: boolean
  setShow: any
  store: TableModal
}

function DetailsModal({show, setShow, store}: Props) {
  return (
    <Modal show={show} onHide={() => setShow(false)} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{`${store.domain} - ${store.country}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex flex-column align-item-center p-2'>
          <ImageCell store={store} />
        </div>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <i className='fas fa-envelope mx-2' />
            <span style={{fontWeight: 'bold'}}>Status:</span>
            <span
              style={{fontWeight: 'bold'}}
              className={store.publish_status === 'Published' ? 'text-success' : 'text-danger'}
            >
              {' '}
              {store.publish_status}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <i className='fas fa-globe mx-2' />
            <span style={{fontWeight: 'bold'}}>Language:</span>
            <span> {store.lang}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className='d-lg-flex flex-lg-row align-items-center d-block'>
              <div style={{marginRight: '2rem', minWidth: '200px'}}>
                <i className='fas fa-phone-square mx-2' />
                <span style={{fontWeight: 'bold'}}>Phone:</span>
                <span> {store.msisdn}</span>
              </div>
              <div>
                <i className='fas fa-envelope mx-2' />
                <span style={{fontWeight: 'bold'}}>E-Mail:</span>
                <span> {store.email}</span>
              </div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <i className='fas fa-address-book mx-2' />
            <span style={{fontWeight: 'bold'}}>Address:</span>
            <span> {store.business_address}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <i className='fas fa-briefcase mx-2' />
            <span style={{fontWeight: 'bold'}}>Category:</span>
            <span> {store.store_category}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className='d-lg-flex flex-lg-row align-items-center d-block'>
              <div style={{marginRight: '2rem', minWidth: '200px'}}>
                <i className='fas fa-calendar mx-2' />
                <span style={{fontWeight: 'bold'}}>Created at:</span>
                <span> {dateUnixReadable(store?.created_at, 'DD/MM/YY')}</span>
              </div>
              <div>
                <i className='fas fa-ban mx-2' />
                <span style={{fontWeight: 'bold'}}>Expiry Date:</span>
                <span
                  className={
                    check_date_expiry(store?.expire_time, Date.now() / 1000)
                      ? ''
                      : 'text-danger fw-bold'
                  }
                >
                  {' '}
                  {dateUnixReadable(store?.expire_time, 'DD/MM/YY')}
                </span>
              </div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <i className='fas fa-id-card mx-2' />
            <span style={{fontWeight: 'bold'}}>SID:</span>
            <span> {store?.sid}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <i className='fas fa-credit-card-alt mx-2' />
            <span style={{fontWeight: 'bold'}}>Payments:</span>
            {!store?.payments || !Array.isArray(store?.payments) ? (
              <span>No payments found ...</span>
            ) : (
              <></>
            )}
            <span>
              {' '}
              {store?.payments && Array.isArray(store?.payments) && store?.payments?.length > 0 && (
                <Table striped bordered hover>
                  <thead style={{fontWeight: 'bold'}}>
                    <tr>
                      <th>#</th>
                      <th>Created At</th>
                      <th>Payment Id</th>
                      <th>Trxn Id</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store?.payments?.map((item: any, index: number) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{dateUnixReadable(item?.created_at, 'DD/MM/YY')}</td>
                        <td>{item?.payment_id}</td>
                        <td>{item?.tran_id}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.payment_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}

export default DetailsModal

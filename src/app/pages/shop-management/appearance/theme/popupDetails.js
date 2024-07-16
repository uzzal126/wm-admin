import React from 'react'
import {Button, Carousel, Col, Modal, Row} from 'react-bootstrap'
import {betterParse} from '../../../../modules/helper/misc'

const PopupDetails = ({item}) => {
  const [show, setShow] = React.useState(false)
  let features = betterParse(item?.feature_list)

  return (
    <>
      <Button variant='primary' size='sm' className='ms-3' onClick={() => setShow(!show)}>
        <i className='fas fa-eye' />
      </Button>
      <Modal show={show} size='lg' centered onHide={() => setShow(!show)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{item.tittle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Carousel>
                {features?.sample_screen &&
                  features?.sample_screen?.length > 0 &&
                  features?.sample_screen?.map((item, index) => (
                    <Carousel.Item key={index}>
                      <img className='d-block w-100' src={item} alt='First slide' />
                    </Carousel.Item>
                  ))}
                {!features?.sample_screen && (
                  <Carousel.Item>
                    <img
                      className='d-block w-100'
                      src='https://dummyimage.com/720x580/c9c9c9/fff'
                      alt='First slide'
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </Col>
            <Col>
              <div className='theme-ac-text ms-8'>
                <h2 className='fs-4'>{item?.tittle}</h2>
                <p className='fs-6'>Price: {item?.price || 'Free'}</p>
                <h3>{features?.tittle}</h3>
                <ul className='list-group-flush ps-0 text-capitalize'>
                  {features &&
                    Object.keys(features?.data).length > 0 &&
                    Object.keys(features?.data).map((item, i) => (
                      <li className='list-group-item' key={i}>
                        <i className='fas fa-check me-3 text-success'></i> {features?.data[item]}
                      </li>
                    ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PopupDetails

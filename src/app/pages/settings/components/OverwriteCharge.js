import React, {useContext, useEffect, useState} from 'react'
import {Accordion, AccordionContext, Button, Card, Modal, useAccordionButton} from 'react-bootstrap'
import Select from 'react-select'
import {CITY_LIST, REGION_LIST} from '../../../constants/api.constants'
import {getQueryRequest} from '../../../library/api.helper'
import country from './data/countries.json'

const OverwriteCharge = ({handleClose}) => {
  const [countryList, setCountryList] = useState([])
  const [selectedCountryList, setSelectedCountryList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [city, setCity] = useState([])
  const [cityList, setCityList] = useState([])

  function ContextAwareToggle({item, eventKey, callback}) {
    const {activeEventKey} = useContext(AccordionContext)

    const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey))

    const isCurrentEventKey = activeEventKey === eventKey

    setCity(activeEventKey)

    return (
      <Card.Header
        onClick={decoratedOnClick}
        className={`min-h-50px px-4 cursor-pointer ${isCurrentEventKey ? 'bg-primary' : ''}`}
      >
        <h3 className='card-title'>{item?.title}</h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className={`btn btn-icon btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary w-30px h-30px ${
              isCurrentEventKey ? 'active' : ''
            }`}
            onClick={decoratedOnClick}
          >
            <i className={`fas fa-arrow-${isCurrentEventKey ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </Card.Header>
    )
  }
  useEffect(() => {
    getCityData(city)
  }, [city])

  useEffect(() => {
    if (country.length > 0) {
      let cl = []
      country.map((item) => {
        cl.push({
          ...item,
          label: item.name,
          value: item.code,
        })
      })
      setSelectedCountryList(cl.filter((f) => f.code === 'BD')[0])
      setCountryList(cl)
    }
    getData()
  }, [])

  const getData = async () => {
    const res = await getQueryRequest(REGION_LIST)
    if (res.success && res.status_code === 200) {
      setDistrictList(res.data)
    }
  }
  const getCityData = async (id) => {
    const res = await getQueryRequest(`${CITY_LIST}/${id}`)
    if (res.success && res.status_code === 200) {
      setCityList(res.data)
    }
  }

  return (
    <>
      <Modal.Body>
        <div className='d-flex flex-column mb-7 fv-row'>
          <label className='fs-6 fw-bold mb-2'>
            <span>Country</span>
            <i
              className='fas fa-exclamation-circle ms-1 fs-7'
              data-bs-toggle='tooltip'
              data-bs-custom-className='cs-tooltip'
              title='Country of origination'
            ></i>
          </label>
          <Select
            value={selectedCountryList}
            name='colors'
            options={countryList}
            className='multi-select mb-2'
            classNamePrefix='select'
            onChange={(e) => setSelectedCountryList(e)}
          />
        </div>
        <div className='mt-5 border border-dashed border-dark rounded p-4'>
          <h3>Adjust Shipping Rates for {selectedCountryList && selectedCountryList?.name}</h3>
          <Accordion>
            {districtList &&
              districtList.length > 0 &&
              districtList.map((item, i) => (
                <Card
                  key={`act-${i}`}
                  className='card-bordered'
                  border={`${item.id === city ? 'primary' : ''}`}
                >
                  <ContextAwareToggle eventKey={item.id} item={item}>
                    Click me!
                  </ContextAwareToggle>
                  <Accordion.Collapse eventKey={item.id}>
                    <Card.Body className='p-4'>
                      <div className='form-group row align-items-center mb-3'>
                        <div className='col'>
                          <label>1 KG Fee</label>
                          <input
                            type='text'
                            className='form-control mb-2 mb-md-0'
                            placeholder='Enter 1 KG Fee'
                          />
                        </div>
                        <div className='col'>
                          <label>2 KG Fee</label>
                          <input
                            type='text'
                            className='form-control mb-2 mb-md-0'
                            placeholder='Enter 2 KG Fee'
                          />
                        </div>
                        <div className='col'>
                          <label>3 KG Fee</label>
                          <input
                            type='text'
                            className='form-control mb-2 mb-md-0'
                            placeholder='Enter 3 KG Fee'
                          />
                        </div>
                        <div className='col'>
                          <label>5 KG Fee</label>
                          <input
                            type='text'
                            className='form-control mb-2 mb-md-0'
                            placeholder='Enter 5 KG Fee'
                          />
                        </div>
                      </div>
                      <div className='row row-cols-1 row-cols-lg-2 row-cols-xl-3'>
                        {cityList &&
                          cityList.length > 0 &&
                          item.id === city &&
                          cityList.map((ct, i) => (
                            <div className='col' key={i}>
                              <div className='shadow rounded p-4 mb-4'>
                                <h4 className='fs-5'>{ct.title}</h4>
                                <div className='separator mb-2'></div>
                                <div className='form-group row align-items-center mb-3'>
                                  <div className='col'>
                                    <label>1 KG Fee</label>
                                    <input
                                      type='text'
                                      className='form-control mb-2 mb-md-0'
                                      placeholder='Enter 1 KG Fee'
                                      value={ct['1kg_fee']}
                                    />
                                  </div>
                                  <div className='col'>
                                    <label>2 KG Fee</label>
                                    <input
                                      type='text'
                                      className='form-control mb-2 mb-md-0'
                                      placeholder='Enter 2 KG Fee'
                                      value={ct['2kg_fee']}
                                    />
                                  </div>
                                  <div className='col'>
                                    <label>3 KG Fee</label>
                                    <input
                                      type='text'
                                      className='form-control mb-2 mb-md-0'
                                      placeholder='Enter 3 KG Fee'
                                      value={ct['3kg_fee']}
                                    />
                                  </div>
                                  <div className='col'>
                                    <label>5 KG Fee</label>
                                    <input
                                      type='text'
                                      className='form-control mb-2 mb-md-0'
                                      placeholder='Enter 5 KG Fee'
                                      value={ct['5kg_fee']}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  )
}

export default OverwriteCharge

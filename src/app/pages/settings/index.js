import {useEffect, useState} from 'react'
import {Nav, Tab} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {toast} from 'react-toastify'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {Can} from '../../../_metronic/redux/ability'
import {GET_SETTING, UPDATE_SETTING} from '../../constants/api.constants'
import {getQueryRequest, queryRequest} from '../../library/api.helper'
import Checkout from './components/Checkout'
import General from './components/General'
import Payment from './components/Payment'
import Shipping from './components/Shipping'
import Tax from './components/Tax'
import DomainManagement from './components/domain'

const Settings = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const [data, setData] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getQueryRequest(GET_SETTING)
    if (res.success && res.status_code === 200) {
      setData(res.data)
    }
  }

  const updateSetting = async (post) => {
    const res = await queryRequest(UPDATE_SETTING, {
      shop_setting: post?.key_value || data?.key_value,
    })
    if (res.success && res.status_code === 200) {
      toast.success('Setting Updated successfully!')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      <PageTitle>Settings</PageTitle>
      <Tab.Container id='left-tabs-example' defaultActiveKey='tab-general'>
        <KTCard className='mb-4'>
          <KTCardBody className='settings-tab-bar'>
            <Nav variant='pills' className='nav nav-tabs nav-line-tabs fs-6'>
              <Can access='General Settings' group='settings'>
                <Nav.Item>
                  <Nav.Link className='text-active-primary' eventKey='tab-general'>
                    <span className='icon'>
                      <SVG src='/media/icons/svg/settings.svg' />
                    </span>
                    General Settings
                  </Nav.Link>
                </Nav.Item>
              </Can>
              {data?.store_info?.website_type === 'ecommerce' && (
                <>
                  <Can access='Checkout Settings' group='settings'>
                    <Nav.Item>
                      <Nav.Link className='text-active-primary' eventKey='tab-checkout'>
                        <span className='icon'>
                          <SVG src='/media/icons/svg/check.svg' />
                        </span>
                        Checkout Settings
                      </Nav.Link>
                    </Nav.Item>
                  </Can>

                  <Can access='Payment Methods' group='settings'>
                    <Nav.Item>
                      <Nav.Link className='text-active-primary' eventKey='tab-payment'>
                        <span className='icon'>
                          <SVG src='/media/icons/svg/payment.svg' />
                        </span>
                        Payment Methods
                      </Nav.Link>
                    </Nav.Item>
                  </Can>
                  <Can access='Shipping Methods' group='settings'>
                    <Nav.Item>
                      <Nav.Link className='text-active-primary' eventKey='tab-shipping'>
                        <span className='icon'>
                          <SVG src='/media/icons/svg/shipping.svg' />
                        </span>
                        Shipping Methods
                      </Nav.Link>
                    </Nav.Item>
                  </Can>
                </>
              )}
              {/* <Can access='Tax Methods' group='settings'>
                <Nav.Item>
                  <Nav.Link className='text-active-primary' eventKey='tab-tax'>
                    <span className='icon'>
                      <SVG src='/media/icons/svg/tax.svg' />
                    </span>
                    Tax Methods
                  </Nav.Link>
                </Nav.Item>
              </Can> */}
              <Nav.Item>
                <Nav.Link className='text-active-primary' eventKey='tab-domain'>
                  <span className='icon'>
                    <SVG src='/media/icons/svg/domain.svg' />
                  </span>
                  Domain Management
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </KTCardBody>
        </KTCard>

        <Tab.Content>
          <Tab.Pane eventKey='tab-general'>
            <General data={data} handleUpdate={updateSetting} setData={setData} />
          </Tab.Pane>
          <Tab.Pane eventKey='tab-checkout'>
            <Checkout data={data} handleUpdate={updateSetting} setData={setData} />
          </Tab.Pane>
          <Tab.Pane eventKey='tab-payment'>
            <Payment data={data} handleUpdate={updateSetting} setData={setData} />
          </Tab.Pane>
          <Tab.Pane eventKey='tab-shipping'>
            <Shipping data={data} handleUpdate={updateSetting} setData={setData} />
          </Tab.Pane>
          <Tab.Pane eventKey='tab-tax'>
            <Tax data={data} handleUpdate={updateSetting} setData={setData} />
          </Tab.Pane>
          <Tab.Pane eventKey='tab-domain'>
            <DomainManagement data={data} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  )
}

export default Settings

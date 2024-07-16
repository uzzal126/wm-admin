import {Nav, Tab} from 'react-bootstrap'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import PageToolbar from '../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {breadcrumbs} from '../components/helpers'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import PromotionalSender from './multipleSender'
import RegularSender from './singleSender'
import Template from './template'

const SMSSender = () => {
  const route = window.location.hash.substring(1) || 'sms'

  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('sender')}></PageToolbar>
      <Tab.Container id='left-tabs-example' activeKey={route}>
        <KTCard className='mb-4'>
          <div className='card-header align-items-center'>
            <Nav variant='pills' className='nav nav-tabs nav-line-tabs border-0 fs-6 mb-0'>
              <Nav.Item>
                <Nav.Link
                  className='text-active-primary'
                  eventKey='sms'
                  href='#sms'
                  // onClick={() => navigate('/marketing/sms-gateway/sender/sms')}
                >
                  Regular SMS
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className='text-active-primary'
                  eventKey='promotion'
                  href='#promotion'
                  // onClick={() => navigate('/marketing/sms-gateway/sender/promotion')}
                >
                  Promotional SMS
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className='text-active-primary'
                  eventKey='template'
                  href='#template'
                  // onClick={() => navigate('/marketing/sms-gateway/sender/template')}
                >
                  Template
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <KTCardBody>
            <Tab.Content activeKey={route}>
              <Tab.Pane eventKey='sms'>
                <RegularSender />
              </Tab.Pane>
              <Tab.Pane eventKey='promotion'>
                <PromotionalSender />
              </Tab.Pane>
              <Tab.Pane eventKey='template'>
                <Template />
              </Tab.Pane>
            </Tab.Content>
          </KTCardBody>
        </KTCard>
      </Tab.Container>
    </>
  )
}

const SMSSenderWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <SMSSender />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SMSSenderWrapper}

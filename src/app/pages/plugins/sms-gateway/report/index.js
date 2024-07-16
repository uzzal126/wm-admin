import {Nav, Tab} from 'react-bootstrap'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import PageToolbar from '../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {breadcrumbs} from '../components/helpers'
import {UsersListFilter} from './components/header/UsersListFilter'
import {UsersListSearchComponent} from './components/header/UsersListSearchComponent'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import RedeemedList from './redeemedList'

const SMSReport = () => {
  const route = window.location.hash.substring(1) || 'redeemed-sms'

  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('report')}></PageToolbar>
      <Tab.Container id='left-tabs-example' activeKey={route}>
        <KTCard className='mb-4'>
          <div className='card-header align-items-center'>
            <Nav variant='pills' className='nav nav-tabs nav-line-tabs border-0 fs-6 mb-0'>
              <Nav.Item>
                <Nav.Link
                  className='text-active-primary'
                  eventKey='redeemed-sms'
                  href='#redeemed-sms'
                >
                  Redeemed SMS
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div
              className='d-flex align-items-center '
              style={{justifyContent: 'flex-end', alignItems: 'center'}}
            >
              <UsersListSearchComponent />
              <div className='card-toolbar'>
                <div className='d-flex justify-content-end ms-2' data-kt-user-table-toolbar='base'>
                  <UsersListFilter />
                </div>
              </div>
            </div>
          </div>
          <KTCardBody>
            <Tab.Content activeKey={route}>
              <Tab.Pane eventKey='redeemed-sms'>
                <RedeemedList />
              </Tab.Pane>
            </Tab.Content>
          </KTCardBody>
        </KTCard>
      </Tab.Container>
    </>
  )
}

const SMSReportWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <SMSReport />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export default SMSReportWrapper

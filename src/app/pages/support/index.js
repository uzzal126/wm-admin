import {Tab} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'

const SupportPage = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const copyToClipboard = (textToCopy, message = 'Text copied') => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => toast.success(message))
      .catch((err) => toast.error('Error in copying text: ', err))
  }

  return (
    <>
      <PageTitle>Support</PageTitle>
      <Tab.Container id='left-tabs-example' defaultActiveKey='tab-general'>
        <KTCard className='mb-4'>
          <KTCardBody className='settings-tab-bar'>
            <div className='container mt-5 d-flex flex-column align-items-center'>
              <div className='column'>
                <div
                  className='col-12 col-md-4 mb-3'
                  style={{minWidth: '280px'}}
                  onClick={() => copyToClipboard('+8801709654229', 'Phone No. copied')}
                >
                  <a href='tel:+8801709654229' rel='noreferrer'>
                    <button className='btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center w-100 py-5'>
                      <i className='fas fa-phone-square' style={{fontSize: 20}} />
                      +8801709654229
                    </button>
                  </a>
                </div>
                <div className='col-12 col-md-4 mb-3' style={{minWidth: '280px'}}>
                  <a
                    href='https://api.whatsapp.com/send?phone=8801709654229'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <button className='btn btn-success btn-lg btn-block d-flex align-items-center justify-content-center w-100 py-5'>
                      <i className='fa-brands fa-square-whatsapp' style={{fontSize: 21}} />
                      +8801709654229
                    </button>
                  </a>
                </div>
                <div
                  className='col-12 col-md-4 mb-3'
                  style={{minWidth: '280px'}}
                  onClick={() => copyToClipboard('support@webmanza.com', 'Email copied')}
                >
                  <a href='mailto:support@webmanza.com' rel='noreferrer'>
                    <button className='btn btn-danger btn-lg btn-block d-flex align-items-center justify-content-center w-100 py-5'>
                      <i className='fas fa-envelope' style={{fontSize: 18}} />
                      support@webmanza.com
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </KTCardBody>
        </KTCard>
      </Tab.Container>
    </>
  )
}

export default SupportPage

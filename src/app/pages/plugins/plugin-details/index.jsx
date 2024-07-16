import {useEffect, useState} from 'react'
import {Accordion, Nav, Tab} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {GET_MARKETING_TOOLS, POST_INSTALL_TOOLS} from '../../../constants/api.constants'
import {useMarketingTools} from '../../../hooks/useMarketingTools'
import {getQueryRequest, queryRequest} from '../../../library/api.helper'
import {Link} from '../../../modules/helper/linkHandler'
import PopupHandlerCopy from '../root/PopupHandlerCopy'

const PluginDetailsPage = () => {
  const [campTools, setCampaignTools] = useState({})
  const {updateMarketingTools} = useMarketingTools()

  const {id} = useParams()

  const PageBack = [
    {
      title: 'Back Marketing',
      path: '/marketing',
    },
  ]

  const getData = async () => {
    const res = await getQueryRequest(GET_MARKETING_TOOLS)
    if (res.success && res.status_code === 200) {
      const pluginData = res?.data.find((plugin) => String(plugin.id) === id)

      if (pluginData) {
        setCampaignTools(pluginData)
        updateMarketingTools([pluginData])
      }
    }
  }

  useEffect(() => {
    getData()
  }, [id, campTools.installation_status])

  const refatch = (data) => {
    setCampaignTools(data)
    updateMarketingTools(data || [])
  }

  const handleOnInstall = async (e) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to install ${e.title} tools`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await queryRequest(POST_INSTALL_TOOLS, {tool_id: e.id})
        if (res.success && res.status_code === 200) {
          setCampaignTools(res.data)
          updateMarketingTools(res.data || [])
          toast.success('Marketing tool is installed successfully!')
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  return (
    <>
      <PageTitle backLink={PageBack}>{campTools?.title} Details</PageTitle>
      <KTCard className='plugin-details'>
        <KTCardBody>
          <div className='plugin-details--header'>
            <div className='plugin-details--header-left'>
              <div className='icon'>
                <SVG src={campTools.icon} />
              </div>
              <div className='short-content'>
                <h2 className='title'>{campTools.title || 'Facebook Pixel'}</h2>
                <p className='desc'>
                  {campTools?.details?.description ||
                    'Enhance success! Understand, track, and optimize ads effortlessly for superior results.'}
                </p>
              </div>
            </div>
            <div className='plugin-details--header-right d-flex flex-wrap'>
              <div className='install-group'>
                {campTools.installation_status && !campTools.popup ? (
                  <Link
                    to={`/marketing/${campTools.route}`}
                    state={campTools}
                    className='plugin-install-btn plugin-settings-btn'
                  >
                    <span className='icon'>
                      <SVG src='/media/icons/settings.svg' />
                    </span>
                    Settings
                  </Link>
                ) : campTools.installation_status && campTools.popup ? (
                  <PopupHandlerCopy refatch={refatch} item={campTools} />
                ) : (
                  <button
                    className='plugin-install-btn'
                    style={{cursor: 'pointer'}}
                    onClick={(e) => {
                      e.preventDefault()
                      handleOnInstall(campTools)
                    }}
                  >
                    Install Plugin
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='plugin-banner'>
            <img
              src={campTools?.banner || '/media/plugins/plugin-banner.png'}
              alt={campTools?.title}
            />
          </div>
          <div className='plugin-details-tab'>
            <Tab.Container id='left-tabs-example' defaultActiveKey='tab-descriptions'>
              <Nav variant='pills' className='nav nav-tabs nav-plugin-tabs fs-6'>
                <Nav.Item>
                  <Nav.Link className='text-active-primary' eventKey='tab-descriptions'>
                    Descriptions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='text-active-primary' eventKey='tab-features'>
                    Features
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='text-active-primary' eventKey='tab-guideline'>
                    Installation Guideline
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='text-active-primary' eventKey='tab-faq'>
                    FAQ
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className='plugin-details-content'>
                <Tab.Content>
                  <Tab.Pane eventKey='tab-descriptions'>
                    <p>{campTools?.details?.description || 'No data found!'}</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey='tab-features'>
                    <ul className='plugin-feature-list ps-0'>
                      {campTools?.details?.features.map((feat, index) => (
                        <li key={index}>{feat}</li>
                      )) || 'No data found!'}
                    </ul>
                  </Tab.Pane>
                  <Tab.Pane eventKey='tab-guideline'>
                    <ul className='plugin-guideline-list'>
                      {campTools?.details?.installationguideline?.map((feat, index) => (
                        <li key={index}>{feat}</li>
                      )) || 'No data found!'}
                    </ul>
                  </Tab.Pane>
                  <Tab.Pane eventKey='tab-faq'>
                    <div className='plugin-faq-wrapper'>
                      <Accordion defaultActiveKey={'0'}>
                        {campTools?.details?.faq.map((faq, index) => (
                          <Accordion.Item eventKey={`${index}`} key={index}>
                            <Accordion.Header>
                              <span className=''>{faq.question}</span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <p>{faq.answer}</p>
                            </Accordion.Body>
                          </Accordion.Item>
                        )) || 'No data found!'}
                      </Accordion>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}
export default PluginDetailsPage

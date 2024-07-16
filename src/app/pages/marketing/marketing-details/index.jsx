import {Accordion, Nav, Tab} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'

const MarketingDetailsPage = () => {
  return (
    <>
      <PageTitle>Marketing Details</PageTitle>
      <KTCard className='plugin-details'>
        <KTCardBody>
          <div className='plugin-details--header'>
            <div className='plugin-details--header-left'>
              <div className='icon'>
                <SVG src='/media/plugins/facebook.svg' />
              </div>
              <div className='short-content'>
                <h2 className='title'>Facebook Pixel</h2>
                <p className='desc'>
                  Enhance success! Understand, track, and optimize ads effortlessly for superior
                  results.
                </p>
              </div>
            </div>
            <div className='plugin-details--header-right d-flex flex-wrap'>
              {/* <div className="settings-group d-flex align-items-center">
                  <button className="plugin-uninstall-btn">Uninstall Plugin</button>
                  <button className="plugin-install-btn d-flex align-items-center">
                    <span className="icon me-2">
                      <SVG src="/media/icons/svg/settings.svg" />
                    </span>
                    settings
                  </button>
                </div> */}
              <div className='install-group'>
                <button className='plugin-install-btn'>Install Plugin</button>
              </div>
            </div>
          </div>
          <div className='plugin-banner'>
            <img src='/media/plugins/plugin-banner.png' alt='plugin name' />
          </div>
          <div className='plugin-details-tab'>
            <Tab.Container id='left-tabs-example' defaultActiveKey='tab-faq'>
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
                    <p>
                      Facebook pixel is a piece of code that you put on your website that allows you
                      to measure the effectiveness of your advertising by understanding the actions
                      people take on your website. Examples of actions include adding an item to
                      their shopping basket or making a purchase. You can then reach out to those
                      customers again in the future through Facebook ads.
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey='tab-features'>
                    <ul className='plugin-feature-list'>
                      <li>
                        Make sure that your ads are shown to the right people. Find new customers or
                        people who have visited a specific page or taken a desired action on your
                        website.
                      </li>
                      <li>
                        Drive more sales. Set up automatic bidding to reach people who are more
                        likely to take any action that you care about, such as making a purchase.
                      </li>
                      <li>
                        Measure the results of your ads. Better understand the impact of your ads by
                        measuring what happens when people see them.
                      </li>
                    </ul>
                  </Tab.Pane>
                  <Tab.Pane eventKey='tab-guideline'>
                    <ul className='plugin-guideline-list'>
                      <li>
                        In order to start capturing audience data through Link Manager, you need to
                        setup pixels for each of your advertising platforms. In order to find your
                        Pixel ID for Facebook, follow the instructions below:
                        <ol type='a'>
                          <li>
                            To start using Facebook Pixel, log in to your Facebook Ads Manager
                          </li>
                          <li>
                            Once logged in, click on All Tools located in the left navigation bar
                          </li>
                          <li>Select Events Manager</li>
                          <li>Copy the Pixel ID from the dashboard</li>
                          <li>Now, Install the Facebook Pixel plugin on WebManza</li>
                          <li>Click on Settings and it’ll ask for Facebook Analytics Pixel ID</li>
                          <li>Paste the Pixel ID here to complete the installation</li>
                        </ol>
                      </li>
                    </ul>
                  </Tab.Pane>
                  <Tab.Pane eventKey='tab-faq'>
                    <div className='plugin-faq-wrapper'>
                      <Accordion defaultActiveKey={'1'}>
                        <Accordion.Item eventKey='0'>
                          <Accordion.Header>
                            <span className=''>What is Facebook Pixel?</span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>
                              The Facebook pixel is an analytics tool that allows you to measure the
                              effectiveness of your advertising by understanding the actions people
                              take on your website. You can use the pixel to - make sure that your
                              ads are shown to the right people, drive more sales, and measure the
                              results of ads
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2'>
                          <Accordion.Header>
                            <span className=''>
                              How to install Facebook Pixel to my online store?
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>
                              The Facebook pixel is an analytics tool that allows you to measure the
                              effectiveness of your advertising by understanding the actions people
                              take on your website. You can use the pixel to - make sure that your
                              ads are shown to the right people, drive more sales, and measure the
                              results of ads
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3'>
                          <Accordion.Header>
                            <span className=''>How to change or remove the Facebook Pixel?</span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <p>
                              The Facebook pixel is an analytics tool that allows you to measure the
                              effectiveness of your advertising by understanding the actions people
                              take on your website. You can use the pixel to - make sure that your
                              ads are shown to the right people, drive more sales, and measure the
                              results of ads
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
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
export default MarketingDetailsPage

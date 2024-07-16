import {FC, useContext} from 'react'
import {Accordion, AccordionContext, useAccordionButton} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {Can} from '../../../_metronic/redux/ability'
import CustomerReport from './customer'
import Finance from './finance'
import {reportMenus} from './helper/navbar'
import StockReport from './stock'
import ReportReport from './visitor'

type cpmProps = {
  children?: any
  eventKey?: any
  callback?: any
}

const CustomToggle: FC<cpmProps> = ({children, eventKey, callback}) => {
  //   const decoratedOnClick = useAccordionButton(eventKey, () => // console.log('totally custom!'))
  const {activeEventKey} = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey))

  const isCurrentEventKey = activeEventKey === eventKey
  return (
    <div
      className={`fs-2 ${isCurrentEventKey ? 'pb-2 border-bottom mb-3' : ''}`}
      style={{
        transition: 'all .3s',
      }}
    >
      <h4
        className={`d-flex justify-content-between align-items-center mb-0 cursor-pointer ${
          isCurrentEventKey ? 'text-dark' : 'text-gray-600'
        }`}
        onClick={decoratedOnClick}
      >
        <span>{children}</span>
        <i className={`fas fa-arrow-${isCurrentEventKey ? 'up' : 'down'}`} />
      </h4>
    </div>
  )
}

const ReportLayout = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  let params = useParams()
  let slug = params['*']

  return (
    <div>
      <KTCard>
        <KTCardBody>
          <Accordion
            flush
            defaultActiveKey='0'
            className='row row-cols-2 row-cols-md-4 row-cols-xl-6'
          >
            {reportMenus &&
              reportMenus.length > 0 &&
              reportMenus.map((item, i) => (
                <Can access={item.slug} group='reports' key={i}>
                  <div className='col'>
                    <CustomToggle eventKey='0'>{item.label}</CustomToggle>
                    <Accordion.Collapse eventKey='0'>
                      <div>
                        {item.children &&
                          item.children.length > 0 &&
                          item.children.map((child, j) => (
                            <Can access={child.route} group='reports' key={j}>
                              <div className='d-flex flex-column'>
                                <Link
                                  to={`/reports/` + child.route}
                                  className={`d-flex align-items-center text-muted border border-transparent mb-1 rounded 
                          border-hover-primary border-active-primary px-2 py-1 menu-link text-active-primary text-hover-primary ${
                            slug?.includes(child.route) ? 'active' : ''
                          }`}
                                >
                                  <span
                                    className={`bullet me-3 ${
                                      slug?.includes(child.route) ? 'bg-primary' : ''
                                    }`}
                                  ></span>
                                  {child.label}
                                </Link>
                              </div>
                            </Can>
                          ))}
                      </div>
                      {/* </Accordion.Body> */}
                    </Accordion.Collapse>
                  </div>
                </Can>
              ))}
          </Accordion>
        </KTCardBody>
      </KTCard>
      <div className='my-5'>
        {slug?.includes('finance') && <Finance slug={slug} />}
        {slug?.includes('inventory') && <StockReport slug={slug} />}
        {slug?.includes('statistics') && <CustomerReport slug={slug} />}
        {slug?.includes('analytics') && <ReportReport slug={slug} />}
      </div>
    </div>
  )
}

export default ReportLayout

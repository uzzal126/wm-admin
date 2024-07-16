import moment from 'moment'
import {useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import {KTCard} from '../../../../_metronic/helpers'
import DateRangeMaker from '../../../../_metronic/partials/content/forms/dateRangePicker'
import {reportMenus} from '../helper/navbar'
import CountryWise from './components/countryWise'
import PageView from './components/pageView'
import RegionWise from './components/regionWise'
import OrganicSessions from './components/sessions'
import CountryWiseReport from './country'
import VisitorByDevice from './device'
import VisitorByPage from './page'

const VisitorReport = () => {
  let params = useParams()
  let menu = reportMenus && reportMenus.length > 2 && reportMenus[2]
  let menuItem = menu.children.filter((f) => f.route === params['*'])

  const [date, setDate] = useState({
    start_date: moment(new Date()).format('yyyy-MM-DD'),
    end_date: moment(new Date()).format('yyyy-MM-DD'),
    selected: {
      label: 'Today',
      custom: false,
    },
  })

  return (
    <>
      <KTCard>
        <div className='card-header'>
          <div className='card-title flex-column'>
            <h3 className='fw-bolder mb-1'>
              {menuItem && menuItem.length > 0 && menuItem[0].label}
            </h3>
          </div>
          <div className='card-toolbar'>
            <DateRangeMaker onChange={(e) => setDate(e)} hideTitle />
          </div>
        </div>
      </KTCard>
      <Row>
        <Col lg='7'>
          <CountryWise date={date} />
          <RegionWise date={date} />
        </Col>
        <Col lg='5'>
          <div className='mb-5'>
            <OrganicSessions date={date} />
          </div>
          <div className='mb-5'>
            <PageView date={date} />
          </div>
        </Col>
      </Row>
    </>
  )
}

export {VisitorReport}

const ReportReport = ({slug}) => {
  return (
    <>
      {slug.includes('analytics/visitors') && <VisitorReport />}
      {slug.includes('analytics/location') && <CountryWiseReport />}
      {slug.includes('analytics/page') && <VisitorByPage />}
      {slug.includes('analytics/device') && <VisitorByDevice />}
    </>
  )
}

export default ReportReport

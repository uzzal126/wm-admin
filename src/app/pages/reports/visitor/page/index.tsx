import moment from 'moment'
import {useState} from 'react'
import {KTCard} from '../../../../../_metronic/helpers'
import {BackLink, PageTitle} from '../../../../../_metronic/layout/core'
import DateRangeMaker from '../../../../../_metronic/partials/content/forms/dateRangePicker'
import PageView from '../components/pageView'
const PageBack: Array<BackLink> = [
  {
    title: 'Back',
    path: '/reports/analytics/visitors',
  },
]
const VisitorByPage = ({hideTitle = false}) => {
  const [date, setDate] = useState<any>({
    start_date: moment(new Date()).format('yyyy-MM-DD'),
    end_date: moment(new Date()).format('yyyy-MM-DD'),
    selected: {
      label: 'Today',
      custom: false,
    },
  })

  return (
    <>
      {!hideTitle && <PageTitle backLink={PageBack}>By Pages</PageTitle>}
      <KTCard>
        <div className='card-header'>
          <div className='card-title flex-column'>
            <h3 className='fw-bolder mb-1'>Visitors By Page</h3>
          </div>
          <div className='card-toolbar'>
            <DateRangeMaker onChange={(e: any) => setDate(e)} hideTitle />
          </div>
        </div>
      </KTCard>
      <PageView date={date} fullPage />
    </>
  )
}

export default VisitorByPage

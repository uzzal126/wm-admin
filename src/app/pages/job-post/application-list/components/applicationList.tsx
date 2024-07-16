import {Fragment, useMemo, useState} from 'react'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import BodyLeft from './applicant-list/card/bodyLeft'
import CardRight from './applicant-list/card/bodyRight'
import CardHeader from './applicant-list/card/header'
import JobDetails from './job-details'

export default function ApplicantList() {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const response = useQueryResponseData()
  const applications = response?.data || []
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => applications, [applications])

  const [selected, setSelected] = useState<any>(0)

  return (
    <Fragment>
      <JobDetails />
      <div className='row gy-5 g-xl-10'>
        <div className='col-xl-4 mb-4'>
          <div className='card card-flush h-xl-100'>
            <CardHeader applications={data?.length} />
            <BodyLeft
              data={data}
              isLoading={isLoading}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>
        <div className='col-xl-8 mb-5'>
          <div className='card card-flush h-xl-100'>
            <CardRight application={data[selected]} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

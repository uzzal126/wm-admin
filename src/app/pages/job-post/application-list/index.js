import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import ApplicantList from './components/applicationList'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'

const applicationBreadCrumbs = []

const ApplicationList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const {job} = useParams()
  const {state, updateState} = useQueryRequest()

  useEffect(() => {
    updateState({
      ...state,
      slug: job,
    })
  }, [job])

  return (
    <>
      <PageToolbar breadcrumbs={applicationBreadCrumbs}>{/* <TableHeader /> */}</PageToolbar>
      <ApplicantList />
    </>
  )
}

const ApplicationWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ApplicationList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ApplicationWrapper}

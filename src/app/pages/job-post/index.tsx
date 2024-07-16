import {useSelector} from 'react-redux'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {BackLink, PageTitle} from '../../../_metronic/layout/core'
import {RootState} from '../../../_metronic/redux/store'
import {ErrorMessagesInPage} from '../../modules/errors/ErrorMessage'
import {ApplicationWrapper} from './application-list'
import {JobWrapper} from './job-list'
import PostAddEdit from './mutations/addEdit'

export const JobPageBack: Array<BackLink> = [
  {
    title: 'Back Jobs',
    path: '/career/jobs/index',
  },
]

const Jobs = () => {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []
  let jobPosts =
    (userPermission && userPermission.filter((f: any) => f.group_route.includes('jobs'))) || []
  jobPosts = jobPosts.length > 0 ? jobPosts[0] : {}

  const jobPostRoutes =
    Object.keys(jobPosts).length > 0 ? jobPosts.permissions.filter((f: any) => f.route !== '') : []

  return (
    <Routes>
      {jobPostRoutes.length > 0 && (
        <Route element={<Outlet />}>
          <Route
            path='index'
            element={
              <>
                <PageTitle>Job Posts</PageTitle>
                <JobWrapper />
              </>
            }
          />
          <Route
            path=':job/applicants'
            element={
              <>
                <PageTitle backLink={JobPageBack}>Applicants</PageTitle>
                <ApplicationWrapper />
              </>
            }
          />
          <Route
            path=':job/applicants/:application'
            element={
              <>
                <PageTitle>Applicants</PageTitle>
                <ApplicationWrapper />
              </>
            }
          />
          <Route
            path='add'
            element={
              <>
                <PageTitle backLink={JobPageBack}>Add New Job Post</PageTitle>
                <PostAddEdit />
              </>
            }
          />
          {/* {jobPostRoutes.find((f: any) => f.route.includes('edit')) && ( */}
          <Route
            path='edit/:slug'
            element={
              <>
                <PageTitle backLink={JobPageBack}>Edit Job</PageTitle>
                <PostAddEdit />
              </>
            }
          />
          {/* )} */}
        </Route>
      )}
      <Route
        path='/*'
        element={
          <>
            <PageTitle backLink={JobPageBack}>Page not Found</PageTitle>
            <ErrorMessagesInPage errors='' />
          </>
        }
      />
      <Route index element={<Navigate to='/career/jobs/index' />} />
    </Routes>
  )
}

export default Jobs

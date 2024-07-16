import { KTCard } from '../../../../_metronic/helpers'
import PageToolbar from '../../../../_metronic/layout/components/toolbar/PageToolbar'
import { ListViewProvider } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { JobDataTable } from './table/DataTable'
import { TableHeader } from './table/TableHeader'

const profileBreadCrumbs = [
  {
    title: 'Add Job Post',
    path: '/career/jobs/add',
    activeClasses: '',
    classes: 'btn-light-primary',
    icon: 'fas fa-plus',
    modal: false,
    isActive: false,
    access: null,
    group: 'jobs',
  },
]

const JobList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  return (
    <>
      <PageToolbar breadcrumbs={profileBreadCrumbs}>
        <TableHeader />
      </PageToolbar>
      <KTCard>
        <JobDataTable />
      </KTCard>
    </>
  )
}

const JobWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <JobList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { JobWrapper }


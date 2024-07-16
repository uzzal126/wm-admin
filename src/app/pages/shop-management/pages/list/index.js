import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import PageToolbar from '../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const profileBreadCrumbs = [
  {
    title: 'New Page',
    path: '/appearance/pages/new',
    activeClasses: '',
    classes: 'btn-light-info',
    icon: 'fas fa-plus',
    isActive: false,
  },
]

const Pages = () => {
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
        <KTCardBody>
          <DataTable />
        </KTCardBody>
      </KTCard>
    </>
  )
}

const AllPages = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Pages />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {AllPages}

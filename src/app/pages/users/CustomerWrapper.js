
import { TableHeader } from './table/TableHeader'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { ProdutDataTable } from './table/DataTable'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { ListViewProvider, useListView } from './core/ListViewProvider'
import PageToolbar from '../../../_metronic/layout/components/toolbar/PageToolbar'
import { KTCard } from '../../../_metronic/helpers'
import { UserEditModal } from './user-edit-modal/UserEditModal'

const profileBreadCrumbs = [
]

const CustomerList = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 55px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;';
    document.body.setAttribute('style', bodyStyles);
    const {itemIdForUpdate} = useListView()
    return (
        <>
            <PageToolbar breadcrumbs={profileBreadCrumbs}>
                <TableHeader />
            </PageToolbar>
            <KTCard>
                <ProdutDataTable />
            </KTCard>
            {itemIdForUpdate !== undefined && <UserEditModal />}
        </>
    )
}

const CustomerWrapper = () => (
    <QueryRequestProvider>
        <QueryResponseProvider>
            <ListViewProvider>
                <CustomerList />
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export { CustomerWrapper }
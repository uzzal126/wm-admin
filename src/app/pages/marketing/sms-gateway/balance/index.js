import {useMemo, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../../_metronic/helpers'
import PageToolbar from '../../../../../_metronic/layout/components/toolbar/PageToolbar'
import {breadcrumbs} from '../components/helpers'
import {UsersListFilter} from './components/header/UsersListFilter'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponseData} from './core/QueryResponseProvider'
import ReportSummaryCard from './partials/ReportSummary'
import {PurchaseList} from './table/DataTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'

const SMSBalance = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const [show, setShow] = useState(false)

  const purchases = useQueryResponseData()
  const data = useMemo(() => purchases, [purchases])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()

  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }
  return (
    <>
      <PageToolbar breadcrumbs={breadcrumbs('balance')}></PageToolbar>
      <KTCard>
        <KTCardBody>
          <div className='table-responsive'>
            <div className='text-end pb-5'>
              <UsersListFilter />
              <button
                type='button'
                className='btn btn-sm btn-light-primary'
                onClick={openAddUserModal}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Recharge
              </button>
            </div>
            {/* <KTCard> */}
            <ReportSummaryCard />
            <PurchaseList />
            {/* </KTCard> */}
          </div>
        </KTCardBody>
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const SMSBalanceWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <SMSBalance />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export default SMSBalanceWrapper

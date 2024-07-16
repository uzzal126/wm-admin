import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {CouponEditModal} from './coupon-edit-modal/CouponEditModal'
import {CouponDataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const CouponList = () => {
  const {itemIdForUpdate} = useListView()

  return (
    <div className='card card-flush'>
      <div className='card-header'>
        <h1 className='card-title'>All Coupons</h1>
        <div className='card-toolbar'>
          <TableHeader />
          {/* <button type="button" className="btn btn-light-primary">
                        Add Coupon
                    </button> */}
        </div>
      </div>
      <CouponDataTable />
      {itemIdForUpdate !== undefined && <CouponEditModal />}
    </div>
  )
}

const CouponIndex = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CouponList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export default CouponIndex

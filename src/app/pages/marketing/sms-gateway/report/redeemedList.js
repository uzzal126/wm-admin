import {KTCard} from '../../../../../_metronic/helpers'
import ReportSummaryCard from './partials/ReportSummary'
import {PurchaseList} from './table/DataTable'

export default function RedeemedList() {
  return (
    <div className='table-responsive'>
      <KTCard>
        <ReportSummaryCard />
        <PurchaseList />
      </KTCard>
    </div>
  )
}

import React, {FC} from 'react'
import {ProfitLoss} from './profitLoss'
import {SalesByChannel} from './SaleByChannel'
import {SalesByCustomer} from './SaleByCustoemr'
import {SalesByPerson} from './SaleByPerson'
import {SalesByItem} from './SalesByItem'
import {SalesReturn} from './SalesReturn'
type Props = {
  slug: string
}

const Finance: FC<Props> = ({slug}) => {
  return (
    <>
      {slug.includes('profit-loss') && <ProfitLoss />}
      {slug.includes('sales/item') && <SalesByItem />}
      {slug.includes('sales/customer') && <SalesByCustomer />}
      {slug.includes('sales/person') && <SalesByPerson />}
      {slug.includes('sales/return') && <SalesReturn />}
      {slug.includes('sales/channel') && <SalesByChannel />}
    </>
  )
}

export default Finance

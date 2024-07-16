import React, {FC} from 'react'
import {InventoryReport} from './inventory'
import {LowStock} from './low'
import {NotSales} from './notSale'
import {TopSales} from './topSale'
import {WishlistReport} from './wishlish'
type Props = {
  slug: string
}

const StockReport: FC<Props> = ({slug}) => {
  return (
    <>
      {slug.includes('inventory/summary') && <InventoryReport />}
      {slug.includes('inventory/low') && <LowStock />}
      {slug.includes('inventory/wishlist') && <WishlistReport />}
      {slug.includes('inventory/top/sale') && <TopSales />}
      {slug.includes('inventory/not/sale') && <NotSales />}
    </>
  )
}

export default StockReport

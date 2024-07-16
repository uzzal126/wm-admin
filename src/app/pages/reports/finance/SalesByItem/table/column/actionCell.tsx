import moment from 'moment'
import React, {FC} from 'react'
import {Link} from '../../../../../../modules/helper/linkHandler'
import {useQueryRequest} from '../../core/QueryRequestProvider'

type Props = {
  product: any
}
const ActionCell: FC<Props> = ({product}) => {
  const {state} = useQueryRequest()
  let date = {}
  if (state.filter) {
    date = state.filter
  } else {
    date = {
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD'),
    }
  }
  return (
    <Link
      to={`/reports/finance/sales/item/${product?.prod_id}`}
      className='fs-6 text-gray-800 text-hover-primary'
      state={{...date}}
    >
      {product.item_name}
    </Link>
  )
}

export default ActionCell

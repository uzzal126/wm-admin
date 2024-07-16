/* eslint-disable jsx-a11y/anchor-is-valid */

import moment from 'moment'
import {FC} from 'react'
import {Link} from '../../../../../../modules/helper/linkHandler'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {TableModal} from '../../core/_models'

type Props = {
  product: TableModal
}

const ImageCell: FC<Props> = ({product}) => {
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
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-circle symbol-40px overflow-hidden me-3'>
        <Link
          to={`/reports/finance/sales/item/${product?.prod_id}/${product?.attribute_id}`}
          state={{...date}}
        >
          <div className='symbol-label'>
            <img
              src={product?.thumbnail?.src || product?.thumbnail?.url}
              alt={product?.thumbnail?.alt}
              className='w-100'
            />
          </div>
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link
          to={`/reports/finance/sales/item/${product?.prod_id}/${product?.attribute_id}`}
          state={{...date}}
          className='fs-6 text-gray-800 text-hover-primary'
        >
          {product.variant_name}
        </Link>
        <span className='fw-bold text-gray-400'>SKU: {product?.sku}</span>
      </div>
    </div>
  )
}

export {ImageCell}

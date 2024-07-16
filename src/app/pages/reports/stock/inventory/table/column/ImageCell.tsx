/* eslint-disable jsx-a11y/anchor-is-valid */

import {FC} from 'react'
import {Link} from '../../../../../../modules/helper/linkHandler'
import {TableModal} from '../../core/_models'

type Props = {
  product: TableModal
}

const ImageCell: FC<Props> = ({product}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-circle symbol-40px overflow-hidden me-3'>
        <Link to={`/products/stock/${product?.prod_id}`}>
          <div className='symbol-label'>
            <img src={product?.thumbnail?.src} alt={product?.thumbnail?.alt} className='w-100' />
          </div>
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link
          to={`/products/stock/${product?.prod_id}`}
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

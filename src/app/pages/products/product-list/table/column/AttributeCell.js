import {Can} from '../../../../../../_metronic/redux/ability'
import {Link} from '../../../../../modules/helper/linkHandler'

const AttributeCell = ({product}) => {
  return (
    <div className='text-end'>
      <span className='pe-2'>
        {product?.variant_count !== null && product?.variant_count > 1
          ? `(${product?.variant_count})`
          : ''}
      </span>
      {product?.product_status === 'Deleted' ? (
        ''
      ) : (
        <Can access='Manage Stock' group='products'>
          <Link
            to={`/products/stock/${product.prod_id}`}
            state={product}
            className='btn btn-sm btn-icon btn-light btn-active-light-info toggle h-25px w-25px'
          >
            <span className='svg-icon svg-icon-3 m-0'>
              <span className='svg-icon svg-icon-2x'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    opacity='0.5'
                    d='M12.5657 9.63427L16.75 5.44995C17.1642 5.03574 17.8358 5.03574 18.25 5.44995C18.6642 5.86416 18.6642 6.53574 18.25 6.94995L12.7071 12.4928C12.3166 12.8834 11.6834 12.8834 11.2929 12.4928L5.75 6.94995C5.33579 6.53574 5.33579 5.86416 5.75 5.44995C6.16421 5.03574 6.83579 5.03574 7.25 5.44995L11.4343 9.63427C11.7467 9.94669 12.2533 9.94668 12.5657 9.63427Z'
                    fill='currentColor'
                  />
                  <path
                    d='M12.5657 15.6343L16.75 11.45C17.1642 11.0357 17.8358 11.0357 18.25 11.45C18.6642 11.8642 18.6642 12.5357 18.25 12.95L12.7071 18.4928C12.3166 18.8834 11.6834 18.8834 11.2929 18.4928L5.75 12.95C5.33579 12.5357 5.33579 11.8642 5.75 11.45C6.16421 11.0357 6.83579 11.0357 7.25 11.45L11.4343 15.6343C11.7467 15.9467 12.2533 15.9467 12.5657 15.6343Z'
                    fill='currentColor'
                  />
                </svg>
              </span>
            </span>
          </Link>
        </Can>
      )}
    </div>
  )
}

export {AttributeCell}

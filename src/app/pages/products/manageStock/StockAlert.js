import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {PRODUCT_STOCK_ALERT} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'

const StockAlert = ({proId, variant, reFetch}) => {
  const [stock, setStock] = useState(0)

  const submitStock = async () => {
    const data = {
      prod_id: proId,
      attribute_id: variant.id || 0,
      low_stock_threshold: parseInt(stock),
    }
    const upid = await queryRequest(PRODUCT_STOCK_ALERT, data)
    if (upid.success && upid.status_code) {
      reFetch()
      setStock(0)
      toast.success(upid.message)
    } else {
      toast.error(upid.message)
    }
  }

  return (
    <div className='d-flex w-100'>
      <div className='w-100'>
        <input
          type='number'
          className='form-control form-control-sm min-w-70px'
          onChange={(e) => setStock(e.target.value)}
          value={stock || variant?.low_stock_threshold || 0}
        />
      </div>
      {stock !== 0 && (
        <div className='flex-auto'>
          <button
            className='btn btn-icon btn-info btn-sm'
            disabled={stock === 0}
            onClick={submitStock}
          >
            <span className='indicator-label'>
              <i className='fas fa-sync'></i>
            </span>
            <span className='indicator-progress'>
              <span className='spinner-border spinner-border-sm align-middle'></span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export {StockAlert}

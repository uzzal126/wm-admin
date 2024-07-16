import {useState} from 'react'
import {toast} from 'react-toastify'
import {PRODUCT_STOCK_UPDATE} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'

const UpdateStock = ({proId, variant, reFetch}) => {
  const [stock, setStock] = useState({
    id: 0,
    attr_id: 0,
    quantity: 0,
  })

  const handlerStock = (e, id, attr) => {
    /* setStock({
      id: e.target.value !== '' ? id : 0,
      attr_id: e.target.value !== '' ? attr : 0,
      quantity: e.target.value,
    }) */
    const inputValue = parseInt(e.target.value, 10)
    const cappedValue = Math.min(inputValue, 999999)

    setStock({
      id: e.target.value !== '' ? id : 0,
      attr_id: e.target.value !== '' ? attr : 0,
      quantity: cappedValue,
    })
  }
  const submitStock = async () => {
    let available = variant.total_added - variant.committed + variant.sold
    let checkQty = available + Number(stock.quantity)
    if (checkQty > 0) {
      const data = {
        prod_id: proId,
        qty: parseInt(stock.quantity),
        attribute_id: stock.attr_id || 0,
      }
      const upid = await queryRequest(PRODUCT_STOCK_UPDATE, data)
      await reFetch()
      if (upid.success && upid.status_code) {
        setStock({
          prod_id: 0,
          attr_id: 0,
          quantity: 0,
        })
      } else {
        toast.error(upid.message)
      }
    } else {
      toast.error('You added less then you current stock')
    }
  }

  return (
    <div className='d-flex w-100'>
      <div className='w-100'>
        <input
          type='number'
          className='form-control form-control-sm min-w-70px'
          onChange={(e) => handlerStock(e, proId, variant.id)}
          /* value={
            stock.attr_id === variant.id ? stock.quantity : stock.id === proId ? stock.quantity : ''
          } */
          value={stock.quantity}
        />
      </div>
      <div className='flex-auto'>
        <button
          className='btn btn-icon btn-secondary btn-sm'
          disabled={stock.id !== proId ? true : false}
          onClick={submitStock}
        >
          <span className='indicator-label'>
            <i className='fas fa-plus'></i>
          </span>
          <span className='indicator-progress'>
            <span className='spinner-border spinner-border-sm align-middle'></span>
          </span>
        </button>
      </div>
    </div>
  )
}

export {UpdateStock}

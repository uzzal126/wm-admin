import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {updateStock} from '../../core/_requests'

const UpdateStock = ({proId, attrId}) => {
  const {refetch} = useQueryResponse()
  const [stock, setStock] = useState({
    id: 0,
    attr_id: 0,
    quantity: 0,
  })

  const handlerStock = (e, id, attr) => {
    setStock({
      id: e.target.value !== '' ? id : 0,
      attr_id: e.target.value !== '' ? attr : 0,
      quantity: e.target.value,
    })
  }
  const submitStock = async () => {
    const data = {
      id: proId,
      qty: stock.quantity,
      attribute_id: stock.attr_id || 0,
    }
    const upid = await updateStock(data)
    if (upid.success && upid.status_code) {
      refetch()
      setStock({
        id: 0,
        attr_id: 0,
        quantity: 0,
      })
    } else {
      toast.error(upid.message)
    }
  }

  return (
    <div className='d-flex'>
      <div className='flex-glow-1'>
        <input
          type='number'
          className='form-control form-control-sm min-w-70px'
          onChange={(e) => handlerStock(e, proId, attrId)}
          value={
            stock.attr_id === attrId ? stock.quantity : stock.id === proId ? stock.quantity : ''
          }
        />
      </div>
      <div className='flex-glow-0'>
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

import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {ORDER_STATUS, ORDER_STATUS_NEW} from '../../../constants/api.constants'
import {queryRequest} from '../../../library/api.helper'
import EditForm from './form/EditForm'

const FormHandler = ({response, refatch: refetch, setData}) => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const [orderStatus, setOrderStatus] = useState(1)
  const [shippingNext, setShippingNextStatus] = useState(2)

  useEffect(() => {
    setOrderStatus(response?.order_status_id)
  }, [response.order_status_id])

  const handlerOrderStatus = (st) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to ${st === 2 ? 'accept' : 'reject'} this order!`,
      icon: `${st === 2 ? 'success' : 'warning'}`,
      buttons: true,
      dangerMode: true,
    }).then(async (willDecide) => {
      if (willDecide) {
        const post = {
          oid: response.id,
          current_order_status_id: response.order_status_id,
          next_order_status_id: st,
        }
        const res = await queryRequest(`${ORDER_STATUS_NEW}/${response.id}`, post, 'PUT')
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
          setOrderStatus(st)
          refetch(true)
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  const handlerShippingStatus = (e) => {
    if (e?.target?.value === '') {
      return
    }

    swal({
      title: 'Are you sure?',
      text: `Do you want to update this order!`,
      icon: `info`,
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const id = e.target.value
        const post = {
          oid: response.id,
          current_order_status_id: orderStatus,
          next_order_status_id: id,
        }
        const res = await queryRequest(`${ORDER_STATUS}/${response?.id}`, post, 'put')
        if (res.success && res.status_code === 200) {
          swal('Your process updated!', {
            icon: 'success',
          })
          setOrderStatus(id)
          refetch(true)
        } else {
          toast.error(res.message)
        }
      }
    })
  }

  return (
    <>
      <EditForm
        statusHandler={handlerShippingStatus}
        orderStatus={orderStatus}
        data={response}
        setData={setData}
        refatch={(e) => refetch(e)}
        handlerOrderStatus={(st) => handlerOrderStatus(st)}
        shippingNext={shippingNext}
      />
    </>
  )
}

export default FormHandler

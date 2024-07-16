import {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {POST_ACTIVE_CHANNEL, POST_DEACTIVATE_CHANNEL} from '../../../../constants/api.constants'
import {queryRequest} from '../../../../library/api.helper'
import ConfigModal from './modal'

type Props = {
  item: any
  reFetch: any
}

const Buttons = ({item, reFetch}: Props) => {
  const [show, setShow] = useState(false)
  // console.log(item)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const activeChannel = async () => {
    const res = await queryRequest(POST_ACTIVE_CHANNEL, {
      payment_partner_id: item.id,
    })
    if (res.success && res.status_code === 200) {
      toast.success(res.message)
      reFetch()
    } else {
      toast.error(res.message)
    }
  }
  const deactivateChannel = async () => {
    const res = await queryRequest(POST_DEACTIVATE_CHANNEL, {
      payment_partner_id: item.id,
    })
    if (res.success && res.status_code === 200) {
      toast.success(res.message)
      reFetch()
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      <button className='btn btn-sm btn-light-info btn-icon w-30px h-30px'>
        <i className='fas fa-sync'></i>
      </button>
      <div>
        <button
          disabled={false}
          type='button'
          className='btn-action rounded fw-bold bg-transparent border-transparent '
          data-kt-menu-trigger='click'
          data-kt-menu-placement='left-start'
        >
          <i className='fas fa-ellipsis-vertical text-black' />
        </button>
        <div className='menu menu-sub menu-sub-dropdown' data-kt-menu='true'>
          <div className='p-3 d-flex flex-column gap-3'>
            {item.name !== 'COD' && (
              <button
                className='btn btn-sm btn-light-primary bg-light '
                onClick={() => setShow(!show)}
              >
                <i className='la la-cog'></i> Config
              </button>
            )}
            {item.is_active ? (
              <button
                onClick={() => deactivateChannel()}
                className='btn btn-sm btn-light-danger bg-light'
              >
                <i className='la la-times'></i> Deactivate
              </button>
            ) : (
              <button
                onClick={() => activeChannel()}
                className='btn btn-sm btn-light-success bg-light'
              >
                <i className='la la-check'></i> Active
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <ConfigModal setShow={setShow} show={show} item={item} />
      </Modal>
    </>
  )
}

export default Buttons

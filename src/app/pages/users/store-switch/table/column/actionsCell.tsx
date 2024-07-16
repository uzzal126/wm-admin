/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import {useState} from 'react'
import {toast} from 'react-toastify'
import swal from 'sweetalert'
import {authApi} from '../../../../../../_metronic/redux/slices/auth'
import {useAppDispatch} from '../../../../../../_metronic/redux/store'
import {setupAxios, useAuth} from '../../../../../modules/auth'
import {TableModal} from '../../core/_models'
import DetailsModal from './DetailsModal'

const ActionsCell = ({store}: {store: TableModal}) => {
  const {auth, saveAuth, setCurrentUser} = useAuth()
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()

  const onSwitched = () => {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to switch your store!',
      icon: 'warning',
      buttons: ['Cancel', 'Switch'],
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        const post = {
          new_id: store.id,
          new_sid: store.sid,
        }
        const res = await dispatch(authApi.endpoints.storeSwitch.initiate(post)).unwrap()
        if (res.success && res.status_code === 200) {
          const newAuth = {
            ...res,
            user: {
              ...auth?.user,
              ...res.user,
            },
          }
          const d = new Date()
          d.setSeconds(newAuth.user.expire_in)

          saveAuth({...newAuth, expired: d.getTime()})
          setCurrentUser(newAuth)
          setupAxios(axios, newAuth.user.access_token)
          window.location.reload()
        } else {
          toast.error(res.message || 'Error occurred')
        }
      }
    })
  }

  return (
    <>
      <DetailsModal show={show} setShow={setShow} store={store} />
      <div className='d-flex flex-row px-2'>
        <button
          type='button'
          className='btn btn-light-primary btn-icon m-0'
          onClick={() => setShow(true)}
          // disabled={store.sid === auth?.user?.sid}
        >
          <i className='fas fa-eye' />
        </button>
        <button
          type='button'
          className='btn btn-light-primary btn-icon m-0 mx-1'
          onClick={() => onSwitched()}
          disabled={store.sid === auth?.user?.sid}
        >
          <i className='fas fa-repeat ' />
        </button>
      </div>
    </>
  )
}

export {ActionsCell}

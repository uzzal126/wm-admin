import {useMemo, useState} from 'react'
import {KTCard, KTSVG} from '../../../../../_metronic/helpers'
import {useListView} from './core/ListViewProvider'

import {useQueryResponseData, useQueryResponseLoading} from './core/QueryResponseProvider'
import {SMSTemplates} from './table/DataTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'

const Template = () => {
  const [loading, setLoading] = useState(false)
  const [add, setAdd] = useState(true)
  const [show, setShow] = useState(false)

  const templates = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => templates, [templates])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()

  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <>
      <div className='table-responsive'>
        <div className='text-end'>
          <button type='button' className='btn btn-sm btn-light-primary' onClick={openAddUserModal}>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            Add Template
          </button>
        </div>
        <KTCard>
          <SMSTemplates />
        </KTCard>
      </div>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

export default Template

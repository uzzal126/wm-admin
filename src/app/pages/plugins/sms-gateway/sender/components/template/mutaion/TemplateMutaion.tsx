import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useQueryResponse} from '../../../core/QueryResponseProvider'
import {createUser, updateUser} from '../../../core/_requests'

export default function AddEditTemplate({show, handleClose, loading, setLoading, temp}: any) {
  const [template, setTemplate] = useState<any>(temp)
  const {refetch} = useQueryResponse()

  const handleSubmit = async () => {
    let res: any = {}
    if (temp) {
      res = await updateUser({
        id: template?.id,
        name: template?.name,
        text: template?.text,
      })
    } else {
      res = await createUser({
        name: template?.name,
        text: template?.text,
      })
    }

    if (res?.success) {
      refetch()
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Template</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row mb-3'>
          <label htmlFor='tempname' className='col-sm-2 col-form-label'>
            Template Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='tempname'
              name='name'
              onChange={(e) => setTemplate({...template, name: e.target.value})}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label htmlFor='smscontent' className='col-sm-2 col-form-label'>
            SMS Text
          </label>
          <div className='col-sm-10'>
            <textarea
              className='form-control'
              id='smscontent'
              name='text'
              onChange={(e) => setTemplate({...template, text: e.target.value})}
            />
            <div className='d-flex mt-2'>
              <span className=''>0 Characters</span>
              <span className='w-1px bg-light-dark mx-2'></span>
              <span className=''>1 SMS</span>
              <span className='w-1px bg-light-dark mx-2'></span>
              <span className=''>160 Char/SMS</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import {utf8ByteLength} from '../../../../../modules/helper/misc'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {updateUser} from '../core/_requests'

export default function TemplateModal({setting, setModal}) {
  const {refetch} = useQueryResponse()
  const [isLoading, setIsLoading] = useState(false)

  const updateSettings = useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => {
      refetch()
      setModal(false)
      setIsLoading(false)
    },
    onError: (err) => {
      toast.error(err.message)
      setIsLoading(false)
    },
  })

  const onSubmitHandler = async (data) => {
    const res = await updateSettings.mutateAsync({settings: {...data}})
    if (!res?.success) {
      toast.error(res?.message)
    }
  }

  const [text, setText] = useState(setting?.sms_template || '')
  const [touched, setTouched] = useState(false)

  return (
    <form
      className='form'
      action='#'
      id='kt_modal_update_customer_form'
      onSubmit={(e) => {
        e.preventDefault()
        setIsLoading(true)
        onSubmitHandler({
          ...setting,
          sms_template: text,
        })
      }}
    >
      <div className='row mb-3'>
        <label htmlFor='smscontent' className='fw-bolder col-sm-2 col-form-label'>
          SMS Text*
        </label>
        <div className='col-sm-10'>
          <textarea
            className='form-control'
            id='smscontent'
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onMouseEnter={() => setTouched(true)}
            style={{minHeight: '100px'}}
          />
          {touched && text.length === 0 && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{'SMS Text is required!'}</span>
              </div>
            </div>
          )}
          <div className='d-flex mt-2'>
            <span className=''>{`${utf8ByteLength(text)} Characters`}</span>
            <span className='w-1px bg-light-dark mx-2'></span>
            <span className=''>{`${Math.ceil(utf8ByteLength(text) / 160)} SMS`}</span>
            <span className='w-1px bg-light-dark mx-2'></span>
            <span className=''>160 Char/SMS</span>
          </div>
        </div>
      </div>
      <div className='modal-footer flex-center py-2'>
        <button
          type='reset'
          id='kt_modal_update_customer_cancel'
          className='btn btn-light me-3 btn-sm'
          onClick={() => {
            setModal(false)
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          id='kt_modal_update_customer_submit'
          className='btn btn-primary btn-sm'
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          ) : (
            <span className='indicator-label'>Update</span>
          )}
        </button>
      </div>
    </form>
  )
}

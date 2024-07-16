import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {POST_ORDER_MANUAL_PAYMENT} from '../../../../../constants/api.constants'
import {queryRequest} from '../../../../../library/api.helper'

function calculateUtf8Length(text) {
  const encoder = new TextEncoder()
  const utf8Bytes = encoder.encode(text)
  return utf8Bytes.length
}

const PaymentModal = ({
  data,
  order_id,
  invoice_id,
  currency,
  setPaymentModal,
  setPaidAmount,
  refetch,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [post, setPost] = useState({
    oid: order_id,
    invoice_id: invoice_id,
    p_method: 'CASH',
    currency: currency,
    amount: '',
    reference: '',
    attachment: {},
  })

  // const handleFile = (e) => {
  //   e.preventDefault()
  //   setPost({...post, attachment: e.target.files[0]})
  // }

  const pethods = [
    {
      name: 'bKash',
      val: 'COD',
    },
    {
      name: 'Card',
      val: 'CARD',
    },
    {
      name: 'Cash',
      val: 'CASH',
    },
  ]

  const handlePaymentSubmit = async () => {
    setLoading(true)
    if (post.amount === 0 || post.amount === '') {
      setLoading(false)
      setError('Add you payable amount')
    } else if (post.p_method === '') {
      setLoading(false)
      setError('Select Payment Method')
    } else if (calculateUtf8Length(post.reference) === 0) {
      setLoading(false)
      setError('Please provide a reference')
    } else if (calculateUtf8Length(post.reference) > 500) {
      setLoading(false)
      setError('Reference length must be less than or equal to 500 utf8 characters')
    } else {
      const res = await queryRequest(POST_ORDER_MANUAL_PAYMENT, post)
      if (res.success && res.status_code === 200) {
        toast.success(res.message)
        setPaidAmount(post.amount)
        setPaymentModal(false)
        setLoading(false)
        refetch(true)
      } else {
        setError(res.message)
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Modal.Body>
        {error && (
          <div className='alart alert-danger p-2 rounded'>
            <div className='d-flex flex-column'>
              <span>{error}</span>
            </div>
          </div>
        )}
        <div className='clearfix mb-4'>
          <div className='w-100 fs-5 required mb-3'>
            <span>Payment Method</span>
          </div>
          <div className='btn-group'>
            {pethods &&
              pethods.length > 0 &&
              pethods.map((mp, i) => (
                <label
                  key={i}
                  onClick={() => setPost({...post, p_method: mp?.val})}
                  className={`btn btn-outline-primary text-muted btn-outline btn-active-success text-hover-primary text-active-primary ${
                    mp?.val === post.p_method && 'active'
                  }`}
                >
                  {mp?.name}
                </label>
              ))}
          </div>
        </div>
        <div className='mb-3'>
          <div className='w-100 fs-5 required mb-3'>
            <span htmlFor=''>Amounts</span>
          </div>
          <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
              ৳
            </span>
            <input
              type='number'
              className='form-control'
              placeholder='Amounts'
              value={post.amount}
              min={0}
              max={data?.total - data?.paid_amount}
              onChange={(e) => {
                if (
                  data?.total - data?.paid_amount >= Number(e.target.value) &&
                  Number(e.target.value >= 0)
                ) {
                  setPost({...post, amount: e.target.value})
                }
              }}
            />
          </div>
        </div>
        <div className='mb-3'>
          <div className='w-100 fs-5 required mb-3'>
            <span htmlFor=''>Reference</span>
          </div>
          <div className='input-group'>
            <textarea
              className='form-control'
              placeholder='Reference'
              onChange={(e) => setPost({...post, reference: e.target.value})}
              value={post.reference}
            />
          </div>
        </div>
        {/* <div className='mb-3'>
          <div className='w-100 fs-5 mb-3'>
            <span htmlFor=''>Attachment</span>
          </div>
          <div className='input-group'>
            <input
              type='file'
              className='form-control'
              placeholder='file'
              onChange={(e) => handleFile(e)}
            />
          </div>
        </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setPaymentModal(false)}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handlePaymentSubmit()} disabled={loading}>
          <span className={`indicator-label ${loading && 'd-none'}`}>Add Payment</span>
          <span className={`indicator-progress ${loading && 'd-block'}`}>
            Please wait...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </Button>
      </Modal.Footer>
    </>
  )
}

export default PaymentModal

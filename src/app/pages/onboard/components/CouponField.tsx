import {ChangeEvent} from 'react'

type Props = {
  coupon: string
  setCoupon: any
  handleCouponSubmit: any
}

const CouponField = ({
  coupon = '',
  setCoupon = () => null,
  handleCouponSubmit = () => null,
}: Props) => {
  const handleCouponChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value)
  }

  return (
    <div className='d-flex px-5 mt-3'>
      <div className='kt-input w-100'>
        <input
          type='text'
          placeholder='Enter coupon code'
          className='form-control form-control-solid'
          value={coupon}
          onChange={handleCouponChange}
        />
      </div>

      <button onClick={handleCouponSubmit} type='button' className='btn btn-light-success'>
        Apply
      </button>
      {coupon?.length > 0 && (
        <button onClick={() => setCoupon('')} type='button' className='btn btn-light-danger'>
          Reset
        </button>
      )}
    </div>
  )
}

export default CouponField

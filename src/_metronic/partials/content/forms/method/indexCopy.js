const PaymentMethodSelect = ({callBack}) => {
  return (
    <select
      className='form-select fw-bolder'
      data-kt-select2='true'
      data-placeholder='Select option'
      data-allow-clear='true'
      data-kt-user-table-filter='paymentMethod'
      data-hide-search='true'
      onChange={(e) => callBack(e.target.value)}
    >
      <option value=''>Select Payment Method</option>
      <option value='1'>Cash On Delivary (COD)</option>
      <option value='2'>Partial Payment</option>
      <option value='5'>Full Payment</option>
    </select>
  )
}

export default PaymentMethodSelect

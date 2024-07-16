const PaymentMethodSelect = ({paymentOptions, setCod, cod}) => {
  return (
    <select
      className='form-select form-select-solid fw-bolder'
      data-kt-select2='true'
      data-placeholder='Select option'
      data-allow-clear='true'
      data-kt-user-table-filter='paymentMethod'
      data-hide-search='true'
      onChange={(e) => setCod(e.target.value)}
      value={cod}
    >
      <option value={''}>Select Payment Method</option>
      {Array.isArray(paymentOptions) && paymentOptions?.length > 0
        ? paymentOptions.map((item, indx) => (
            <option value={item?.id} key={indx} selected={item?.id === cod}>
              {item?.name || item?.title}
            </option>
          ))
        : ''}
    </select>
  )
}

export default PaymentMethodSelect

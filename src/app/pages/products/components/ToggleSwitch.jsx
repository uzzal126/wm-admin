export const ToggleSwitch = ({ label, labelPosition, name, checked, value, onChange, }) => {
  return <label className='form-check form-switch form-check-custom form-check-solid'>
    {labelPosition !== 'right' && <span className='form-check-label me-5'>{label}</span>}
    <input type='checkbox'
      className='form-check-input'
      name={name}
      value={value ?? ''}
      checked={checked ?? false}
      onChange={onChange} />
    {labelPosition === 'right' && <span className='form-check-label me-5'>{label}</span>}
  </label>
};

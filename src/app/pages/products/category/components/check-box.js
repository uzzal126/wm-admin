export default function CheckBox({item, checked, onChangeHandler}) {
  // // console.log('on change handler: ', checked, onChangeHandler)
  return (
    <input
      className='form-check-input widget-13-check'
      type='checkbox'
      checked={checked}
      onChange={() => onChangeHandler(item.id)}
      value={item.id}
    />
  )
}

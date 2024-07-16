import Select from 'react-select'
import {useState} from 'react'

export default function OptionInput({onChange, options, value, isCustom}) {
  const [custom, setCustom] = useState(isCustom && value && value?.length > 0 ? true : false)

  const handleChangeOption = (option) => {
    if (option?.value === 'Custom') {
      setCustom(true)
      onChange(option.value)
    } else {
      onChange(option.value)
    }
  }

  return custom ? (
    <input
      type='text'
      className='form-control mb-2 mb-md-0'
      placeholder='Option name...'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <Select options={options} value={value} onChange={(e) => handleChangeOption(e)} />
  )
}

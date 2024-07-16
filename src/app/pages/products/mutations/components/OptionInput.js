import Select from 'react-select'
import {useState} from 'react'

export default function OptionInput({onChange, options}) {
  const [custom, setCustom] = useState(false)

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
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <Select options={options} onChange={(e) => handleChangeOption(e)} />
  )
}

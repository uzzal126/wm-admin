import '@yaireo/dragsort/dist/dragsort.css'
import '@yaireo/tagify/dist/tagify.css'
import {useEffect, useRef, useState} from 'react'

import Tags from '@yaireo/tagify/dist/react.tagify'

const baseTagifySettings = {
  id: 'tagify-input-variant-name',
  blacklist: ['xxx', 'yyy', 'zzz', 'Default', 'null'],
  mode: 'select',
  maxTags: 60,
  placeholder: 'Type or Select Color, Size ....',
  dropdown: {
    enabled: 0, // a;ways show suggestions dropdown
  },
}

export default function TagInputVariantName({setValues, onChange, suggest}) {
  // // console.log('setValues', suggest)
  const tagifyRef1 = useRef()
  const [tagifyProps, setTagifyProps] = useState({})
  const settings = {
    ...baseTagifySettings,
  }
  useEffect(() => {
    setTagifyProps({loading: true})
    setTagifyProps({
      className: 'form-control',
      whitelist: (suggest && suggest.length > 0 && suggest.map((f) => f.value)) || [],
      showFilteredDropdown: 'a',
      loading: false,
    })
  }, [setValues, suggest])

  const handleOnChange = (e) => {
    let value = e.detail.value ? JSON.parse(e.detail.value) : []
    if (value.length > 0 && Array.isArray(value)) {
      const list = value[0]
      // // console.log('list', list)
      onChange(list)
    } else {
      onChange('')
      return
    }
  }

  return (
    <div className='position-relative'>
      <Tags
        tagifyRef={tagifyRef1}
        {...tagifyProps}
        settings={settings}
        value={setValues}
        autoFocus={true}
        onChange={handleOnChange}
        // onEditInput={() => // console.log('onEditInput')}
        // onEditBeforeUpdate={() => // console.log`onEditBeforeUpdate`}
        // onEditUpdated={() => // console.log('onEditUpdated')}
        // onEditStart={() => // console.log('onEditStart')}
        // onEditKeydown={() => // console.log('onEditKeydown')}
        // onDropdownShow={() => // console.log('onDropdownShow')}
        // onDropdownHide={() => // console.log('onDropdownHide')}
        // onDropdownSelect={() => // console.log('onDropdownSelect')}
        // onDropdownScroll={() => // console.log('onDropdownScroll')}
        // onDropdownNoMatch={() => // console.log('onDropdownNoMatch')}
        // onDropdownUpdated={(e) => handleOnChange(e)}
      />
    </div>
  )
}

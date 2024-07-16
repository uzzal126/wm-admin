import '@yaireo/dragsort/dist/dragsort.css'
import '@yaireo/tagify/dist/tagify.css'
import {useEffect, useRef, useState} from 'react'

import Tags from '@yaireo/tagify/dist/react.tagify'

const baseTagifySettings = {
  id: 'tagify-input-variant-values',
  blacklist: ['xxx', 'yyy', 'zzz', 'Default', 'null'],
  maxTags: 60,
  placeholder: 'Add...',
  dropdown: {
    enabled: 0, // a;ways show suggestions dropdown
  },
}

export default function TagInputVariantValues({setValues, onChange, suggest}) {
  const tagifyRef1 = useRef()
  const [tagifyProps, setTagifyProps] = useState({})
  const settings = {
    ...baseTagifySettings,
  }
  useEffect(() => {
    setTagifyProps({loading: true})
    setTagifyProps({
      className: 'form-control',
      whitelist: (suggest && suggest.length > 0 && suggest[0]?.list) || [],
      showFilteredDropdown: 'a',
      loading: false,
    })
  }, [setValues, suggest])

  const handleOnChange = (e) => {
    let value = e.detail.value ? JSON.parse(e.detail.value) : []
    if (value.length > 0 && Array.isArray(value)) {
      const list = value.map((e) => e?.value)
      console.log({list})
      onChange(list)
    } else {
      onChange([])
      return
    }
  }
  const clearAll = () => {
    tagifyRef1.current && tagifyRef1.current.removeAllTags()
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
      />
      {tagifyRef1 && tagifyRef1?.current && tagifyRef1?.current?.value?.length > 0 && (
        <button
          className='btn btn-icon btn-sm btn-light-danger position-absolute top-50 end-0 translate-middle-y'
          onClick={() => clearAll()}
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  )
}

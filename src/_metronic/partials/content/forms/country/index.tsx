import React, {FC} from 'react'
import Select from 'react-select'

import countryData from './countries.json'

interface Country {
  name: string
  code: string
  emoji: string
  unicode: string
  image: string
}

type Props = {
  onChange: (event: React.ChangeEvent<Country>) => void
  code: string
  className?: string
  placeholder?: string
}

const CountrySelect: FC<Props> = ({onChange, code, className, placeholder}) => {
  const formatOptionLabel = (data: Country) => (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-circle symbol-20px me-2'>
        <img src={data.image} alt='' />
      </div>
      <div>
        <p className='mb-1'>{data.name}</p>
      </div>
    </div>
  )

  return (
    <Select
      defaultValue={[]}
      value={
        countryData && countryData.length > 0 ? countryData.filter((f) => f.code === code) : []
      }
      name='country'
      options={countryData}
      className={className || ''}
      formatOptionLabel={formatOptionLabel}
      placeholder={`${placeholder || 'Search Country'}`}
      onChange={(e: any) => onChange(e)}
    />
  )
}

export default CountrySelect

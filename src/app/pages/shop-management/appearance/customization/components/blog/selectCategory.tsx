import Select from 'react-select'

type Props = {
  onChange: (e: any) => void
  values: string
  category?: any
  setCategory?: any
  getCategory?: any
}

const SelectCategory = ({onChange, values, category, setCategory}: Props) => {
  const ids = values && values.split(',').map(Number)

  return (
    <div>
      <Select
        value={category?.filter((item: any) => ids && ids.includes(item.id)) || []}
        options={category}
        className='multi-select mb-2'
        isMulti
        menuPlacement='top'
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default SelectCategory

type Props = {
  catData: any[]
  selected: any
  onSelect: any
}

const ThemeFilter = ({selected, catData, onSelect}: Props) => {
  return (
    <form className='theme-filter mb-5'>
      <h3 className='filter-title'>Industry</h3>
      <div className='theme-filter--list'>
        {catData?.map((cat) => (
          <label
            htmlFor={cat.id}
            onChange={() => onSelect(cat)}
            key={cat.id}
            className={`form-check form-check-custom form-check-solid ${
              selected.id === cat.id ? 'text-primary' : ''
            }`}
          >
            <input
              id={cat.id}
              value={cat.id}
              type='radio'
              name='theme'
              checked={selected.id === cat.id}
              className='form-check-input'
            />
            <span className='form-check-label'>{cat.label}</span>
            <span className='count'>{cat.totalTheme}</span>
          </label>
        ))}
      </div>
    </form>
  )
}

export default ThemeFilter

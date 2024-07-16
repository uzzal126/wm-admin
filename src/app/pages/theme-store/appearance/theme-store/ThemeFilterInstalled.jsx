const ThemeFilterInstalled = ({selected, onSelect, installCount}) => {
  return (
    <form className='theme-filter mb-5'>
      <h3 className='filter-title'>Status</h3>
      <div className='theme-filter--list'>
        <label
          htmlFor='installed'
          className={`form-check form-check-custom form-check-solid ${
            selected === 1 ? 'text-primary' : ''
          }`}
        >
          <input
            id='installed'
            value={1}
            type='radio'
            name='installed'
            checked={selected === '1'}
            onChange={() => onSelect('1')}
            className='form-check-input'
          />

          <span className='form-check-label'>Installed</span>
          {parseInt(installCount) > 0 && <span className='count'>{installCount}</span>}
        </label>
      </div>
    </form>
  )
}

export default ThemeFilterInstalled

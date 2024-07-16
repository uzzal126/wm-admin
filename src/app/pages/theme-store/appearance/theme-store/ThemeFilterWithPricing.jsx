import {useEffect} from 'react'

const ThemeFilterWithPricing = ({selected, onSelect, freeCount, paidCount}) => {
  useEffect(() => {
    if (selected === 'PAID' && parseInt(paidCount) === 0) {
      onSelect('FREE')
    }
  })
  return (
    <form className='theme-filter mb-5'>
      <h3 className='filter-title'>Price</h3>
      <div className='theme-filter--list'>
        <label
          htmlFor='free'
          className={`form-check form-check-custom form-check-solid ${
            selected === 'FREE' || parseInt(paidCount) === 0 ? 'text-primary' : ''
          }`}
        >
          <input
            id='free'
            value='free'
            type='radio'
            name='themeType'
            checked={selected === 'FREE' || parseInt(paidCount) === 0}
            onChange={() => onSelect('FREE')}
            className='form-check-input'
          />
          <span className='form-check-label'>Free</span>
          {parseInt(freeCount) > 0 && <span className='count'>{freeCount}</span>}
        </label>
        <label
          htmlFor='paid'
          className={`form-check form-check-custom form-check-solid ${
            selected === 'PAID' && parseInt(paidCount) !== 0 ? 'text-primary' : ''
          }`}
        >
          <input
            id='paid'
            value='paid'
            type='radio'
            disabled={parseInt(paidCount) === 0}
            name='themeType'
            checked={selected === 'PAID' && parseInt(paidCount) !== 0}
            onChange={() => onSelect('PAID')}
            className='form-check-input'
          />
          <span className='form-check-label'>Paid</span>
          {parseInt(paidCount) > 0 && <span className='count'>{paidCount}</span>}
        </label>
      </div>
    </form>
  )
}

export default ThemeFilterWithPricing

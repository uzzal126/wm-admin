import {useEffect} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'

export default function StockField({item, setFieldValue, index}) {
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  return (
    <>
      <button
        disabled={false}
        type='button'
        className='btn border btn-sm min-w-60px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        {`${item?.qty}`}
      </button>
      <div className='menu menu-sub menu-sub-dropdown w-250px w-md-250px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Stock</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <input
            type='number'
            min={0}
            className='form-control mt-3'
            value={item?.qty}
            onChange={(e) => setFieldValue(`variants.${index}.qty`, parseInt(e.target.value))}
          />
        </div>
      </div>
    </>
  )
}

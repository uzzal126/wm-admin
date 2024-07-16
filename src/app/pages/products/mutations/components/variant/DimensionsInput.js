import {useEffect} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import Dimensions, {weight} from '../dimensions'

export default function DimensionsInput({item, index, setFieldValue}) {
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  let weight_name = weight.filter((f) => f.id === Number(item?.shipping_attribute.weight_class_id))
  return (
    <>
      <button
        disabled={false}
        type='button'
        className='btn border btn-sm mx-1 min-w-125px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        {`${item?.shipping_attribute.length} X ${item?.shipping_attribute.width} X ${
          item?.shipping_attribute.height
        } - 
        ${item?.shipping_attribute.weight} ${weight_name.length > 0 ? weight_name[0].name : 'kg'}`}
      </button>
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-500px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Dimensions</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <Dimensions index={index} setFieldValue={setFieldValue} />
        </div>
      </div>
    </>
  )
}

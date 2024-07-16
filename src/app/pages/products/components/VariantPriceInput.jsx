import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {isNumber} from '../../../../common'
import {useEffectEnhanced, useStateEnhanced} from '../../../hooks'
import {DiscountSection} from './DiscountSection'
import {FormField} from './FormField'
import {ProductsService} from './Products.service'
import {ToggleSwitch} from './ToggleSwitch'

const calculateSalePrice = (priceData) => {
  const sellingPrice = isNumber(priceData.sellingPrice) ? Number(priceData.sellingPrice) : 0

  if (priceData.discount?.hasDiscount !== true) {
    return sellingPrice
  }

  if (priceData.discount.discountType === 'Fixed') {
    let discountAmount = isNumber(priceData.discount.discountAmount)
      ? Number(priceData.discount.discountAmount)
      : 0
    discountAmount = discountAmount < 0 ? 0 : discountAmount

    const salePrice = sellingPrice - discountAmount

    return salePrice < 0 ? 0 : salePrice
  }

  if (priceData.discount.discountType === 'Percentage') {
    const discountPercentage = isNumber(priceData.discount.discountPercentage)
      ? Number(priceData.discount.discountPercentage)
      : 0

    if (discountPercentage < 1) {
      return sellingPrice
    }

    const salePrice = Math.ceil(sellingPrice - (sellingPrice * discountPercentage) / 100)

    return salePrice < 0 ? 0 : salePrice
  }

  return sellingPrice
}

export const VariantPriceInput = ({ index, name, data, onChange}) => {
  const [_data, _setData, updateData] = useStateEnhanced({
    initialValue: data ?? ProductsService.getDefaultProductData().price,
  })

  const onDiscountToggleSwitchChanged = (event) => {
    const hasDiscount = event.target.checked ?? false
    const {updatedData} = updateData({
      discount: {
        ..._data?.discount,
        [event.target.name]: hasDiscount,
        discountType: hasDiscount ? 'Percentage' : 'no',
        discountAmount: hasDiscount ? _data?.discount?.discountAmount : '',
        discountPercentage: hasDiscount ? _data?.discount?.discountPercentage : '',
        discountStartDate: hasDiscount ? _data?.discount?.discountStartDate : '',
        discountEndDate: hasDiscount ? _data?.discount?.discountEndDate : '',
      },
    })

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: updatedData,
        },
      })
  }

  const onInputValueChanged = (event) => {
    const {updatedData} = updateData({[event.target.name]: event.target.value})

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: updatedData,
        },
      })
  }

  useEffectEnhanced(() => {
    MenuComponent.reinitialization()
  }, [])

  return (
    <>
      <button
        disabled={false}
        type='button'
        className='form-control btn border'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        {_data.discount?.hasDiscount ? (
          <div className='d-flex flex-column'>
            <div className='badge badge-success fw-bolder'>On Sale</div>
            {calculateSalePrice(_data)}
          </div>
        ) : (
          _data.sellingPrice ? _data.sellingPrice : '0'
        )}
      </button>

      <div
        className='menu menu-sub menu-sub-dropdown w-350px w-md-500px'
        data-kt-menu='true'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='card-header'>
          <div className='card-title fs-5 text-dark fw-bolder'>Pricing</div>
          <ToggleSwitch
            label='Sale'
            name='hasDiscount'
            checked={_data.discount?.hasDiscount ?? false}
            onChange={onDiscountToggleSwitchChanged}
          />
        </div>

        <div className='separator border-gray-200' />

      <div className='px-5 py-5' data-kt-user-table-filter='form'>
        <FormField
          type='number'
          name='sellingPrice'
          errorFieldName={`variants[${index}].price.sellingPrice`}
          label='Price (৳)'
          tooltip='Set the selling price of this variant'
          placeholder='Enter the selling price of this variant'
          minimum={0}
          maximumLength={8}
          value={_data.sellingPrice}
          onChange={onInputValueChanged}
          required />

          {_data.discount?.hasDiscount && (
            <div className='py-5'>
              <DiscountSection
                sellingPrice={_data.sellingPrice ?? ''}
                noDiscountSelectionVisible={false}
                errorFieldNamePrefix={`variants[${index}].`}
                name='discount'
                data={_data.discount}
                onChange={onInputValueChanged}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

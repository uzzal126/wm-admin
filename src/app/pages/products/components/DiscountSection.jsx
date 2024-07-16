import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDefaultIfNotNumber} from '../../../../common'
import {useEffectEnhanced} from '../../../hooks'
import {ToolTipLabel} from '../../../modules/helper/misc'
import {productFormErrorsActions} from '../redux-slices'
import {FormField} from './FormField'

const RadioButtonWithInput = ({
  active,
  label,
  radioButtonName,
  radioButtonValue,
  onRadioButtonChange,
  minimumInputValue,
  maximumInputValue,
  minimumInputLength,
  maximumInputLength,
  inputVisible,
  inputType,
  inputName,
  inputErrorFieldName,
  inputPlaceholder,
  inputValue,
  onInputBlurred,
  onInputValueChange,
}) => {
  return (
    <>
      <label
        className={[
          'btn btn-outline btn-outline-dashed btn-outline-default',
          'd-flex align-items-center text-start p-6',
          active ? 'active' : '',
        ].join(' ')}
      >
        <span className='form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1'>
          <input
            type='radio'
            className='form-check-input'
            name={radioButtonName}
            value={radioButtonValue}
            checked={!!active}
            onChange={onRadioButtonChange}
          />
        </span>
        <span className='ms-5 d-flex align-items-center justify-content-between discount-input-field'>
          <span className='fs-4 fw-bolder text-gray-800 d-block me-2 '>{label}</span>
          {inputVisible !== false && (
            <FormField
              type={inputType ?? 'text'}
              placeholder={inputPlaceholder}
              name={inputName}
              errorFieldName={inputErrorFieldName}
              minimum={minimumInputValue}
              maximum={maximumInputValue}
              minimumLength={minimumInputLength}
              maximumLength={maximumInputLength}
              value={inputValue ?? ''}
              onBlur={onInputBlurred}
              onChange={onInputValueChange}
              required={false}
            />
          )}
        </span>
      </label>
    </>
  )
}

export const DiscountSection = ({
  sellingPrice,
  errorFieldNamePrefix,
  noDiscountSelectionVisible,
  name,
  data,
  onChange,
}) => {
  const {touches, errors} = useSelector((state) => state.productFormErrors)
  const dispatch = useDispatch()
  // this data (state) variable is only applicable for this Discount component...
  const [_data, setData] = useState(
    data ?? {
      discountType: 'no',
      hasDiscount: false,
      discountPercentage: '',
      discountAmount: '',
      discountStartDate: '',
      discountEndDate: '',
    }
  )

  const onInputValueChanged = (event) => {
    let discountType = ''
    let hasDiscount = false
    let discountPercentage = ''
    let discountAmount = ''
    let discountStartDate = ''
    let discountEndDate = ''

    if (event.target.name === 'discountType') {
      discountType = event.target.value ?? 'no'

      if (discountType !== 'no') {
        hasDiscount = discountType !== 'no'
        discountStartDate = _data.discountStartDate
        discountEndDate = _data.discountEndDate
      }
    } else if (event.target.name === 'discountPercentage') {
      discountType = 'Percentage'
      hasDiscount = true
      discountPercentage = event.target.value
      discountStartDate = _data.discountStartDate
      discountEndDate = _data.discountEndDate

      dispatch(
        productFormErrorsActions.setTouch(
          `${errorFieldNamePrefix ?? ''}price.discount.discountPercentage`
        )
      )
    } else if (event.target.name === 'discountAmount') {
      discountType = 'Fixed'
      hasDiscount = true
      discountAmount = event.target.value
      discountStartDate = _data.discountStartDate
      discountEndDate = _data.discountEndDate

      dispatch(
        productFormErrorsActions.setTouch(
          `${errorFieldNamePrefix ?? ''}price.discount.discountAmount`
        )
      )
    } else if (event.target.name === 'discountStartDate') {
      discountType = _data.discountType
      hasDiscount = _data.hasDiscount
      discountStartDate = event.target.value
      discountEndDate = _data.discountEndDate
      discountAmount = _data.discountAmount
      discountPercentage = _data.discountPercentage
    } else if (event.target.name === 'discountEndDate') {
      discountType = _data.discountType
      hasDiscount = _data.hasDiscount
      discountStartDate = _data.discountStartDate
      discountEndDate = event.target.value
      discountAmount = _data.discountAmount
      discountPercentage = _data.discountPercentage
    }

    const updatedData = {
      discountType: discountType,
      hasDiscount: hasDiscount,
      discountPercentage: discountPercentage,
      discountAmount: discountAmount,
      discountStartDate: discountStartDate,
      discountEndDate: discountEndDate,
    }

    setData(updatedData)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: updatedData,
        },
      })
  }

  // this use effect is used to make sure that the discount amount
  // never exceeds the selling price...
  useEffectEnhanced(() => {
    // if fixed discount is not selected, we shall not proceed any further...
    if (_data.discountType !== 'Fixed') {
      return
    }

    // otherwise, we shall parse the discount amount as number...
    const discountAmount = getDefaultIfNotNumber(_data.discountAmount, 0)
    // we'll also parse the selling price...
    const _sellingPrice = getDefaultIfNotNumber(sellingPrice, 0)

    // if the discount amount is less than or equal to the selling price,
    // we shall not proceed any further...
    if (discountAmount <= _sellingPrice) {
      return
    }

    // otherwise, we shall call the 'onInputValueChanged()' method...
    onInputValueChanged({
      target: {
        name: 'discountAmount',
        value: '',
      },
    })
  }, [sellingPrice])

  return (
    <>
      {/* Discount radio buttons start */}
      <div>
        <div className='fv-row mb-5'>
          <ToolTipLabel
            label='Discount type'
            // if no discount section is not visible, it discount is required...
            className={noDiscountSelectionVisible === false ? 'required' : ''}
            tooltip='Select a discount type that shall be applied to this product'
          />

          {/*
           * If you need to reduce the number of columns, e.g. we want to have 2 columns,
           * paste this as className: row row-cols-1 row-cols-sm-2 row-cols-xl-2 g-3 g-xl-9
           */}
          <div
            className={[
              'row row-cols-1',
              noDiscountSelectionVisible === false
                ? 'row-cols-sm-2 row-cols-xl-2'
                : 'row-cols-sm-3 row-cols-xl-3',
              'g-3 g-xl-9',
            ].join(' ')}
          >
            {noDiscountSelectionVisible !== false && (
              <div className='col'>
                <RadioButtonWithInput
                  inputVisible={false}
                  radioButtonName='discountType'
                  inputName=''
                  label='No Discount'
                  radioButtonValue='no'
                  active={_data.discountType === 'no'}
                  onRadioButtonChange={onInputValueChanged}
                  onInputValueChange={onInputValueChanged}
                />
              </div>
            )}
            <div className='col'>
              <RadioButtonWithInput
                radioButtonName='discountType'
                inputName='discountPercentage'
                label={noDiscountSelectionVisible === false ? '%' : '(%)'}
                radioButtonValue='Percentage'
                inputType='number'
                minimumInputValue={1}
                maximumInputValue={100}
                maximumInputLength={5}
                inputPlaceholder='%'
                active={_data.discountType === 'Percentage'}
                inputValue={_data.discountPercentage ?? ''}
                onRadioButtonChange={onInputValueChanged}
                onInputBlurred={(event) =>
                  dispatch(
                    productFormErrorsActions.setTouch(
                      `${errorFieldNamePrefix ?? ''}price.discount.discountPercentage`
                    )
                  )
                }
                onInputValueChange={onInputValueChanged}
              />
              {touches[`${errorFieldNamePrefix ?? ''}price.discount.discountPercentage`] === true &&
                !!errors?.[`${errorFieldNamePrefix ?? ''}price.discount.discountPercentage`]
                  ?.length && (
                  <div className='text-danger mt-2'>
                    {errors[`${errorFieldNamePrefix ?? ''}price.discount.discountPercentage`]}
                  </div>
                )}
            </div>
            <div className='col'>
              <RadioButtonWithInput
                radioButtonName='discountType'
                inputName='discountAmount'
                label={noDiscountSelectionVisible === false ? '(৳)' : '(৳)'}
                radioButtonValue='Fixed'
                inputType='number'
                minimumInputValue={1}
                maximumInputValue={getDefaultIfNotNumber(sellingPrice, 0)}
                maximumInputLength={8}
                inputPlaceholder='৳'
                active={_data.discountType === 'Fixed'}
                inputValue={_data.discountAmount ?? ''}
                onRadioButtonChange={onInputValueChanged}
                onInputBlurred={(event) =>
                  dispatch(
                    productFormErrorsActions.setTouch(
                      `${errorFieldNamePrefix ?? ''}price.discount.discountAmount`
                    )
                  )
                }
                onInputValueChange={onInputValueChanged}
              />
              {touches[`${errorFieldNamePrefix ?? ''}price.discount.discountAmount`] === true &&
                !!errors?.[`${errorFieldNamePrefix ?? ''}price.discount.discountAmount`]
                  ?.length && (
                  <div className='text-danger mt-2'>
                    {errors[`${errorFieldNamePrefix ?? ''}price.discount.discountAmount`]}
                  </div>
                )}
            </div>
          </div>
        </div>

        {_data.hasDiscount && (
          <>
            <div className='row row-cols-1 row-cols-lg-2'>
              <div className='mb-5'>
                <FormField
                  type='date'
                  name='discountStartDate'
                  errorFieldName={`${errorFieldNamePrefix ?? ''}price.discount.discountStartDate`}
                  label='Discount start date'
                  tooltip='Select date from which your customers can start availing the discount offer'
                  value={_data.discountStartDate}
                  onChange={onInputValueChanged}
                  required={true}
                />
              </div>
              <div className='mb-5'>
                <FormField
                  type='date'
                  name='discountEndDate'
                  errorFieldName={`${errorFieldNamePrefix ?? ''}price.discount.discountEndDate`}
                  label='Discount end date'
                  tooltip='Select the date on which the discount offer ends'
                  value={_data.discountEndDate}
                  onChange={onInputValueChanged}
                  required={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {/* Discount radio buttons end */}
    </>
  )
}

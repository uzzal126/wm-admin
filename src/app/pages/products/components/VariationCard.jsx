import {useState} from 'react'
import {
  addToArray,
  findFromArrayOfObjectsByValue,
  generateUniqueId,
  isArray,
  isUndefinedNullOrWhiteSpaceString,
  removeFromArrayOfObjectsByValue,
} from '../../../../common'
import {options as optionsList} from '../../../constants'
import {useEffectEnhanced, useStateEnhanced} from '../../../hooks'
import CropperComponents from '../../../modules/components/cropper/CropperComponents'
import {ToolTipLabel} from '../../../modules/helper/misc'
import {CustomTagify} from './CustomTagify'
import {FormField} from './FormField'
import {ProductsService} from './Products.service'

import {VariantDimensionsInput} from './VariantDimensionsInput'
import {VariantPriceInput} from './VariantPriceInput'
import { useSelector } from 'react-redux'

const getUnusedOptionsList = ({variationIndex, variations, optionsList}) => {
  let inUse = false
  const unusedOptionsList = []

  for (let i = 0; i < optionsList.length; ++i) {
    const options = optionsList[i]
    inUse = false

    for (let j = 0; j < variations.length; ++j) {
      const variation = variations[j]

      // checking if the option is already in use...
      if (j !== variationIndex && variation.variationType === options.value) {
        inUse = true
      }
    }

    !inUse && unusedOptionsList.push(options)
  }

  return unusedOptionsList
}

const filterOptionsListByValue = ({value, optionsList}) => {
  const filteredOptionsList = []

  for (let i = 0; i < optionsList.length; ++i) {
    const options = optionsList[i]

    if (options.value !== value) {
      continue
    }

    filteredOptionsList.push(options)
  }

  return filteredOptionsList
}

const cartesianProduct = (index, currentVariation, variations, variants) => {
  if (index === variations.length) {
    variants.push([...currentVariation]) // cloning the array to avoid reference issues...

    return
  }

  const variation = variations[index]

  for (let i = 0; i < variation.variationValues.length; ++i) {
    currentVariation[index] = {
      variationId: variation.variationId,
      variationType: variation.variationType,
      variationValue: variation.variationValues[i],
    }

    cartesianProduct(index + 1, currentVariation, variations, variants)
  }
}

const generateVariants = (variations) => {
  const variants = []

  cartesianProduct(0, [], variations, variants)

  // iterating over all the variants...
  // note: this iteration is also important to make sure that
  // we don't have reference to the same variation object
  // in multiple variants array...
  for (let i = 0; i < variants.length; ++i) {
    // generating unique ID for each variant...
    // note 1: this value does not go to the backend...
    // note 2: this value is used to uniquely identify a variant...
    const variantId = generateUniqueId()
    const variations = variants[i]

    // iterating over all the variations of a variant...
    for (let j = 0; j < variations.length; ++j) {
      const _variation = variations[j]
      // creating and assigning new variation instance...
      const variation = Object.create(null)
      // assigning variant ID to each variant...
      variation.variantId = variantId
      variation.variationId = _variation.variationId
      variation.variationType = _variation.variationType
      variation.variationValue = _variation.variationValue
      variations[j] = variation
    }

    const defaultProductData = ProductsService.getDefaultProductData()
    // creating and assigning an object to hold variant data...
    const variant = Object.create(null)
    variant.variantId = variantId
    variant.variations = variations
    variant.dimensions = defaultProductData.dimensions
    variant.price = defaultProductData.price
    variant.price.variationType = ''
    variant.price.variationValue = ''
    variants[i] = variant
  }

  return variants
}

/**
 * @returns {{
 * variationId: String,
 * variationType: String,
 * variationValues: Array<any>,
 * variationError: String,
 * }}
 */
const createVariation = () => {
  const variation = Object.create(null)
  variation.variationId = generateUniqueId()
  variation.variationType = ''
  variation.variationValues = []
  variation.variationError = ''

  return variation
}

// note: this method converts values (as an array of strings)
// to Tagify supported values...
const processValues = (values) => {
  if (!isArray(values) || !values.length) {
    return []
  }

  const processedValues = []

  for (const value of values) {
    processedValues.push({
      value: value,
      label: value,
    })
  }

  return processedValues
}

const Variations = ({variations, onChange}) => {
  const [_variations, setVariations] = useState(
    isArray(variations) && variations.length ? variations : [createVariation()]
  )

  const onAddButtonClicked = (event) => {
    if (_variations.length > 2) {
      return
    }

    const variations = addToArray(createVariation(), _variations)

    setVariations(variations)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: 'ADD',
          value: variations,
        },
      })
  }

  const onDeleteButtonClicked = ({index, variationId, event}) => {
    if (_variations.length < 1) {
      return
    }

    const variations = removeFromArrayOfObjectsByValue('variationId', variationId, _variations)

    setVariations(variations)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: 'DELETE',
          value: variations,
        },
      })
  }

  const onTagsChanged = ({index, variationId, name, value}) => {
    const variation = findFromArrayOfObjectsByValue('variationId', variationId, _variations)

    if (!variation) {
      return
    }

    variation[name] = value

    const variations = [..._variations]

    setVariations(variations)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: variations,
        },
      })
  }

  const onGenerateButtonClicked = (event) => {
    let errorFound = false

    // note 1: event.target.value contains variations...
    // note 2: this loop validates the variations...
    for (const variation of _variations) {
      // if variation name/type is undefined, null, empty or white-space...
      if (isUndefinedNullOrWhiteSpaceString(variation.variationType)) {
        errorFound = true
        // we'll show an error message...
        variation.variationError = 'Please enter a variant type'

        setVariations([..._variations])

        continue
      }

      // if variant values is not an array or the length of the array is zero (0)...
      if (!isArray(variation.variationValues) || !variation.variationValues.length) {
        errorFound = true
        // we'll show an error message...
        variation.variationError =
          'Please enter value(s) for variant type, ' + variation.variationType.toLowerCase()

        setVariations([..._variations])

        continue
      }
    }

    if (errorFound) {
      return
    }

    // note: this loop shall reset all the error messages...
    for (const variation of _variations) {
      // we'll reset the error message...
      variation.variationError = ''
    }

    // repaints the variation card to clear the errors...
    setVariations([..._variations])

    const variants = generateVariants(_variations)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: 'GENERATE',
          value: _variations,
          variants: variants,
        },
      })
  }

  return (
    <div className='card-body py-0'>
      <div id='kt_docs_repeater_basic'>
        <div className='form-group'>
          <div data-repeater-list='kt_docs_repeater_basic'>
            {_variations.map((variation, index) => (
              <div key={variation.variationId} data-repeater-item>
                <div className='row g-3 mb-2'>
                  <div className='col-sm-3'>
                    {!index && (
                      <ToolTipLabel
                        label='Variation type'
                        tooltip='Select or enter a variation type (e.g. color, size etc.)'
                      />
                    )}
                    <CustomTagify
                      clearable={false}
                      identifier={variation.variationId}
                      name='variationType'
                      placeholder='Variation type'
                      allowMultipleSelect={false}
                      // values={filterOptionsListByValue({ value: variation.variationType ?? '', optionsList: optionsList, })}
                      suggestions={getUnusedOptionsList({
                        variationIndex: index,
                        variations: _variations,
                        optionsList: optionsList,
                      })}
                      onChange={(event) =>
                        onTagsChanged({
                          index: index,
                          variationId: variation.variationId,
                          name: event.target.name,
                          value: event.target.valuesOnly[0] ?? '',
                        })
                      }
                    />
                  </div>
                  <div className='col'>
                    {!index && (
                      <ToolTipLabel
                        label='Variant value'
                        tooltip='Enter the product variant value like black, white, 1kg, xl etc.'
                      />
                    )}
                    <CustomTagify
                      clearable={true}
                      identifier={variation.variationId}
                      name='variationValues'
                      placeholder={`Select or enter ${variation.variationType.toLowerCase()} value(s)`}
                      suggestions={processValues(
                        filterOptionsListByValue({
                          value: variation.variationType ?? '',
                          optionsList: optionsList,
                        })?.[0]?.list
                      )}
                      onChange={(event) =>
                        onTagsChanged({
                          index: index,
                          variationId: variation.variationId,
                          name: event.target.name,
                          value: event.target.valuesOnly,
                        })
                      }
                    />
                  </div>
                  {_variations.length > 1 && (
                    <div className='col-auto'>
                      <button
                        type='button'
                        className={[
                          'btn btn-icon btn-light-danger',
                          !index ? 'mt-3 mt-md-8' : '',
                        ].join(' ')}
                        data-repeater-delete
                        onClick={(event) =>
                          onDeleteButtonClicked({
                            index: index,
                            variationId: variation.variationId,
                            event: event,
                          })
                        }
                      >
                        <i className='la la-trash-o fs-2' />
                      </button>
                    </div>
                  )}
                </div>
                {/* error message is shown here */}
                <div className='text-danger mt-2'>{variation.variationError ?? ''}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='form-group mt-5 text-end'>
          <button
            type='button'
            className='btn btn-light-primary btn-sm'
            disabled={_variations.length > 2}
            onClick={onAddButtonClicked}
          >
            <i className='la la-plus' />
            Add
          </button>

          <button
            type='button'
            className='btn btn-sm btn-dark ms-5'
            onClick={onGenerateButtonClicked}
          >
            <span className='indicator-label'>Generate</span>
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

const getErrorMessage = (errorFieldName, touches, errors) => {
  const touched = touches?.[errorFieldName];

  if (!touched) { return ''; }

  return errors?.[errorFieldName] ?? '';
};

const getAnyErrorMessage = (errorFieldNames, touches, errors) => {
  for (const errorFieldName of errorFieldNames) {
    const errorMessage = getErrorMessage(errorFieldName, touches, errors);

    // if error message is not empty, we shall return the error message...
    if (errorMessage.length) { return errorMessage; }
  }

  return '';
};

const Variant = ({index, name, defaultThumbnail, variant, onChange, onDelete}) => {
  const { touches, errors, } = useSelector(state => state.productFormErrors);
  const sellingPriceErrorMessage = getAnyErrorMessage([
    `variants[${index}].price.sellingPrice`,
    `variants[${index}].price.discount.discountPercentage`,
    `variants[${index}].price.discount.discountAmount`,
    `variants[${index}].price.discount.discountStartDate`,
    `variants[${index}].price.discount.discountEndDate`,
  ], touches, errors);
  const dimensionsErrorMessage = getAnyErrorMessage([
    `variants[${index}].dimensions.width`,
    `variants[${index}].dimensions.length`,
    `variants[${index}].dimensions.weight`,
    `variants[${index}].dimensions.height`,
  ], touches, errors);
  const [_variant, _setVariant, updateVariant] = useStateEnhanced({
    initialValue: variant,
  })

  const onInputValueChanged = (event) => {
    const {updatedData} = updateVariant({[event.target.name]: event.target.value})

    typeof onChange === 'function' &&
      onChange({
        target: {
          index: index,
          name: name ?? '',
          value: updatedData,
        },
      })
  }

  const onImageCropped = ({data}) => {
    const _data = isArray(data) ? data : []
    const {updatedData} = updateVariant({
      thumbnail: {
        src: _data[0],
        alt: _data[1],
      },
    })

    typeof onChange === 'function' &&
      onChange({
        target: {
          index: index,
          name: name ?? '',
          value: updatedData,
        },
      })
  }

  const onDeleteButtonClicked = (event) => {
    typeof onDelete === 'function' &&
      onDelete({
        target: {
          index: index,
          name: name ?? '',
          value: _variant,
        },
      })
  }

  useEffectEnhanced(() => {
    // we shall not update the thumbnail if the thumbnail is not empty...
    if (!isUndefinedNullOrWhiteSpaceString(_variant.thumbnail?.src)) {
      return
    }

    const {updatedData} = updateVariant({thumbnail: defaultThumbnail})

    typeof onChange === 'function' &&
      onChange({
        target: {
          index: index,
          name: name ?? '',
          value: updatedData,
        },
      })
  }, [defaultThumbnail])

  return (
    <tr>
      {/* generating custom inputs */}
      {isArray(_variant.variations) &&
        !!_variant.variations.length &&
        _variant.variations.map((variation) => {
          return (
            <td key={`${variation.variationId}${variation.variantId}`}>
              <input
                type='text'
                className='form-control form-control-solid'
                value={variation.variationValue ?? ''}
                readOnly
              />
            </td>
          )
        })}
      <td>
        <FormField
          type='number'
          name='quantity'
          value={_variant.quantity ?? ''}
          placeholder='quantity'
          minimum={0}
          maximumLength={8}
          onChange={onInputValueChanged}
          className='w-80'
        />
        {/* <StockModal name='qty' value={_variant.qty ?? ''} onChange={onInputValueChanged} /> */}
      </td>
      <td>
        <FormField
          type='number'
          name='purchasePrice'
          errorFieldName={`variants[${index}].purchasePrice`}
          placeholder='price'
          minimum={0}
          maximumLength={8}
          value={_variant.purchasePrice ?? ''}
          onChange={onInputValueChanged}
          className='w-80'
        />
      </td>
      <td>
        <VariantPriceInput index={index} name='price' data={_variant.price} onChange={onInputValueChanged} />
        {!!sellingPriceErrorMessage.length && <div className='text-danger mt-2'>{sellingPriceErrorMessage}</div>}
      </td>
      <td>
        <VariantDimensionsInput
          errorFieldNamePrefix={`variants[${index}].`}
          name='dimensions'
          data={_variant.dimensions}
          onChange={onInputValueChanged}
        />
        {!!dimensionsErrorMessage.length && <div className='text-danger mt-2'>{dimensionsErrorMessage}</div>}
      </td>
      <td>
        <CropperComponents
          className='w-75px h-50px'
          src={_variant.thumbnail?.src}
          width={600}
          height={620}
          onCroped={(data) => onImageCropped({data})}
        />
      </td>
      <td className='text-end'>
        <button
          type='button'
          onClick={onDeleteButtonClicked}
          className='btn btn-icon btn-sm btn-light-danger'
        >
          <i className='la la-trash-o' />
        </button>
      </td>
    </tr>
  )
}

export const VariationCard = ({defaultThumbnail, dimensionsVisible, variants, name, onChange}) => {
  const [_variants, setVariants] = useState(isArray(variants) ? variants : [])

  const onVariationsChanged = (event) => {
    if (event.target.name !== 'GENERATE') {
      return
    }

    // const variations = event.target.value;
    const variants = event.target.variants

    setVariants(variants)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: variants,
        },
      })
  }

  const onVariantChanged = (event) => {
    // updating data...
    _variants[event.target.index] = event.target.value

    const variants = [..._variants]

    setVariants(variants)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: variants,
        },
      })
  }

  const onVariantDeleted = (event) => {
    const variant = event.target.value
    // removing variant from the array and getting the updated array (new array)...
    const variants = removeFromArrayOfObjectsByValue('variantId', variant.variantId, _variants)

    setVariants(variants)

    typeof onChange === 'function' &&
      onChange({
        target: {
          name: name,
          value: variants,
        },
      })
  }

  return (
    <>
      <Variations onChange={onVariationsChanged} />
      <div className='separator separator-dashed border-dark my-4' />
      <div className='variable-container'>
        {!!_variants.length && (
          <table className='table table-row-dashed table-row-gray-300 g-1'>
            <thead>
              <tr className='fw-bolder fs-6 text-gray-800'>
                {_variants[0].variations.map((variation) => {
                  return <th key={`${variation.variationId}@th`}>{variation.variationType}</th>
                })}
                <th>Stock</th>
                <th>Purchase Price (৳)</th>
                <th>Price (৳)</th>
                {dimensionsVisible && <th>Dimensions</th>}
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {_variants.map((variant, index) => {
                // note: selecting the first variation of each variant because,
                // all the variations of a variant contains the same variant ID...
                return (
                  <Variant
                    key={`${variant.variantId}@variant`}
                    index={index}
                    defaultThumbnail={defaultThumbnail}
                    variant={variant}
                    onChange={onVariantChanged}
                    onDelete={onVariantDeleted}
                  />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

import { CardHeader } from './CardHeader';
import { FormField } from './FormField';
import { productLengthUnitSelectOptions, productWeightUnitSelectOptions } from '../../../constants';
import { isArray } from '../../../../common';
import { useStateEnhanced } from '../../../hooks';

const InputWithSelectFormField = ({
  data, errors, onChange, inputFieldType, minimumInputValue, maximumInputLength,
  inputFieldName, inputErrorFieldName, inputFieldLabel, inputFieldTooltip, inputFieldPlaceholder, selectFieldName,
  selectFieldOptions, required,
}) => {
  return <FormField
    type={inputFieldType ?? 'text'}
    minimum={minimumInputValue}
    maximumLength={maximumInputLength}
    name={inputFieldName}
    errorFieldName={inputErrorFieldName}
    label={inputFieldLabel}
    tooltip={inputFieldTooltip}
    placeholder={inputFieldPlaceholder}
    childOrder='after'
    value={data?.[inputFieldName] ?? ''}
    errors={errors}
    onChange={onChange}
    required={required}>
    {isArray(selectFieldOptions) && <div className='input-group-text p-0'>
      <FormField type='select' name={selectFieldName} value={data?.[selectFieldName] ?? ''} data={data} errors={errors} onChange={onChange}>
        {selectFieldOptions.map(selectFieldOption => {
          return <option value={selectFieldOption.id} key={selectFieldOption.id}>
            {selectFieldOption.label}
          </option>;
        })}
      </FormField>
    </div>}
  </FormField>;
};

export const DimensionsInput = ({ name, errorFieldNamePrefix, data, errors, onChange, }) => {
  const [_data, _setData, updateData,] = useStateEnhanced({
    initialValue: data ?? {},
  });

  const onInputValueChanged = event => {
    const { updatedData, } = updateData({ [event.target.name]: event.target.value, });

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: updatedData,
      },
    });
  };

  return <div className='card-body py-0'>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
      <div className='mb-5 fv-row'>
        <InputWithSelectFormField
          minimumInputValue={0}
          maximumInputLength={8}
          data={_data}
          errors={errors}
          onChange={onInputValueChanged}
          inputFieldType='number'
          inputFieldName='weight'
          inputErrorFieldName={`${errorFieldNamePrefix}dimensions.weight`}
          inputFieldLabel='Weight'
          inputFieldTooltip='Set the weight of your product/variant'
          inputFieldPlaceholder='Enter the weight of your product/variant'
          selectFieldName='weightUnitId'
          selectFieldOptions={productWeightUnitSelectOptions}
          required />
      </div>
      <div className='mb-5 fv-row'>
        <InputWithSelectFormField
          minimumInputValue={0}
          maximumInputLength={8}
          data={_data}
          errors={errors}
          onChange={onInputValueChanged}
          inputFieldType='number'
          inputFieldName='length'
          inputErrorFieldName={`${errorFieldNamePrefix}dimensions.length`}
          inputFieldLabel='Length'
          inputFieldTooltip='Set the length of your product/variant'
          inputFieldPlaceholder='Enter the length of your product/variant'
          selectFieldName='lengthUnitId'
          selectFieldOptions={productLengthUnitSelectOptions}
          required />
      </div>
    </div>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-2'>
      <div className='mb-5 fv-row'>
        <InputWithSelectFormField
          minimumInputValue={0}
          maximumInputLength={8}
          data={_data}
          errors={errors}
          onChange={onInputValueChanged}
          inputFieldType='number'
          inputFieldName='width'
          inputErrorFieldName={`${errorFieldNamePrefix}dimensions.width`}
          inputFieldLabel='Width'
          inputFieldTooltip='Set the width of your product'
          inputFieldPlaceholder='Enter the width of your product'
          selectFieldName='lengthUnitId'
          selectFieldOptions={productLengthUnitSelectOptions}
          required />
      </div>
      <div className='mb-5 fv-row'>
        <InputWithSelectFormField
          minimumInputValue={0}
          maximumInputLength={8}
          data={_data}
          errors={errors}
          onChange={onInputValueChanged}
          inputFieldType='number'
          inputFieldName='height'
          inputErrorFieldName={`${errorFieldNamePrefix}dimensions.height`}
          inputFieldLabel='Height'
          inputFieldTooltip='Set the height of your product'
          inputFieldPlaceholder='Enter the height of your product'
          selectFieldName='lengthUnitId'
          selectFieldOptions={productLengthUnitSelectOptions}
          required />
      </div>
    </div>
  </div>;
};

export const DimensionsCard = ({ name, data, errors, onChange, }) => {

  return <div className='card card-flush py-4'>
    <CardHeader title='Dimensions' />
    <DimensionsInput name={name} errorFieldNamePrefix='' data={data} errors={errors} onChange={onChange} />
  </div>;
};

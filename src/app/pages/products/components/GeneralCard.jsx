import { AdditionalInfo } from './AdditionalInfo';
import { FormField } from './FormField';
import { CardHeader } from './CardHeader';
import { useStateEnhanced } from '../../../hooks';
import slugify from 'react-url-slugify';

export const GeneralCard = ({ name, data, errors, onChange, }) => {
  const [_data, _setData, updateData] = useStateEnhanced({
    initialValue: data ?? {},
  });

  const onInputValueChanged = event => {
    const modifiedData = { [event.target.name]: event.target.value, };

    if (['productName', 'productSlug'].includes(event.target.name)) {
      modifiedData.productSlug = slugify(event.target.value);
    }

    const { updatedData, } = updateData(modifiedData);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: updatedData,
      },
    });
  };

  return <div className='card card-flush py-4'>
    <CardHeader title='General' />

    <div className='card-body py-0'>
      <div className='mb-5 fv-row'>
        <FormField
          type='text'
          name='productName'
          errorFieldName='general.productName'
          label='Product name'
          placeholder='Enter a name for your product'
          tooltip='A product name is useful for identifying a product'
          maximumLength={500}
          value={_data.productName}
          onChange={onInputValueChanged}
          required />
      </div>
      <div className='mb-5 fv-row'>
        <FormField
          type='text'
          name='productSlug'
          errorFieldName='general.productSlug'
          label='Product URL'
          placeholder='Choose how you want your product URL to be'
          tooltip='You may choose to go with the auto generated product URL but a customized (and unique) one is always recommended'
          inputGroupText='https://example.com/products/'
          maximumLength={500}
          value={_data.productSlug}
          onChange={onInputValueChanged}
          required />
      </div>
      <div className='mb-5 fv-row'>
        <FormField
          type='textEditor'
          name='productShortDescription'
          errorFieldName='general.productShortDescription'
          label='Description'
          placeholder='Write a short, simple note to describe your product'
          tooltip='Customers are more inclined to buy your product if it has a clear, concise description'
          tooltipRequired={true}
          maximumLength={410000000}
          value={_data.productShortDescription}
          onChange={onInputValueChanged} />
      </div>
      <AdditionalInfo
        maximumLabelLength={500}
        name='additionalInfoList'
        additionalInfoList={_data.additionalInfoList}
        errors={errors}
        onChange={onInputValueChanged} />
    </div>
  </div>;
};

{/**
* setFieldValue('product_name', e.target.value)
  setFieldValue('product_slug', slugify(e.target.value))
  setFieldValue('seo.meta_tag_title', slugify(e.target.value))
*/}

import { FormField } from "./FormField";
import { useStateEnhanced } from '../../../hooks';
import { DiscountSection } from './DiscountSection';

export const PriceCard = ({ name, showQuantityField, data, errors, onChange, }) => {
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
    <div className='row row-cols-1 row-cols-sm-3 row-cols-lg-3'>
      <div className='mb-5 fv-row'>
        <FormField
          type='number'
          name='purchasePrice'
          errorFieldName='price.purchasePrice'
          label='Purchase price (৳)'
          tooltip='Set the purchase price of your product'
          placeholder='Enter the purchase price of your product'
          minimum={0}
          maximumLength={8}
          value={_data.purchasePrice}
          errors={errors}
          onChange={onInputValueChanged}
          required />
      </div>
      <div className='mb-5 fv-row'>
        <FormField
          type='number'
          name='sellingPrice'
          errorFieldName='price.sellingPrice'
          label='Price (৳)'
          tooltip='Set the selling price of your product'
          placeholder='Enter the selling price of your product'
          minimum={0}
          maximumLength={8}
          value={_data.sellingPrice}
          errors={errors}
          onChange={onInputValueChanged}
          required />
      </div>
      {showQuantityField !== false && <div className='mb-5 fv-row'>
        <FormField
          type='number'
          name='quantity'
          label='Quantity'
          placeholder='Enter the quantity of your product'
          tooltip='You may set the initial product quantity or you may update it later'
          minimum={0}
          maximumLength={8}
          value={_data.quantity}
          onChange={onInputValueChanged}
          required={false} />
      </div>}
    </div>

    <DiscountSection
      sellingPrice={_data.sellingPrice ?? ''}
      noDiscountSelectionVisible={true}
      name='discount'
      data={_data.discount}
      onChange={onInputValueChanged} />
  </div>;
};

// discountStartDate

// moment(values.variants[index || 0].price.discountStartDate).format('YYYY-MM-DD')

// setFieldValue(
//   `variants[${index || 0}].price.discountStartDate`,
//   moment(e.target.value).format('YYYY-MM-DD hh:mm:ss')
// )


import { generateUniqueId } from '../../../../common';
import { useStateEnhanced } from '../../../hooks';
import { CardHeader } from './CardHeader';
import { FormField } from './FormField';

export const InventoryCard = ({ name, data, onChange, }) => {
  const [_data, _setData, updateData,] = useStateEnhanced({
    initialValue: data ?? {},
  });

  const onInputValueChanged = event => {
    const { updatedData, } = updateData({
      [event.target.name]: event.target.value,
    });

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: updatedData,
      },
    });
  };

  return <div className='card card-flush py-4'>
    <CardHeader title='Inventory' />

    <div className='card-body py-0'>
      <div className='row row-cols-1 row-cols-sm-1'>
        <div className='mb-5 fv-row'>
          <FormField
            type='text'
            name='sku'
            label='SKU'
            placeholder='Enter your preferred SKU'
            tooltip='SKU is useful to uniquely identify your product'
            required={false}
            value={_data.sku}
            maximumLength={40}
            onChange={onInputValueChanged} />
        </div>
      </div>
    </div>
  </div>
};

import { ToolTipLabel } from '../../../modules/helper/misc';
import { CardHeader } from './CardHeader';
import { ToggleSwitch } from './ToggleSwitch';
import { useStateEnhanced } from '../../../hooks';

const ConfigurationField = ({ label, tooltipLabel, name, value, required, tooltip, onChange, }) => {
  return <>
    <ToolTipLabel
      label={tooltipLabel ?? ''}
      className={required ? 'required' : ''}
      tooltip={tooltip ?? ''} />

    <div className='separator mb-2' />

    <ToggleSwitch
      name={name}
      label={label ?? ''}
      labelPosition='right'
      checked={value}
      onChange={onChange} />
  </>;
};

export const ConfigurationCard = ({ name, data, onChange, }) => {
  const [_data, _setData, updateData,] = useStateEnhanced({
    initialValue: data ?? {},
  });

  const onInputValueChanged = event => {
    const { updatedData, } = updateData({ [event.target.name]: event.target.checked, });

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: updatedData,
      },
    });
  };

  return <div className='card card-flush py-4 mt-5'>
    <CardHeader title='Configuration' />
    <div className='card-body py-0'>
      <ConfigurationField
        required={false}
        name='priceVisible'
        label=''
        tooltipLabel='Price visible to client'
        tooltip={'If you disable this option your clients won\'t know about the price of this product'}
        value={_data.priceVisible ?? false}
        onChange={onInputValueChanged} />

      <div className='p-2' />

      <ConfigurationField
        required={false}
        name='addableToCart'
        label=''
        tooltipLabel='Product addable to cart'
        tooltip={'If you disable this option your clients won\'t be able to add this product to cart'}
        value={_data.addableToCart ?? false}
        onChange={onInputValueChanged} />
    </div>

    <div className='p-1' />
  </div>;
};

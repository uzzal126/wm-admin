import { useStateEnhanced } from '../../../hooks';
import { CardHeader } from './CardHeader';
import { DynamicInfoCard } from './DynamicInfoCard';
import { FormField } from './FormField';
import { ToggleSwitch } from './ToggleSwitch';

const CustomRadioButton = ({ name, text, value, checked, onChange, }) => {
  return <label className={[
    'btn btn-outline btn-color-muted btn-active-success',
    checked ? 'active' : ''].join(' ')}>
    <input type='radio' className='btn-check' name={name} value={value} checked={checked} onChange={onChange} />
    {text}
  </label>;
};

export const OverviewCard = ({ maximumLabelLength, name, data, onChange, }) => {
  const [_data, _setData, updateData,] = useStateEnhanced({
    initialValue: data ?? {
      method: '1',
      data: [],
    },
  });

  const onInputValueChanged = event => {
    let data;

    if (event.target.name === 'has') {
      data = updateData({
        has: event.target.checked,
        method: event.target.checked === true ? '1' : '',
      });
    } else {
      data = updateData({
        [event.target.name]: event.target.value,
      });
    }

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: data.updatedData,
      },
    });
  };

  return <div className='card card-flush py-4'>
    <CardHeader
      title='Overview'
      tooltip='Set the product description page (eg. Mobile specification page).'>
      <ToggleSwitch
        name='has'
        label=''
        checked={_data.has ?? false}
        onChange={onInputValueChanged} />
    </CardHeader>

    {_data.has && <div className='card-body py-0'>
      <div className='fv-row py-3'>
        <div className='btn-group'>
          <CustomRadioButton name='method' text='From URL' value='1' checked={_data.method === '1'} onChange={onInputValueChanged} />
          <CustomRadioButton name='method' text='Custom page' value='2' checked={_data.method === '2'} onChange={onInputValueChanged} />
        </div>

        {_data.method === '1' && <div className='mt-2 border border-dashed rounded p-4'>
          <FormField
            type='text'
            name='url'
            label=''
            required={false}
            placeholder={'Enter the link to your product\'s specification/overview page'}
            tooltip=''
            maximumLength={450}
            value={_data.url}
            onChange={onInputValueChanged} />
        </div>}

        {_data.method === '2' && <DynamicInfoCard
          modalTitle='Add an overview section'
          name='data'
          smallAddButtonText='Add'
          maximumLabelLength={maximumLabelLength}
          largeAddButtonText='Add section'
          labelPlaceholder='Enter an overview label'
          infoList={_data.data}
          onChange={onInputValueChanged} />}
      </div>
    </div>}
  </div>;
};

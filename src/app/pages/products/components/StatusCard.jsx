import { isUndefinedNullOrWhiteSpaceString } from '../../../../common';
import { CardHeader } from './CardHeader';
import { CustomTagify } from './CustomTagify';
import { useStateEnhanced } from '../../../hooks';

export const StatusCard = ({ name, statusDataList, data, errors, onChange, }) => {
  const [_data, _setData, updateData,] = useStateEnhanced({
    initialValue: data ?? {},
  });
  
  const onInputValueChanged = event => {
    const { updatedData, } = updateData({
      [event.target.name]: event.target.name === 'status'
        ? event.target.value[0]
        : event.target.value,
    });

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: updatedData,
      },
    });
  };

  return <div className='card card-flush py-4 mb-5'>
    <CardHeader
      showGreenDot={true}
      title='Status'
      tooltip='Select the status of your product'
      tooltipRequired={false} />

    {!isUndefinedNullOrWhiteSpaceString(errors?.[name]) && <div className='text-danger mt-2'>{errors[name]}</div>}

    <div className='card-body py-0'>
      <CustomTagify
        creatable={false}
        clearable={false}
        allowMultipleSelect={false}
        name='status'
        placeholder='Select status'
        value={_data.status ?? {}}
        suggestions={statusDataList}
        onChange={onInputValueChanged} />

      {_data.status?.value === 2 && <div className='mt-10'>
        <label className='form-label'>Select publishing date and time</label>
        <input
          type='datetime-local'
          className='form-control'
          name='scheduledAt'
          value={_data.scheduledAt ?? ''}
          onChange={onInputValueChanged} />
      </div>}
    </div>

    <div className='p-2' />
  </div>;
};

{/* <Flatpickr
  placeholder='Pick date &amp; time'
  className='form-control'
  data-enable-time
  value={values.scheduled_at}
  onChange={([date]) =>
  setFieldValue('scheduled_at', moment(date).format('YYYY-MM-DD hh:mm:ss'))
  } /> */}

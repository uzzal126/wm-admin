import { useState } from 'react';
import { productWeightUnitSelectOptions } from '../../../constants';
import { isNumber } from '../../../../common';
import { DimensionsInput } from './DimensionsCard';
import { MenuComponent } from '../../../../_metronic/assets/ts/components';
import { useEffectEnhanced } from '../../../hooks';

export const VariantDimensionsInput = ({ errorFieldNamePrefix, name, data, onChange, }) => {
  const [text, setText] = useState('');

  useEffectEnhanced(() => {
    MenuComponent.reinitialization();
  }, []);

  useEffectEnhanced(() => {
    if (!data) { return setText('0 X 0 X 0 - 0 kg'); }

    const weightUnitIndex = isNumber(data.weightUnitId) ? parseInt(data.weightUnitId) - 1 : 0;
    const weightUnit = productWeightUnitSelectOptions[weightUnitIndex].label;

    setText(`${data.length ? data.length : 0} X ${data.width ? data.width : 0} X ${data.height ? data.height : 0} - ${data.weight ? data.weight : 0} ${weightUnit}`);
  }, [data]);

  return <>
    <button
      disabled={false}
      type='button'
      className='form-control btn border'
      data-kt-menu-trigger='click'
      data-kt-menu-placement='bottom-end'>
      {text}
    </button>

    <div className='menu menu-sub menu-sub-dropdown w-350px w-md-400px' data-kt-menu='true' onClick={event => event.stopPropagation()}>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Dimensions</div>
      </div>

      <div className='separator border-gray-200' />

      <div className='px-1 py-5' data-kt-user-table-filter='form'>
        <DimensionsInput errorFieldNamePrefix={errorFieldNamePrefix} name={name} data={data} onChange={onChange} />
      </div>
    </div>
  </>
};

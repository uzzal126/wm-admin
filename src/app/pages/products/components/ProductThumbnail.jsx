import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isArray, isUndefinedNullOrWhiteSpaceString } from '../../../../common';
import CropperComponents from '../../../modules/components/cropper/CropperComponents';
import { OnlyTooltip } from '../../../modules/helper/misc';
import { useEffectEnhanced } from '../../../hooks';

export const ProductThumbnail = ({ name, errorFieldName, data, onChange, className, }) => {
  const [_data, setData] = useState(data ?? { src: '', alt: '', });
  const { errors, } = useSelector(state => state.productFormErrors);
  const errorFieldNameProvided = !isUndefinedNullOrWhiteSpaceString(errorFieldName);
  const errorMessage = errorFieldNameProvided ? errors?.[errorFieldName] ?? '' : '';

  const onThumbnailCropped = data => {
    if (!isArray(data) || data.length < 2) { return; }

    const value = Object.create(null);
    value.src = data[0];
    value.alt = data[1];

    setData(value);

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  useEffectEnhanced(() => {
    setData(data ?? { src: '', alt: '', });
  }, [data]);

  return <div className={[className, 'card card-flush py-4'].join(' ')}>
    <div className='card-header min-h-auto'>
      <div className='card-title pb-2'>
        <h3>
          Thumbnail <small>(600px x 620px)</small>
          <OnlyTooltip
            className='required'
            tooltip='Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted.' />
        </h3>
      </div>
    </div>
    <div className='card-body text-center py-0'>
      <CropperComponents
        isRemove={true}
        width={600}
        height={620}
        src={_data.src}
        onCroped={onThumbnailCropped} />
      {/* {touched.thumbnail && !values.thumbnail.src && (
        <div className='text-danger mt-2'>Thumbnail is required</div>
      )} */}

      {errorFieldNameProvided && !!errorMessage.length && <div className='text-danger mt-2'>{errorMessage}</div>}
    </div>
  </div>;
};

import { isArray } from '../../../../common';
import { useStateEnhanced } from '../../../hooks';
import CropperComponents from '../../../modules/components/cropper/CropperComponents';
import { CardHeader } from './CardHeader';
import { FormField } from './FormField';

const DEFAULT_IMAGES = [
  { src: '', alt: '' },
  { src: '', alt: '' },
  { src: '', alt: '' },
  { src: '', alt: '' },
  { src: '', alt: '' },
];

export const GalleryCard = ({ name, data, errors, onChange, }) => {
  const [_data, _setData, updateData] = useStateEnhanced({
    initialValue: data ?? {
      images: DEFAULT_IMAGES,
    },
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

  const onImageChanged = ({ index, data, }) => {
    const images = isArray(_data.images) ? [..._data.images] : DEFAULT_IMAGES;
    images[index] = {
      src: data[0],
      alt: data[1],
    };

    const { updatedData, } = updateData({ images: images, });

    typeof onChange === 'function' && onChange({
      target: {
        index: index,
        name: name ?? '',
        value: updatedData,
      },
    });
  };

  return <div className='card card-flush py-4'>
    <CardHeader title='Gallery' tooltip={'Adding photos to your product\'s media gallery can help you allure more customers'} />
    <div className='card-body py-0'>
      <div className='fv-row mb-2 d-flex'>
        {isArray(_data.images) && !!_data.images.length && _data.images.map((image, index) => {
          return <CropperComponents
            key={index}
            full={true}
            isRemove={true}
            className='w-100 h-150px'
            width={600}
            height={620}
            src={image.src}
            onCroped={data => onImageChanged({ index, data, })} />;
        })}
        <div className='text-danger mt-2'>
          {errors?.[name] ?? ''}
        </div>
      </div>
      <div className='mb-5 fv-row'>
        <FormField
          label='Video URL'
          type='text'
          name='videoUrl'
          tooltip={'Adding video to your product\'s media gallery can help you showcase your product better'}
          placeholder='Add a link to your product description video'
          value={_data.videoUrl}
          maximumLength={250}
          onChange={onInputValueChanged}
          required={false} />
      </div>
    </div>
  </div>;
};

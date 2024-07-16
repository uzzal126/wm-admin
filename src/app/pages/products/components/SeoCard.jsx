import { useEffectEnhanced, useStateEnhanced } from '../../../hooks';
import { CardHeader } from './CardHeader';
import { FormField } from './FormField';

export const SeoCard = ({ name, productSlug, data, onChange, }) => {
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

  useEffectEnhanced(() => {
    updateData({ title: productSlug, });
  }, [productSlug]);

  return <div className='card card-flush py-4'>
    <CardHeader
      title='SEO Options'
      tooltip='You may use these options to optimize your product for search engines like Google, Bing etc.' />

    <div className='card-body pt-0'>
      <div className='mb-5'>
        <FormField
          type='text'
          name='title'
          label='Title'
          tooltip='This title is only visible to the search engines and not to your customers'
          placeholder='Enter a short and catchy title for your product'
          maximumLength={250}
          value={_data.title}
          required={false}
          onChange={onInputValueChanged} />
      </div>

      <div className='mb-5'>
        <FormField
          type='textarea'
          name='description'
          label='Description'
          tooltip='This description is only visible to the search engines and not to your customers'
          placeholder='Enter a short description of your product'
          maximumLength={250}
          value={_data.description}
          required={false}
          onChange={onInputValueChanged} />
      </div>

      <div>
        <FormField
          type='text'
          name='keywords'
          label='Keywords'
          tooltip='These keywords are only visible to the search engines and not to your customers'
          placeholder='Enter keywords separated by commas (e.g. affordable, elegant etc.)'
          maximumLength={250}
          value={_data.keywords}
          required={false}
          onChange={onInputValueChanged} />
      </div>

      <div className='mt-3'>
        <label className='form-label'>Preview</label>
        <div className='d-flex align-items-center'>
          <div className='flex-grow-1'>
            <p className='fw-bolder text-primary fs-5 mb-0'>{_data.title ?? ''}</p>
            <span className='text-success d-block'>{`https://example.com/products/${productSlug ?? ''}`}</span>
            <span className='d-block'>
              <span className='text-muted'>{`${new Date().toLocaleDateString()} - `}</span>{' '}
              {_data.description ?? ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
};

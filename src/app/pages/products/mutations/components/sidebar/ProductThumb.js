import {ErrorMessage, Field, useFormikContext} from 'formik'
import CropperComponents from '../../../../../modules/components/cropper/CropperComponents'
import {OnlyTooltip} from '../../../../../modules/helper/misc'

const defaultImage = '/media/products/dummy-product.jpg'

const ProductThumb = ({className}) => {
  const {values, setFieldValue, touched} = useFormikContext()

  const handleCroped = (e) => {
    setFieldValue('thumbnail', {
      alt: e[1],
      src: e[0],
    })
    setFieldValue('variants[0].thumbnail', {
      alt: e[1],
      src: e[0],
    })
  }

  return (
    <div className={`${className} card card-flush py-4`}>
      <div className='card-header min-h-auto'>
        <div className='card-title pb-2'>
          <h3>
            Thumbnail <small>(600px x 620px)</small>
            <OnlyTooltip
              tooltip='Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted.'
              className={'required'}
            />
          </h3>
        </div>
      </div>
      <div className='card-body text-center py-0'>
        <CropperComponents
          onCroped={handleCroped}
          width={600}
          height={620}
          src={values.thumbnail.src || defaultImage}
        />
        {touched.thumbnail && !values.thumbnail.src && (
          <div className='text-danger mt-2'>Thumbnail is required</div>
        )}
        <ErrorMessage
          name={Field.name || 'thumbnail'}
          render={(msg) => <div className='text-danger mt-2'>{msg} dhdhgd</div>}
        />
      </div>
    </div>
  )
}

export default ProductThumb

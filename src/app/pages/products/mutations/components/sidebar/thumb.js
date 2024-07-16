import CropperComponents from '../../../../../modules/components/cropper/CropperComponents'
import {OnlyTooltip} from '../../../../../modules/helper/misc'
const defaultImage = '/media/products/dummy-product.jpg'

const Thumb = ({values, setFieldValue, className}) => {
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
          onCroped={(e) => {
            setFieldValue('thumbnail', {
              alt: e[1],
              src: e[0],
            })
            setFieldValue('variants[0].thumbnail', {
              alt: e[1],
              src: e[0],
            })
          }}
          width={600}
          height={620}
          src={values.thumbnail.src || defaultImage}
        />
      </div>
    </div>
  )
}

export default Thumb

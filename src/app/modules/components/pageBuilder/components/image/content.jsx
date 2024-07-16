import CropperComponents from '../../../cropper/CropperComponents'
const defaultImage = '/media/products/dummy-product.jpg'

const Content = ({content, onChange}) => {
  return (
    <div>
      <CropperComponents
        onCroped={(e) => onChange(e[0])}
        full
        className='w-100'
        src={content || defaultImage}
      />
    </div>
  )
}

export default Content

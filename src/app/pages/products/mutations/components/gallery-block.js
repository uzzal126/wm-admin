import {ErrorMessage, FieldArray} from 'formik'
import {Col} from 'react-bootstrap'
import CropperComponents from '../../../../modules/components/cropper/CropperComponents'
import FormTextField from '../../../../modules/components/formik/fields/form-field'
import {OnlyTooltip} from '../../../../modules/helper/misc'
const defaultImage = '/media/products/dummy-product.jpg'

const Gallery = ({values, setFieldValue}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header min-h-auto'>
        <div className='card-title'>
          <h2>
            Product Gallery
            <OnlyTooltip tooltip='Set the product media gallery.' />
          </h2>
        </div>
      </div>
      <div className='card-body py-0'>
        <div className='fv-row mb-2 d-flex'>
          <FieldArray
            name='gallery'
            render={() => {
              return (
                values &&
                values.gallery.length > 0 &&
                values.gallery.map((info, i) => (
                  <CropperComponents
                    key={i}
                    full={true}
                    isRemove={true}
                    className='w-100 h-150px'
                    onCroped={(e) =>
                      setFieldValue(`gallery[${i}]`, {
                        alt: e[1],
                        src: e[0],
                      })
                    }
                    width={600}
                    height={620}
                    src={values.gallery[i].src || defaultImage}
                  />
                ))
              )
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='gallery' />
          </div>
        </div>
        <div className='mb-5 fv-row'>
          <FormTextField
            as={Col}
            controlId='validationFormik-video'
            label='Product video'
            type='text'
            name='video.src'
            tooltip='Add product description video'
          />
        </div>
      </div>
    </div>
  )
}

export default Gallery

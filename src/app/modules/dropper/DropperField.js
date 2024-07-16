import PropTypes from 'prop-types'
import DropZone from 'react-dropzone'
import DropperPlaceholder from './DropperPlaceholder'
import DropperPreviewer from './DropperPreviewer'

const DropZoneField = ({handleOnDrop, imagefile, removeImage}) => (
  <DropZone
    accept='image/jpeg, image/png, image/gif, image/bmp'
    onDrop={handleOnDrop}
    // onChange={(file) => // console.log("file", file)}
  >
    {({getRootProps, getInputProps}) => (
      <section>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          {imagefile && imagefile.length > 0 ? (
            <DropperPreviewer imagefile={imagefile} removeImage={removeImage} />
          ) : (
            <DropperPlaceholder error={'file'} touched={true} />
          )}
        </div>
      </section>
    )}
  </DropZone>
)

DropZoneField.propTypes = {
  handleOnDrop: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.shape({
      preview: PropTypes.string,
    }),
  }),
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  label: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
}

export default DropZoneField

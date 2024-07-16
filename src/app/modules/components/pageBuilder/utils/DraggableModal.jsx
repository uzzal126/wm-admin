import Draggable from 'react-draggable'
import AccordionModal from '../components/accordion/modal'
import ButtonModal from '../components/button/modal'
import EditorModal from '../components/editor/modal'
import FormModal from '../components/form/modal'
import ImageModal from '../components/image/modal'
import MapModal from '../components/map/modal'
import RowModal from '../components/row/modal'
import SliderModal from '../components/slider/modal'
import SocialModal from '../components/social/modal'
import VideoModal from '../components/video/modal'
import {layoutToComponent, layoutUpdateComponent} from '../helpers'

const DraggableModal = ({close, show, item, components, setComponents}) => {
  let component = layoutToComponent(components, item.id)

  const handleOnChange = (value) => {
    setComponents(layoutUpdateComponent(components, item.id, value))
  }

  return (
    show && (
      <Draggable handle='.handle'>
        <div className='drag-container'>
          {item.type === 'editor' && (
            <EditorModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === 'image' && (
            <ImageModal close={close} show={show} component={component} onChange={handleOnChange} />
          )}
          {item.type === 'video' && (
            <VideoModal close={close} show={show} component={component} onChange={handleOnChange} />
          )}
          {item.type === 'button' && (
            <ButtonModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === 'map' && (
            <MapModal close={close} show={show} component={component} onChange={handleOnChange} />
          )}
          {item.type === 'form' && (
            <FormModal close={close} show={show} component={component} onChange={handleOnChange} />
          )}
          {item.type === 'slider' && (
            <SliderModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === 'accordion' && (
            <AccordionModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === 'social' && (
            <SocialModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === 'row' && (
            <RowModal
              close={close}
              show={show}
              components={components}
              component={item}
              onChange={(e) => setComponents(e)}
            />
          )}
        </div>
      </Draggable>
    )
  )
}

export default DraggableModal

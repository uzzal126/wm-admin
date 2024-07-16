import {useRef} from 'react'
import {Button} from 'react-bootstrap'
import {useDrag} from 'react-dnd'
import {COMPONENT} from '../data/constants'
import CompHelper from '../helpers/compHelper'

const Component = ({data, path, editHandle, handleTrash}) => {
  const ref = useRef(null)

  const item = {type: COMPONENT, id: data.id, path}

  const [{isDragging}, drag] = useDrag({
    item: {type: COMPONENT, id: data.id, path},
    type: COMPONENT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  return (
    <div
      ref={ref}
      style={{opacity}}
      onDoubleClick={() => editHandle(true, {...data, type: data?.type})}
      className='builder-component builder-relative draggable'
    >
      <div className='builder-header rounded-2 shadow'>
        <div className='d-flex align-items-center gap-2'>
          <div className='builder-name builder-base'>{data?.type}</div>
          <div className='builder-edit'>
            <Button
              variant='light-info'
              size='sm'
              className='btn-icon w-30px h-30px'
              onClick={() => editHandle(true, {...data, type: data?.type})}
            >
              <i className='fas fa-pen-alt' />
            </Button>
          </div>
          <div className='builder-delete'>
            <Button
              variant='light-danger'
              size='sm'
              className='btn-icon w-30px h-30px'
              onClick={() => handleTrash(item)}
            >
              <i className='fas fa-trash' />
            </Button>
          </div>
        </div>
      </div>
      <CompHelper data={data} />
    </div>
  )
}
export default Component

import React, {useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import {useDrag} from 'react-dnd'
import {COLUMN} from '../data/constants'
import Component from './Component'
import DropZone from './DropZone'

const style = {}
const Column = ({data, handleDrop, path, editOpen, editHandle, handleTrash}) => {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  let item = {
    type: COLUMN,
    id: data.id,
    children: data.children,
    path,
  }

  const [{isDragging}, drag] = useDrag({
    item: item,
    type: COLUMN,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        path={currentPath}
        editOpen={editOpen}
        editHandle={editHandle}
        handleTrash={handleTrash}
      />
    )
  }

  return (
    <div
      ref={ref}
      style={{...style, opacity}}
      className={`draggable builder-relative builder-column ${active ? 'active' : ''}`}
      onMouseLeave={() =>
        setTimeout(() => {
          setActive(false)
        }, 800)
      }
    >
      <div className='position-relative z-index-3'>
        {data.children.map((component, index) => {
          const currentPath = `${path}-${index}`

          return (
            <React.Fragment key={component.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
              />
              {renderComponent(component, currentPath)}
            </React.Fragment>
          )
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          isLast
        />
      </div>
      <div
        className='builder-backdrop'
        onMouseOver={() => setActive(true)}
        onMouseLeave={() =>
          setTimeout(() => {
            setActive(false)
          }, 800)
        }
        onClick={() => setActive(true)}
      ></div>
      <div className='builder-header rounded-2 shadow'>
        <div className='d-flex align-items-center gap-2'>
          <div className='builder-name builder-base'>Column</div>
          <div className='builder-edit'>
            <Button variant='light-info' size='sm' className='btn-icon w-30px h-30px'>
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
    </div>
  )
}
export default Column

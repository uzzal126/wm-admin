import React, {useRef, useState} from 'react'
import {useDrag} from 'react-dnd'
import {ROW} from '../data/constants'
import DropZone from './DropZone'
import Column from './Column'
import {Button} from 'react-bootstrap'

const Row = ({data, handleDrop, path, editOpen, editHandle, handleTrash}) => {
  const ref = useRef(null)

  const [active, setActive] = useState(false)

  const item = {
    type: ROW,
    id: data.id,
    children: data.children,
    path,
  }

  const [{isDragging}, drag] = useDrag({
    item: item,
    type: ROW,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(ref)

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        handleDrop={handleDrop}
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
      style={{opacity}}
      className={`draggable builder-relative builder-row ${active ? 'active' : ''}`}
      onMouseLeave={() =>
        setTimeout(() => {
          setActive(false)
        }, 800)
      }
    >
      <div
        className='builder-backdrop'
        onMouseOver={() => setActive(true)}
        // onMouseLeave={() =>
        //   setTimeout(() => {
        //     setActive(false)
        //   }, 800)
        // }
        onClick={() => setActive(true)}
      ></div>
      <div className={`builder-header rounded-2 shadow`}>
        <div className='d-flex align-items-center gap-2'>
          <div className='builder-name builder-base'>Row</div>
          <div className='builder-edit'>
            <Button
              variant='light-info'
              size='sm'
              className='btn-icon w-30px h-30px'
              onClick={() => editHandle(true, data)}
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

      <div className='builder-columns'>
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className='horizontalDrag'
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          )
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          className={`horizontalDrag ${data.children.length > 0 ? '' : 'noComponent'}`}
          isLast
        />
      </div>
    </div>
  )
}
export default Row

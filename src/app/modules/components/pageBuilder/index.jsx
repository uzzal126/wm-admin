import React from 'react'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import DragCanvas from './dragCanva'
import './builder.scss'

const PageEditor = ({onChange, value}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragCanvas onChange={onChange} value={value} />
    </DndProvider>
  )
}

export default PageEditor

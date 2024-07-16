import React, {useCallback, useEffect, useState} from 'react'
import {generateUniqueId} from '../../../../common'

import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
  handleRemoveItemFromLayout,
} from './helpers'

import {COLUMN, SIDEBAR_ITEM, SIDEBAR_ITEMS} from './data/constants'
import DragModalModal from './utils/DraggableModal'
import DropZone from './utils/DropZone'
import Row from './utils/Row'
import SideBarItem from './utils/SideBarItem'

const DragCanvas = ({onChange, value}) => {
  const [editable, setEditable] = useState(false)
  const [layout, setLayout] = useState(value === undefined ? [] : value)
  const [selectedItem, setSelectedItem] = useState({})
  useEffect(() => {
    if (onChange !== undefined) onChange(layout)
  }, [layout])

  const handleTrash = useCallback(
    (item) => {
      // console.log(item)

      const splitItemPath = item.path.split('-')
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath))
    },
    [layout]
  )

  const handleDrop = useCallback(
    (dropZone, item) => {
      const splitDropZonePath = dropZone.path.split('-')
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-')

      const newItem = {id: item.id, type: item.type}
      if (item.type === COLUMN) {
        newItem.children = item.children
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: generateUniqueId(),
          ...item.component,
        }
        const newItem = {
          // id: newComponent.id,
          ...newComponent,
          // type: COMPONENT,
          type: item.component.type,
        }
        setLayout(handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem))
        return
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-')
      const pathToItem = splitItemPath.slice(0, -1).join('-')

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(handleMoveWithinParent(layout, splitDropZonePath, splitItemPath))
          return
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem))
        return
      }

      // 3. Move + Create
      setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem))
    },
    [layout]
  )

  const handleEditable = (enable, item) => {
    setSelectedItem(item)
    setEditable(enable)
  }

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        path={currentPath}
        editOpen={editable}
        editHandle={handleEditable}
        handleTrash={handleTrash}
      />
    )
  }
  return (
    <>
      <div className='builder-body'>
        <div className='builder-pageContainer'>
          <div className='builder-page position-relative'>
            {layout &&
              layout.length > 0 &&
              layout.map((row, index) => {
                const currentPath = `${index}`
                return (
                  <React.Fragment key={row.id}>
                    <DropZone
                      data={{
                        path: currentPath,
                        childrenCount: layout.length,
                      }}
                      onDrop={handleDrop}
                      path={currentPath}
                    />
                    {renderRow(row, currentPath)}
                  </React.Fragment>
                )
              })}
            <DropZone
              data={{
                path: `${layout.length}`,
                childrenCount: layout.length,
              }}
              className={`${layout.length > 0 ? '' : 'noComponent'}`}
              onDrop={handleDrop}
              isLast
            />
            <div className='position-absolute top-0 start-0'>Page</div>
          </div>
        </div>
        <div className='builder-sideBar'>
          {Object.values(SIDEBAR_ITEMS).map((sideBarItem) => (
            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
          ))}
        </div>
      </div>
      <DragModalModal
        show={editable}
        close={setEditable}
        item={selectedItem}
        components={layout}
        setComponents={setLayout}
      />
    </>
  )
}
export default DragCanvas

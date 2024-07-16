import React, {useRef} from 'react'
import './builder-view.scss'
import CompHelper from './helpers/compHelper'

const Component = ({data}) => {
  const ref = useRef(null)

  return (
    <div ref={ref} className='builder-view-component'>
      <CompHelper data={data} />
    </div>
  )
}

const Column = ({data, path}) => {
  const ref = useRef(null)

  const renderComponent = (component, currentPath) => {
    return <Component key={component.id} data={component} path={currentPath} />
  }

  return (
    <div ref={ref} className={`draggable builder-view-column`}>
      {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`

        return (
          <React.Fragment key={component.id}>
            {renderComponent(component, currentPath)}
          </React.Fragment>
        )
      })}
    </div>
  )
}

const Row = ({data, path}) => {
  const ref = useRef(null)

  const renderColumn = (column, currentPath) => {
    return <Column key={column.id} data={column} path={currentPath} />
  }

  return (
    <div ref={ref} className={`draggable builder-view-row`}>
      <div className='builder-columns'>
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`
          return (
            <React.Fragment key={column.id}>{renderColumn(column, currentPath)}</React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

const PageViewer = ({value}) => {
  const renderRow = (row, currentPath) => {
    return <Row key={row.id} data={row} path={currentPath} />
  }
  return (
    <>
      <div className='builder-view'>
        <div className='builder-view-container'>
          <div className='builder-view-page'>
            {value &&
              value.length > 0 &&
              value.map((row, index) => {
                const currentPath = `${index}`
                return <React.Fragment key={row.id}>{renderRow(row, currentPath)}</React.Fragment>
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageViewer

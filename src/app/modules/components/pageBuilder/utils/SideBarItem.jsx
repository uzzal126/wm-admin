import {useDrag} from 'react-dnd'

const SideBarItem = ({data}) => {
  const [{opacity}, drag] = useDrag({
    item: data,
    type: data.type,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div className='builder-sideBar-item d-flex align-items-center' ref={drag} style={{opacity}}>
      <i className={`text-dark fs-3 me-2 fas fa-${data.component.icon || 'image'}`} />{' '}
      <span>{data.component.title}</span>
    </div>
  )
}
export default SideBarItem

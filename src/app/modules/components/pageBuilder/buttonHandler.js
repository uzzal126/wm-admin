import React, {useState} from 'react'
import {Button, Dropdown, Form} from 'react-bootstrap'
import {builderMenus} from './data/menuList'

// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
  <Button
    variant='light-primary'
    className='btn-icon'
    size='sm'
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </Button>
))

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
    const [value, setValue] = useState('')

    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <Form.Control
          autoFocus
          className='mx-3 my-2 w-auto'
          placeholder='Type to filter...'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className='list-unstyled'>
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    )
  }
)

const MenuLists = () => (
  <Dropdown.Menu as={CustomMenu} className='z-index-4'>
    {builderMenus &&
      builderMenus.length > 0 &&
      builderMenus.map((item, i) => <Dropdown.Item eventKey={i}>{item.name}</Dropdown.Item>)}
  </Dropdown.Menu>
)

const PlusButton = () => (
  <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
      <i className='fas fa-plus' />
    </Dropdown.Toggle>
    <MenuLists />
  </Dropdown>
)

const ButtonHandler = ({children}) => {
  return (
    <div className='position-relative'>
      <div className='position-absolute top-0 start-50 translate-middle'>
        <PlusButton />
      </div>
      <div>{children}</div>
      <div className='position-absolute top-100 start-50 translate-middle'>
        <PlusButton />
      </div>
    </div>
  )
}

export default ButtonHandler

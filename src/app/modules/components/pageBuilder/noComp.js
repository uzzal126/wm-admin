import React from 'react'
import ButtonHandler from './buttonHandler'

const NoComp = () => {
  return (
    <ButtonHandler>
      <div className='px-3 py-5 rounded-1 border-dashed text-center'>
        <h4>Add Item</h4>
      </div>
    </ButtonHandler>
  )
}

export default NoComp

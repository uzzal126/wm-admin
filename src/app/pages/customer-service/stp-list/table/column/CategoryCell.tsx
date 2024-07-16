import React, {FC} from 'react'

type Props = {
  categories: []
}

const CategoryCell: FC<Props> = ({categories}) => {
  return (
    <div className='text-center '>
      {categories &&
        categories.length > 0 &&
        categories.map((item, i) => (
          <span key={i} className='badge rounded-5 text-muted border m-1'>
            {item}
          </span>
        ))}
    </div>
  )
}

export {CategoryCell}

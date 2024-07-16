import {FC} from 'react'

type Props = {
  category?: any
}

const CategoryCell: FC<Props> = ({category}) => {
  const color = 'secondary' // Default color

  // Ensure consistent return types: a single element or null
  return (
    <div className='text-center '>
      {Array.isArray(category) ? (
        category.map((item, i) => (
          <span key={i} className='badge rounded-5 text-muted border m-1'>
            {item?.name}
          </span>
        ))
      ) : (
        <span className='badge rounded-5 text-muted border m-1'>{category}</span>
      )}
    </div>
  )
}

export {CategoryCell}

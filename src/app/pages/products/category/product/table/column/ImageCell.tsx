/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {Link} from '../../../../../../modules/helper/linkHandler'
import {Product} from '../../core/_models'

type Props = {
  product: Product
}

const colors = ['danger', 'success', 'info', 'warning', 'primary']

const ImageCell: FC<Props> = ({product}) => {
  const [defaultImage, setDefaultImage] = useState(true)
  const [color, setColor] = useState('primary')

  useEffect(() => {
    renderImage()
    var randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
  }, [])
  const renderImage = () => {
    if (product.thumbnail?.src) {
      fetch(`${product?.thumbnail?.src}`)
        .then((res) => {
          if (res.status === 404) {
            setDefaultImage(true)
          } else {
            setDefaultImage(false)
          }
        })
        .catch((err) => {
          setDefaultImage(true)
        })
    } else {
      setDefaultImage(true)
    }
  }

  let shortName = product.name
  shortName = shortName ? shortName?.slice(0, 1) : 'D'

  return (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <Link to={`/products/edit/${product.prod_id}`}>
          {defaultImage ? (
            <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
              {shortName}
            </div>
          ) : (
            <div className='symbol-label'>
              <img src={product.thumbnail?.src} alt={product.name} className='w-100' />
            </div>
          )}
        </Link>
      </div>
      <div className='d-flex flex-column'>
        <Link
          to={`/products/edit/${product.prod_id}`}
          className='fs-6 text-gray-800 text-hover-primary'
        >
          {product.name}
        </Link>
        <span className='fw-bold text-gray-400'>SKU: {product.sku}</span>
      </div>
    </div>
  )
}

export {ImageCell}

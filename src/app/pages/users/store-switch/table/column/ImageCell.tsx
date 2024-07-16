/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {check_date_expiry} from '../../../../../modules/helper/misc'
import {TableModal} from '../../core/_models'

type Props = {
  store: TableModal
}

const colors = ['danger', 'success', 'info', 'warning', 'primary']

const ImageCell: FC<Props> = ({store}) => {
  const [defaultImage, setDefaultImage] = useState(true)
  const [color, setColor] = useState('primary')

  useEffect(() => {
    renderImage()
    var randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
  }, [])

  const renderImage = () => {
    if (store.logo?.fav_logo) {
      fetch(`${store.logo?.fav_logo}`)
        .then((res) => {
          if (res.status == 404) {
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

  let shortName = store.domain
  shortName = shortName ? shortName?.slice(0, 1) : 'D'

  return (
    <>
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
          {defaultImage || store.logo?.fav_logo === '' ? (
            <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
              {shortName}
            </div>
          ) : (
            <div className='symbol-label'>
              <img src={store.logo?.fav_logo} alt={store.logo?.fav_logo} className='w-100' />
            </div>
          )}
        </div>
        <div className='d-flex flex-column'>
          <span
            className={`fs-6  text-hover-primary  ${
              check_date_expiry(store.expire_time, Date.now() / 1000)
                ? 'text-gray-800'
                : 'text-danger'
            }`}
          >
            {store.domain}
          </span>
          <span
            className={`fw-bold  ${
              check_date_expiry(store.expire_time, Date.now() / 1000)
                ? 'text-gray-400'
                : 'text-danger'
            }`}
          >
            ID: {store.id}
          </span>
        </div>
      </div>
    </>
  )
}

export {ImageCell}

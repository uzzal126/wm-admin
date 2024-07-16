/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {useAbility} from '../../../../../../_metronic/redux/ability'

type Props = {
  coupon: any
}

const colors = ['danger', 'success', 'info', 'warning', 'primary']

const ImageCell: FC<Props> = ({coupon}) => {
  const [defaultImage, setDefaultImage] = useState(true)
  const [color, setColor] = useState('primary')

  const {ability} = useAbility()

  useEffect(() => {
    renderImage()
    var randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
  }, [])
  const renderImage = () => {
    if (coupon.thumbnail) {
      fetch(`${coupon?.thumbnail}`)
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

  let shortName = coupon.promo_code
  shortName = shortName ? shortName?.slice(0, 1) : 'D'

  return (
    <div className='d-flex align-items-center'>
      {true ? (
        <>
          <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            <div style={{cursor: 'pointer'}}>
              {defaultImage ? (
                <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
                  {shortName}
                </div>
              ) : (
                <div className='symbol-label'>
                  <img
                    src={coupon.thumbnail || defaultImage}
                    alt={coupon.promo_code}
                    className='w-100'
                  />
                </div>
              )}
            </div>
          </div>
          <div className='d-flex flex-column' style={{cursor: 'pointer'}}>
            <div className='fs-6 text-gray-800 text-hover-primary'>{coupon.promo_code}</div>
            <span className='fw-bold text-gray-400'>ID: {coupon.id}</span>
          </div>
        </>
      ) : (
        <>
          <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            {defaultImage ? (
              <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
                {shortName}
              </div>
            ) : (
              <div className='symbol-label'>
                <img src={coupon.thumbnail} alt={coupon.promo_code} className='w-100' />
              </div>
            )}
          </div>
          <div className='d-flex flex-column'>
            <div className='fs-6 text-gray-800 text-hover-primary'>{coupon.promo_code}</div>
            <span className='fw-bold text-gray-400'>ID: {coupon.id}</span>
          </div>
        </>
      )}
      {/* begin:: Avatar */}
    </div>
  )
}

export {ImageCell}

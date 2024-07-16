/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {useAbility} from '../../../../../../_metronic/redux/ability'
import {Link} from '../../../../../modules/helper/linkHandler'
import {Job} from '../../core/_models'

type Props = {
  job: Job
}

const colors = ['danger', 'success', 'info', 'warning', 'primary']

const ImageCell: FC<Props> = ({job}) => {
  const [defaultImage, setDefaultImage] = useState(true)
  const [color, setColor] = useState('primary')

  const {ability} = useAbility()

  useEffect(() => {
    renderImage()
    var randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
  }, [])

  const renderImage = () => {
    const thumb = typeof job?.thumbnail === 'string' ? JSON.parse(job?.thumbnail).src : {}
    if (thumb) {
      fetch(`${thumb}`)
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

  let shortName = job.title
  shortName = shortName ? shortName?.slice(0, 1) : 'D'

  return (
    <>
      {ability('Edit Post', 'blogs') ? (
        <Link to={`/jobs/edit/${job?.slug}`} className='d-flex align-items-center'>
          <>
            <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
              {defaultImage ? (
                <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
                  {shortName}
                </div>
              ) : (
                <div className='symbol-label'>
                  <img
                    src={typeof job?.banner === 'string' ? job?.banner : ''}
                    alt={job.title}
                    className='w-100'
                  />
                </div>
              )}
            </div>
            <div className='d-flex flex-column'>
              <span className='fs-6 text-gray-800 text-hover-primary'>{job.title}</span>
              {/* <span className='fw-bold text-gray-400'>SKU: {job?.sku}</span> */}
            </div>
          </>
        </Link>
      ) : (
        <div className='d-flex align-items-center'>
          <>
            <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
              {defaultImage ? (
                <div className={clsx('symbol-label fs-3', `bg-light-${color}`, `text-${color}`)}>
                  {shortName}
                </div>
              ) : (
                <div className='symbol-label'>
                  <img
                    src={typeof job?.thumbnail === 'string' ? JSON.parse(job?.thumbnail).src : ''}
                    alt={job.title}
                    className='w-100'
                  />
                </div>
              )}
            </div>
            <div className='d-flex flex-column'>
              <span className='fs-6 text-gray-800 text-hover-primary'>{job.title}</span>
              <span className='fw-bold text-gray-400'>SKU: {job?.id}</span>
            </div>
          </>
        </div>
      )}
    </>
  )
}

export {ImageCell}

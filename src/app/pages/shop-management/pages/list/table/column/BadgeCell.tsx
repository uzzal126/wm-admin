import {FC} from 'react'

type Props = {
  badge?: number
}

const BadgeCell: FC<Props> = ({badge}) => {
  // // console.log(badge)
  const color = badge === 1 ? 'success' : badge === 2 ? 'warning' : 'default'
  return (
    <div className={`badge badge-${color} fw-bolder`}> {badge === 1 ? 'Published' : 'Draft'}</div>
  )
}

export {BadgeCell}

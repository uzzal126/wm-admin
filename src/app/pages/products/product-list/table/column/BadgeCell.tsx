import {FC} from 'react'

type Props = {
  badge?: string
}

const BadgeCell: FC<Props> = ({badge}) => {
  const color =
    badge === 'Published'
      ? 'success'
      : badge === 'Inactive'
      ? 'warning'
      : badge === 'Scheduled'
      ? 'primary'
      : 'secondary'
  return <div className={`badge badge-light-${color} fw-bolder`}>{badge}</div>
}

export {BadgeCell}

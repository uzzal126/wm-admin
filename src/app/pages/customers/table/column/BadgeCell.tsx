import {FC} from 'react'

type Props = {
  badge?: string
}

const BadgeCell: FC<Props> = ({badge}) => {
  const color = badge==='guest' ? 'info' : 'primary';
  return <div className={`badge badge-${color} fw-bolder`}>{badge}</div>
}

export {BadgeCell}

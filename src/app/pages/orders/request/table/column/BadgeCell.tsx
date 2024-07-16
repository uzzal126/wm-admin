import {FC} from 'react'

type Props = {
  badge?: string
  color?: string
}

const BadgeCell: FC<Props> = ({badge, color}) => (
  <div className={`badge badge-${badge === 'pending' ? 'light-warning' : 'light-success'} fw-bolder`}>{badge}</div>
)

export {BadgeCell}

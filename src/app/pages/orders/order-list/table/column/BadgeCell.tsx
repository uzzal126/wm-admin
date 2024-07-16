import {FC} from 'react'

type Props = {
  badge?: string
  color?: number
}

const BadgeCell: FC<Props> = ({badge, color}) => {
  let clr = `${
    color === 1
      ? 'warning'
      : color === 2
      ? 'dark'
      : color === 4
      ? 'primary'
      : color === 5
      ? 'info'
      : color === 9 || color === 119 || color === 209
      ? 'success'
      : color === 7 || color === 10
      ? 'danger'
      : 'primary'
  }`
  return <div className={`badge badge-light-${clr ? clr : '-success'} fw-bolder`}>{badge}</div>
}

export {BadgeCell}

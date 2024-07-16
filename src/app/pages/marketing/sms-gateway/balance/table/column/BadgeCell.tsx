import {FC} from 'react'

type Props = {
  badge?: string | any
}

const BadgeCell: FC<Props> = ({badge}) => {
  // const color =
  //   badge === 'Published'
  //     ? 'success'
  //     : badge === 'Inactive'
  //     ? 'warning'
  //     : badge === 'Scheduled'
  //     ? 'primary'
  //     : 'secondary'

  // const color = badge == 1 ? 'success' : 'secondary'

  const color = badge.includes('pproved')
    ? 'success'
    : badge.includes('ending')
    ? 'warning'
    : badge.includes('Canceled')
    ? 'danger'
    : 'secondary'
  return <div className={`badge badge-light-${color} fw-bolder`}>{badge || ''}</div>
}

export {BadgeCell}

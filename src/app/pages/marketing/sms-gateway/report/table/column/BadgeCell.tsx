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

  const color = badge.includes('Partially Delivered')
    ? 'primary'
    : badge.includes('Submitted') || badge.includes('Processing')
    ? 'warning'
    : badge.includes('Canceled') || badge.includes('Failed')
    ? 'danger'
    : badge.includes('Delivered')
    ? 'success'
    : 'secondary'
  return <div className={`badge badge-light-${color} fw-bolder`}>{badge || ''}</div>
}

export {BadgeCell}

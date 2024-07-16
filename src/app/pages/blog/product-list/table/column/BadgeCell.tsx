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

  const color =
    badge === 1 ? 'success' : badge === 0 ? 'warning' : badge === 2 ? 'primary' : 'secondary'
  // const color = badge == 1 ? 'success' : 'secondary'
  return (
    <div className={`badge badge-light-${color} fw-bolder`}>{`${
      badge === 1 ? 'Published' : badge === 2 ? 'Scheduled' : badge === 3 ? 'Draft' : 'Inactive'
    }`}</div>
  )
}

export {BadgeCell}

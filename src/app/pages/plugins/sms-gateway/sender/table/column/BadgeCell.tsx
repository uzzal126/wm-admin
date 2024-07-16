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

  const color =
    badge === 1
      ? 'success'
      : badge === 0
        ? 'warning'
        : badge === 2
          ? 'primary'
          : 'secondary'
  return <div className={`badge badge-light-${color} fw-bolder`}>{`${(badge === 1 || badge === 2)? 'Active' : 'Not Active'}`}</div>
}

export {BadgeCell}

import {FC} from 'react'

type Props = {
  badge?: string
}



const BadgeCell: FC<Props> = ({badge}) => {
  const color = badge==='Published' ? 'success' : badge==='Inactive' ? 'warning' : badge==='Scheduled' ? 'primary' : 'default';
  return <div className={`badge badge-${color} fw-bolder`}>{badge}</div>
}

export {BadgeCell}

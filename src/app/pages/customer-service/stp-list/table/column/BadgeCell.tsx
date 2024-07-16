import {FC} from 'react'
import {Role} from '../../core/_models'

type Props = {
  roles?: Role[]
}

const BadgeCell: FC<Props> = ({roles}) => {
  return (
    <>
      {roles && roles?.length > 0 ? (
        roles?.map((role: Role) => (
          <div key={role.id} className={`badge badge-light-info mx-1`}>
            {role.name}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  )
}

export {BadgeCell}

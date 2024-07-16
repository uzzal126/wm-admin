import {FC} from 'react'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const UserSL: FC<any> = ({sl = 0}: any) => {
  const {state} = useQueryRequest()

  return (
    <>
      {/* {roles?.map((item, indx) => ( */}
      <div>{(state.page - 1) * state.items_per_page + (sl + 1)}</div>
      {/* ))} */}
    </>
  )
}

export {UserSL}

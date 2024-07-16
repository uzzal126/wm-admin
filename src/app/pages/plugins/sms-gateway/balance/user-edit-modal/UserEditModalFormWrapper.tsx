import {useQuery} from '@tanstack/react-query'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../../constants/api.constants'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import {UserEditModalForm} from './UserEditModalForm'
import { useEffect } from 'react'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const { isLoading, data: user, error, } = useQuery({
    queryKey: [`${BASE_URL}/sms/bundles/${itemIdForUpdate}`],
    queryFn: () => getUserById(itemIdForUpdate),
    gcTime: 0,      // same as 'cacheTime'
    enabled: enabledQuery,
  });

  // this 'useEffect()' hook is a replacement of 'onError()' callback of 'useQuery'...
  // onError: (err) => {
  //   setItemIdForUpdate(undefined)
  //   console.error(err)
  // },
  useEffect(() => {
    // if error is null, we shall no proceed any further...
    if (error === null) { return; }

    // otherwise, we shall set undefined to item ID...
    setItemIdForUpdate(undefined);
    // and log the error...
    console.error(error);
  }, [error]);

  if (!itemIdForUpdate) {
    return <UserEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
  }

  if (isLoading) {
    return <span>loading...</span>
  }
  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user || {}} />
  }

  return null
}

export {UserEditModalFormWrapper}

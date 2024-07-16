import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {UserEditModalForm} from './StoreEditModalForm'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import {isNotEmpty, QUERIES} from '../../../../../../../../_metronic/helpers'

const StoreEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const { isLoading, data: user, error, } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`],
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

  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export {StoreEditModalFormWrapper}
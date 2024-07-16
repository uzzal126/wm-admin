import {useQuery} from '@tanstack/react-query'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {getUserById} from '../core/_requests'
import {useListView} from '../core/ListViewProvider'
import {CouponEditModalForm} from './CouponEditModalForm'
import { useEffect } from 'react'

const CouponEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const { isLoading, data: user, error, } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-coupon-${itemIdForUpdate}`],
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
    return <CouponEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <CouponEditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export {CouponEditModalFormWrapper}

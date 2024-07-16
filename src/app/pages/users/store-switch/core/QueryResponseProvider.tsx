/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {
  PaginationState,
  QUERIES,
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  stringifyRequestQuery,
} from '../../../../../_metronic/helpers'
import {authApi} from '../../../../../_metronic/redux/slices/auth'
import {useAppDispatch} from '../../../../../_metronic/redux/store'
import {useQueryRequest} from './QueryRequestProvider'
import {TableModal} from './_models'

const QueryResponseContext = createResponseContext<TableModal>(initialQueryResponse)

const QueryResponseProvider = ({children}: {children: any}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state, true), [state])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  // console.log('query', query)

  const { isFetching, refetch, data: response, } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-${query}`],
    queryFn: async () => {
      const res = await dispatch(authApi.endpoints.getStore.initiate(`?${query}`))
      return res.data
    },
    gcTime: 0,      // same as 'cacheTime'
    placeholderData: previousData => previousData,   // identity function with the same behaviour as 'keepPreviousData'
    refetchOnWindowFocus: false,
  });

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }
  // console.log(response)

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState
  }

  return response.payload.pagination
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseLoading,
  useQueryResponsePagination,
}

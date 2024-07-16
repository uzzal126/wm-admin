/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {
  PaginationState,
  QUERIES,
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  stringifyRequestQuery,
} from '../../../../../_metronic/helpers'
import {useAppDispatch} from '../../../../../_metronic/redux/store'
import {useQueryRequest} from './QueryRequestProvider'
import {Product} from './_models'
import {getUsers} from './_requests'

const QueryResponseContext = createResponseContext<Product>(initialQueryResponse)
const QueryResponseProvider: FC = ({children}: any) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state, true))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state, true), [state])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const { isFetching, refetch, data: response, } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-${query}`],
    queryFn: async () => {
      const data = getUsers(query)
      // const {data} = await dispatch(blogApi.endpoints.posts.initiate(query))

      return data
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

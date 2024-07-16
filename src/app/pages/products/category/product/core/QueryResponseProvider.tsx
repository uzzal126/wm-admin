/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query'
import {FC, useContext, useEffect, useMemo, useState} from 'react'
import {
  PaginationState,
  QUERIES,
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  stringifyRequestQuery,
} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from './QueryRequestProvider'
import {Product} from './_models'
import {getUsers} from './_requests'

const QueryResponseContext = createResponseContext<Product>(initialQueryResponse)

const QueryResponseProvider: FC = ({children, category = {}}: any) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state, true))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state, true), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-${category.id}?${query}`],
    queryFn: () => getUsers(`${category.id}?${query}`),
    gcTime: 0, // same as 'cacheTime'
    placeholderData: (previousData) => previousData, // identity function with the same behaviour as 'keepPreviousData'
    refetchOnWindowFocus: false,
  })

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

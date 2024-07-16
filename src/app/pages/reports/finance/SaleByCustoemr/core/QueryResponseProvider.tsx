/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from '@tanstack/react-query'
import {TableModal} from './_models'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from './QueryRequestProvider'
import {getQueryRequest} from '../../../../../library/api.helper'
import {REPORT_SALES_BY_CUSTOMER} from '../../../../../constants/api.constants'

const QueryResponseContext = createResponseContext<TableModal>(initialQueryResponse)
const QueryResponseProvider: FC = ({children}: any) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const { isFetching, refetch, data: response, } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-${query}}`],
    queryFn: () => getQueryRequest(`${REPORT_SALES_BY_CUSTOMER}?${query}`),
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

  return response.data || []
}
const useQueryResponseAll = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response || []
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
  useQueryResponsePagination,
  useQueryResponseLoading,
  useQueryResponseAll,
}

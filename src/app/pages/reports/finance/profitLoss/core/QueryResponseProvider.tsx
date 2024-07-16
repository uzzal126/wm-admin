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
import {REPORT_PROFIT_LOSS} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {useQueryRequest} from './QueryRequestProvider'
import {TableModal} from './_models'

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

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-${query}}`],
    queryFn: () => getQueryRequest(`${REPORT_PROFIT_LOSS}?${query}`),
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

  return response?.data ? response?.data?.profit_loss_calculation_data || [] : []
}
const useQueryResponseSummary = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return {}
  }
  return response.data ? response.data.summary : {}
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
  useQueryResponseSummary,
}

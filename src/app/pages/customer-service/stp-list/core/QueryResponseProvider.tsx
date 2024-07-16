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
import {useQueryRequest} from './QueryRequestProvider'
import {STP} from './_models'
import {getUsers} from './_requests'

const QueryResponseContext = createResponseContext<STP>(initialQueryResponse)
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
    queryKey: [`${QUERIES.USERS_LIST}-${query}`],
    queryFn: async () => {
      // const url = `${BASE_URL}/auth/users/?${query}`
      // const product = getQueryRequest(url) //getUsers(query)
      const stpList = getUsers(query)

      return stpList
    },
    gcTime: 0,      // same as 'cacheTime'
    placeholderData: previousData => previousData,   // identity function with the same behaviour as 'keepPreviousData'
    refetchOnWindowFocus: false,
  });

  // response.status_code
  // if(response)
  //   if(response.status_code === 200)
  // // console.log(response)

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

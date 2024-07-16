import {VISITOR} from '../../endpoints'
import {apiSlice} from '../apiSlice'

export const visitorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    liveVisitor: builder.query({
      query: () => VISITOR.LIVE,
    }),
    countryWise: builder.query({
      query: (params) => VISITOR.COUNTRY_WISE + params,
    }),
    visitorSummary: builder.query({
      query: (params) => VISITOR.VISITOR_SUMMARY + params,
    }),
    cityWise: builder.query({
      query: (params) => VISITOR.CITY_WISE + params,
    }),
    byPage: builder.query({
      query: (params) => VISITOR.PAGE + params,
    }),
    byDevice: builder.query({
      query: (params) => VISITOR.DEVICE + params,
    }),
  }),
})

export const {
  useLiveVisitorQuery,
  useCountryWiseQuery,
  useVisitorSummaryQuery,
  useCityWiseQuery,
  useByPageQuery,
  useByDeviceQuery,
} = visitorApi

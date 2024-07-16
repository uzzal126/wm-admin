import {ONBOARD} from '../../endpoints'
import {apiSlice} from '../apiSlice'

export const onboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    emailVerification: builder.mutation({
      query: (data) => ({
        url: ONBOARD.EMAIL_VERIFICATION,
        method: 'POST',
        body: data,
      }),
    }),
    otpVerification: builder.mutation({
      query: (data) => ({
        url: ONBOARD.OTP_VERIFICATION,
        method: 'POST',
        body: data,
      }),
    }),
    createStore: builder.mutation({
      query: (data) => ({
        url: ONBOARD.STORE_CREATE,
        method: 'POST',
        body: data,
      }),
    }),
    paymentAcquire: builder.mutation({
      query: (data) => ({
        url: ONBOARD.ACQUIRE_PAYMENT,
        method: 'POST',
        body: data,
      }),
    }),
    paymentSuccess: builder.mutation({
      query: (data) => ({
        url: ONBOARD.PAYMENT_SUCCESS,
        method: 'POST',
        body: data,
      }),
    }),

    getPackages: builder.query({
      query: () => ONBOARD.PACKAGE_LIST,
    }),
  }),
})

export const {
  useEmailVerificationMutation,
  useOtpVerificationMutation,
  useGetPackagesQuery,
  useCreateStoreMutation,
  usePaymentAcquireMutation,
  usePaymentSuccessMutation,
} = onboardApi

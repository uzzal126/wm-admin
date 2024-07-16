import {APPEARANCE} from '../../endpoints/appearance'
import {apiSlice} from '../apiSlice'

export const onboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThemeData: builder.mutation<any, any>({
      query: (data) => ({
        url: APPEARANCE.THEME_DATA,
        method: 'POST',
        body: data,
      }),
    }),
    themeUpdate: builder.mutation<any, any>({
      query: (data) => ({
        url: APPEARANCE.THEME_UPDATE,
        method: 'POST',
        body: data,
      }),
    }),
    updateSetting: builder.mutation<any, any>({
      query: (data) => ({
        url: APPEARANCE.THEME_STORE_SETTING,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {useGetThemeDataMutation, useThemeUpdateMutation, useUpdateSettingMutation} =
  onboardApi

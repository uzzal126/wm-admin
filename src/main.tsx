import React from 'react'
import ReactDOM from 'react-dom/client'
// Axios
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import 'flatpickr/dist/flatpickr.css'
import 'react-toastify/dist/ReactToastify.css'
import './_metronic/assets/sass1/plugins.scss'
import './_metronic/assets/sass1/style.react.scss'
import './_metronic/assets/sass1/style.scss'
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'

import {Provider} from 'react-redux'
import {store} from './_metronic/redux/store'
import {AuthProvider, setupAxios} from './app/modules/auth'
import ErrorBoundary from './app/modules/errors/ErrorBoundery'
import {AppRoutes} from './app/routing/AppRoutes'

setupAxios(axios, '')

Chart.register(...registerables)

const queryClient = new QueryClient()

const rootElement: any = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MetronicI18nProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </MetronicI18nProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

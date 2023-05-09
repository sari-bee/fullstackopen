import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './NotificationContext'
import { ErrorContextProvider } from './ErrorContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)

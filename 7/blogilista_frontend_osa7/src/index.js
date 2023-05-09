import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './NotificationContext'
import { ErrorContextProvider } from './ErrorContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <ErrorContextProvider>
      <App />
    </ErrorContextProvider>
  </NotificationContextProvider>
)

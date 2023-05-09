import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "LOGOUT":
        return 'logout successful'
      case "LOGIN":
        return 'login successful'
      case "ADDBLOG":
        return `added ${action.payload.title} by ${action.payload.author}`
      case "DELETE":
        return 'blog deleted'
      case "RESET":
        return null
      default:
        return null
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
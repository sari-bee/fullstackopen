import { createContext, useReducer, useContext } from 'react'

const errorReducer = (state, action) => {
    switch (action.type) {
      case "AUTHENTICATIONERROR":
        return 'wrong username or password'
      case "ADDBLOGERROR":
        return 'adding blog failed'
      case "ADDLIKEERROR":
        return 'adding like failed'
      case "DELETEERROR":
        return 'deleting blog failed'
      case "COMMENTERROR":
        return 'error adding comment'
      case "RESET":
        return null
      default:
        return null
    }
}

const ErrorContext = createContext()

export const ErrorContextProvider = (props) => {
    const [errormessage, errorDispatch] = useReducer(errorReducer, null)

    return (
        <ErrorContext.Provider value={[errormessage, errorDispatch]}>
            {props.children}
        </ErrorContext.Provider>
    )
}

export const useErrorDispatch = () => {
  const errorAndDispatch = useContext(ErrorContext)
  return errorAndDispatch[1]
}

export default ErrorContext
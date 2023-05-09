import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
    switch (action.type) {
      case "USER":
        return action.payload
      case "RESET":
        return null
      default:
        return null
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let changeState = {}
  switch (action.type) {
    case 'GOOD':
      changeState = {...state,
        good: state.good+1}
      state = changeState
      return state
    case 'OK':
      changeState = {...state,
        ok: state.ok+1}
      state = changeState
      return state
    case 'BAD':
      changeState = {...state,
        bad: state.bad+1}
      state = changeState
      return state
    case 'ZERO':
      state = initialState
      return state
    default: return state
  } 
}

export default counterReducer

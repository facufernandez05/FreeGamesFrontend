export const favsInitialState = JSON.parse(window.localStorage.getItem('favs')) || []

export const FAVS_ACTION_TYPES = {
  ADD_TO_FAVS: 'ADD_TO_FAVS',
  REMOVE_FROM_FAVS: 'REMOVE_FROM_FAVS',
  CLEAR_FAVS: 'CLEAR_FAVS'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
  if (typeof window === 'undefined') {
    window.localStorage.setItem('favs', JSON.stringify(state))
  }
}

const UPDATE_STATE_BY_ACTION = {
  [FAVS_ACTION_TYPES.ADD_TO_FAVS]: (state, action) => {
    const { id } = action.payload
    const productInFavIndex = state.findIndex(item => item.id === id)

    if (productInFavIndex >= 0) {
      // ⚡ usando el spread operator y slice
      const newState = [
        ...state.slice(0, productInFavIndex),
        { ...state[productInFavIndex], quantity: state[productInFavIndex].quantity + 1 },
        ...state.slice(productInFavIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [FAVS_ACTION_TYPES.REMOVE_FROM_FAVS]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },
  [FAVS_ACTION_TYPES.CLEAR_FAVS]: () => {
    updateLocalStorage([])
    return []
  }
}

export const favReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}

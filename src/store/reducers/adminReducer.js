import actionTypes from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
}

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state }
  switch (action.type) {
    // case actionTypes.FETCH_GENDER_START:
    //   copyState.isLoading = true
    //   return {
    //     ...copyState,
    //   }
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genders = action.data
      copyState.isLoading = false
      return {
        ...copyState,
      }
    case actionTypes.FETCH_GENDER_FAILED:
      copyState.isLoading = false
      copyState.genders = []
      return {
        ...state,
      }
    // POSITION
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positions = action.data
      copyState.isLoading = false
      return {
        ...copyState,
      }
    case actionTypes.FETCH_POSITION_FAILED:
      copyState.isLoading = false
      copyState.positions = []
      return {
        ...state,
      }
    // ROLE
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roles = action.data
      copyState.isLoading = false
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ROLE_FAILED:
      copyState.isLoading = false
      copyState.roles = []
      return {
        ...state,
      }
    default:
      console.log('Hello default')
      return state
  }
}

export default adminReducer

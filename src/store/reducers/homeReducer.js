import actionTypes from '../actions/actionTypes'

const initialState = {
  topDoctors: [],
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data
      return { ...state }
    case actionTypes.GET_TOP_DOCTOR_FAILED:
      state.topDoctors = []
      return { ...state }
    default:
      console.log('Hello default')
      return state
  }
}

export default homeReducer

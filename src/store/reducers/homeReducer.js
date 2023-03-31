import actionTypes from '../actions/actionTypes'

const initialState = {
  topDoctors: [],
  doctors: [],
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data
      return { ...state }
    case actionTypes.GET_TOP_DOCTOR_FAILED:
      state.topDoctors = []
      return { ...state }
    case actionTypes.GET_ALL_DOCTOR_SUCCESS:
      state.doctors = action.data
      return { ...state }
    case actionTypes.GET_ALL_DOCTOR_FAILED:
      state.doctors = []
      return { ...state }
    default:
      console.log('Hello default')
      return state
  }
}

export default homeReducer

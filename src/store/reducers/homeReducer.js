import actionTypes from '../actions/actionTypes'

const initialState = {
  topDoctors: [],
  doctors: [],
  doctorSchedule: [],
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
    case actionTypes.GET_ALLCODE_SCHEDULE_SUCCESS:
      state.doctorSchedule = action.data
      return { ...state }
    case actionTypes.GET_ALLCODE_SCHEDULE_FAILED:
      state.doctorSchedule = []
      return { ...state }
    default:
      console.log('Hello default')
      return state
  }
}

export default homeReducer

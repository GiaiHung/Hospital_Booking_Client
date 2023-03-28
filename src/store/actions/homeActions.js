import axios from '../../axios'
import actionTypes from './actionTypes'

const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/api/v1/home/top-doctor')
      if (res.data.status === 'success') {
        dispatch({
          type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
          data: res.data.data,
        })
      }
    } catch (error) {
      console.log('Fetch top doctor failed', error.response.data.message)
      dispatch({
        type: actionTypes.GET_TOP_DOCTOR_FAILED,
      })
    }
  }
}

export { fetchTopDoctor }

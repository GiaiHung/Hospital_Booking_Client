import actionTypes from './actionTypes'
import axios from '../../axios'

const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/api/v1/allcode?type=gender')
      if (res.data.status === 'success') {
        dispatch(fetchGenderSuccess(res.data.data))
      } else {
        dispatch(fetchGenderFailed())
      }
    } catch (error) {
      dispatch(fetchGenderFailed())
      console.log('fetchGenderStart error: ', error)
    }
  }
}

const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
})

const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
})

export { fetchGenderStart, fetchGenderSuccess, fetchGenderFailed }

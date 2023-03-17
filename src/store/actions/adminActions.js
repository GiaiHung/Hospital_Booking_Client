import actionTypes from './actionTypes'
import axios from '../../axios'

const fetchReduxData = (type) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`/api/v1/allcode?type=${type}`)
      if (res.data.status === 'success') {
        switch (type) {
          case 'gender':
            dispatch(fetchGenderSuccess(res.data.data))
            break
          case 'position':
            dispatch(fetchPositionSuccess(res.data.data))
            break
          case 'role':
            dispatch(fetchRoleSuccess(res.data.data))
            break
          default:
            return
        }
      } else {
        switch (type) {
          case 'gender':
            dispatch(fetchGenderFailed())
            break
          case 'position':
            dispatch(fetchPositionFailed())
            break
          case 'role':
            dispatch(fetchRoleFailed())
            break
          default:
            return
        }
      }
    } catch (error) {
      switch (type) {
        case 'gender':
          dispatch(fetchGenderFailed())
          break
        case 'position':
          dispatch(fetchPositionFailed())
          break
        case 'role':
          dispatch(fetchRoleFailed())
          break
        default:
          return
      }
      console.log('fetchGenderStart error: ', error)
    }
  }
}

// const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// })

const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
})

const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
})

const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
})

const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
})

const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
})

const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
})

export { fetchReduxData }

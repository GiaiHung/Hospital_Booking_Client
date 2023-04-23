import { toast } from 'react-toastify'
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
          case 'price':
            dispatch({
              type: actionTypes.GET_DOCTOR_PRICE_SUCCESS,
              data: res.data.data,
            })
            break
          case 'payment':
            dispatch({
              type: actionTypes.GET_DOCTOR_PAYMENT_SUCCESS,
              data: res.data.data,
            })
            break
          case 'province':
            dispatch({
              type: actionTypes.GET_DOCTOR_PROVINCE_SUCCESS,
              data: res.data.data,
            })
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

const createUserSuccess = (data) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data,
})

const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
})

const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
})

const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
})

const getUsersSuccess = (data) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  data,
})

const getUsersFailed = () => ({
  type: actionTypes.GET_USER_FAILED,
})

const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
})

const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
})

// CREATE
const createUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post('/api/v1/users', data)
      if (res.data.status === 'success') {
        toast.success('New user added successfully')
        dispatch(createUserSuccess(res.data.data))
        dispatch(getAllUsers())
      }
    } catch (error) {
      dispatch(createUserFailed())
      // toast.error('Error: ' + error.response.data.message)
    }
  }
}

// GET ALL
const getAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/api/v1/users')
      if (res.data.status === 'success') {
        dispatch(getUsersSuccess(res.data.data.reverse()))
      }
    } catch (error) {
      toast.error('Error: ' + error.response.data.message)
      dispatch(getUsersFailed())
    }
  }
}

// EDIT
const editUser = (data, id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.patch(`/api/v1/users/${id}`, data)
      if (res.data.status === 'success') {
        toast.success('User updated successfully')
        dispatch(editUserSuccess())
        dispatch(getAllUsers())
      }
    } catch (error) {
      toast.error('Error: ' + error.response.data.message)
      dispatch(editUserFailed())
    }
  }
}

const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.delete(`/api/v1/users/${id}`)
      if (res.data.status === 'success') {
        toast.warning('User has been deleted successfully')
        dispatch(deleteUserSuccess())
        dispatch(getAllUsers())
      }
    } catch (error) {
      toast.error('Error: ' + error.response.data.message)
      dispatch(deleteUserFailed())
    }
  }
}

export { fetchReduxData, createUser, getAllUsers, editUser, deleteUser }

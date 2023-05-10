import actionTypes from './actionTypes'

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

export {
  fetchGenderSuccess,
  fetchGenderFailed,
  fetchPositionSuccess,
  fetchPositionFailed,
  fetchRoleSuccess,
  fetchRoleFailed,
  createUserSuccess,
  createUserFailed,
  editUserSuccess,
  editUserFailed,
  getUsersSuccess,
  getUsersFailed,
  deleteUserSuccess,
  deleteUserFailed,
}

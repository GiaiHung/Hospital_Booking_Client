import actionTypes from './actionTypes'

const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
})

const userLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
})

const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo,
})

const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
})

export { addUserSuccess, userLoginSuccess, userLoginFail, processLogout }

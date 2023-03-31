import actionTypes from './actionTypes'
import axios from '../../axios'
import { toast } from 'react-toastify'

const getAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/api/v1/doctor')
      if (res.data.status === 'success') {
        dispatch({
          type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
          data: res.data.data,
        })
      }
    } catch (error) {
      dispatch({ type: actionTypes.GET_ALL_DOCTOR_FAILED })
      console.log(error)
    }
  }
}

const saveDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post('/api/v1/doctor', data)
      if (res.data.status === 'success') {
        dispatch({
          type: actionTypes.SAVE_DOCTOR_SUCCESS,
        })
        toast.success('Doctor updated successfully')
      }
    } catch (error) {
      toast.error('Save doctor failed')
      dispatch({
        type: actionTypes.SAVE_DOCTOR_FAILED,
      })
    }
  }
}

export { getAllDoctors, saveDoctor }

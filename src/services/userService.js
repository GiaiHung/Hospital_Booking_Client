import axios from '../axios'

const userService = {
  async handleLogin(email, password) {
    return await axios.post('/api/v1/auth/login', { email, password })
  },
  async getAllUsers() {
    return await axios.get('/api/v1/users')
  },
  async getUser(userId) {
    return await axios.get(`/api/v1/users/${userId}`)
  },
  async createUserService(data) {
    return await axios.post('/api/v1/users', data)
  },
  async deleteUserService(userId) {
    return await axios.delete(`/api/v1/users/${userId}`)
  },
  async updateUserService(user, userId) {
    return await axios.patch(`/api/v1/users/${userId}`, user)
  },
}
export default userService

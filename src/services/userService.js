import axios from '../axios'

const userService = {
  async handleLogin(email, password) {
    return await axios.post('/api/v1/auth/login', { email, password })
  },
}

export default userService

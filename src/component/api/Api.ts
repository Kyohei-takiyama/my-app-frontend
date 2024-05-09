import { ResponseAccount } from '../../stores/Account/Type'
import { ApiComponent } from '../Apicomponent'

// User API

export interface RequestUser {
  username: string
  password: string
}

const USER_API = import.meta.env.VITE_API_VERSION + 'users'
export const registerUser = async (data: RequestUser) => {
  return await ApiComponent('post', USER_API, data)
}

export const fetchUser = async () => {
  return await ApiComponent('get', USER_API)
}

// Auth API
const AUTH_API = import.meta.env.VITE_API_VERSION + 'auth'
export const loginAccount = async (data: RequestUser) => {
  return await ApiComponent<ResponseAccount>('post', `${AUTH_API}/login`, data)
}

import axios from 'axios'
import { QueryClient } from 'react-query'
import { firebase } from '@lib/firebase'

const { NEXT_PUBLIC_API_URL } = process.env

axios.defaults.baseURL = NEXT_PUBLIC_API_URL

axios.interceptors.request.use(
  async (config) => {
    const token = (await firebase.auth().currentUser?.getIdToken()) || null
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response) => response?.data ? response.data : response,
  (error) => {
    return Promise.reject(error)
  }
)

export const queryClient = new QueryClient()


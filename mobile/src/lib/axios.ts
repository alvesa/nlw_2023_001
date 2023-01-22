import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.8.180:3333',
  timeout: 7000
})
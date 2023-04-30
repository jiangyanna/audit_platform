import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
  method: 'post'
})

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(config => {
  if (config.method == 'post' && config.headers['Content-Type'] != 'multipart/form-data') {
    config.data = qs.stringify(config.data, { encode: false });
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axiosInstance.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default axiosInstance

import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
})

instance.interceptors.request.use(
  config => {
    return config;
  }, error => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    return response
  }
)

export default instance
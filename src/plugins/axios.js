import axios from "axios";
import store from '../modules/store' 
import router from '../modules/routes' 
//import router from '../modules/routes';
//172.24.52.4
axios.defaults.baseURL = 'http://172.24.52.4:7171/';

export default function axiosSetUp() {
  // point to your API endpoint
  // Add a request interceptor
  
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      const token = store.getters.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const originalRequest = error.config;
      if (error.response.status === 401 && originalRequest.url === '/api/refreshtoken') {  
        store.dispatch("logout").then(() => router.push("/login"))
        return Promise.reject(error);
      } else if (error.response.status === 401 && !originalRequest._retry) {
        
        originalRequest._retry = true;
        const payload = {
          access_token: localStorage.getItem('token') ,
          refresh_token: localStorage.getItem('refresh_token'),
          user: localStorage.getItem('user'),
        }; 
  
        const response= await axios.post(
          "/api/refreshtoken",
          payload
        );
        await store.dispatch("saveTokensToStorage", response.data);
      
        error.config.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
}
 

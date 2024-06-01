import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://kang-blogging.livelyflower-97543a9b.southeastasia.azurecontainerapps.io/",
    headers:{
        "Content-Type": "application/json",
    },
})

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  //  const authStates = useAppSelector((state)=>state.auth)
  // // if (authStates.accessToken && config.headers) {
  //    config.headers.Authorization = `Bearer ${authStates.accessToken}`;
  // // }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default axiosClient
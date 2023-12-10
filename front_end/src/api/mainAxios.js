import axios from "axios";



const axiosMain = axios.create({
    baseURL: 'http://localhost:3001'
  });

  axiosMain.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

export async function checkAndRefreshToken(){
  const res = await axiosMain.post("/refresh",{
      token: localStorage.getItem("RefreshToken") 
  }).catch((err) => {
    if(err.response.status === 401 || err.response.status === 403){
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      window.location.href = "/login";
    }
  })
  localStorage.setItem("AccessToken", res.data.accessToken);
  return res.data.accessToken;
}
export default axiosMain;

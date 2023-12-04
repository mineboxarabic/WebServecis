import axios from "axios";



const axiosMain = axios.create({
    baseURL: 'http://localhost:3001'
  });
export async function checkAndRefreshToken(){
  const res = await axiosMain.post("/refresh",{
      token: localStorage.getItem("RefreshToken")
  }).catch((err) => {
    console.log("Error",err);
  })
  localStorage.setItem("AccessToken", res.data.accessToken);
  return res.data.accessToken;
}
axiosMain.interceptors.request.use(config =>{
  checkAndRefreshToken();

  const token = localStorage.getItem("AccessToken");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
})

export default axiosMain;


const useUserToken = (t) => {


    const setToken = (token) => {
        localStorage.setItem('AccessToken', token);
    }
    const token = localStorage.getItem('AccessToken') ? localStorage.getItem('AccessToken') : null;
    
    return {token, setToken}
}

export default useUserToken;
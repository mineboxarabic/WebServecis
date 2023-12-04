import { useContext } from "react";
import { UserTokenContext } from "./context";
const useToken = () => {
    return useContext(UserTokenContext);;
};

export default useToken;
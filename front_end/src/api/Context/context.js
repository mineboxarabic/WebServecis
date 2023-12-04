import { createContext } from "react";
import { useState } from "react";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({children}) => {
    const [token, setToken] = useState({});

    return(
        <UserTokenContext.Provider value={{token, setToken}}>
            {children}
        </UserTokenContext.Provider>
    )
}
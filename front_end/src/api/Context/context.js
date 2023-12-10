import { createContext } from "react";
import { useState } from "react";

/**
 * This file is used to create a context for the user token.
 * This context is used to store the user token and pass it to the api calls.
 * 
 */

/**
 * @constant UserTokenContext
 * @type {object}
 * 
 */
export const UserTokenContext = createContext();

/**
 * UserTokenProvider is a function that returns a context provider to use in the app. 
 */
export const UserTokenProvider = ({children}) => {
    const [token, setToken] = useState({});

    return(
        <UserTokenContext.Provider value={{token, setToken}}>
            {children}
        </UserTokenContext.Provider>
    )
}
import { createContext, useContext, useState } from "react";
import jwt from 'jsonwebtoken';

const baseUrl = process.env.NEXT_PUBLIC_URL
const AuthContext = createContext()


export function useAuth() {
    const auth = useContext(AuthContext)
    return auth;
}

export function Authprovider(props) {
    const [state, setState] = useState({
        token: null,
        user: null,
        login,
        logout,
        
        
    })
    async function login(username, password) {
        const url = `${baseUrl}/api/token/`;
        const options = {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        }
        console.log(url,options)
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        const decodedToken = jwt.decode(data.access)

        console.log(123, decodedToken)

        const newState = {
            token : data,
            user :{
                username :decodedToken.username ,
                email : decodedToken.email ,
                id : decodedToken.user_id, 
            },

        }
        setState(prevState=> ({...prevState,... newState}));

    }

    function logout(){
        const newState={
            token : null, 
            user : null
        }
        setState(prevState=> ({...prevState,... newState}));

    }
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )

}
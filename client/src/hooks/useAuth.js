import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);


    const login = useCallback((jwtToken, id)=>{
        console.log("LOGIn",jwtToken,id)
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken
        }))
    },[])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    },[])

    useEffect(()=>{
        console.log("EFECT")
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token) {
            console.log("DATA",data.token)
            login(data.token, data.userId)
        }
    },[login])

    return {login,logout, token, userId}
}


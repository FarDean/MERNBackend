import React,{useContext,useEffect,useState} from 'react'
import {GlobalContext} from './../context/GlobalContext'
import auth from './../auth/auth-helper'

export default function Profile({match}) {
    const {read,user} = useContext(GlobalContext)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const jwt = auth.isAuthenticated();

        read(jwt,match.params)
        
    }, [match.params.userId])
    console.log(user);
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>{user.createdAt}</h3>
        </div>
    )
}

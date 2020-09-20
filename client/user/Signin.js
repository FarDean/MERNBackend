import React,{useContext,useState,useEffect} from 'react'
import {GlobalContext} from '../context/GlobalContext'
import auth from '../auth/auth-helper'
import { Redirect } from 'react-router'
export default function Signin() {
    const {signIn,message,loading,token} = useContext(GlobalContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    function onSubmit(e) {
        e.preventDefault()
        const user = {
            email,
            password
        }
        console.log(user)
        signIn(user)
        console.log(typeof signIn(user));
    }
    useEffect(() => {
        if(token){
            auth.autheticate(token,()=>setRedirect(true))
        }
    }, [token])
    console.log(token)

    if(redirect){
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div>
            {loading && <h1>loading...</h1>}
            
            <h2>Sign In</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Eamil</label>
                <input onChange={e=>setEmail(e.target.value)} type="email" name="email" id="name"/>
                <label htmlFor="password">Password</label>
                <input onChange={e=>setPassword(e.target.value)} type="password" name="password" id="password"/>
                <input type="submit" name="submit" />
            </form>
        </div>
    )
}

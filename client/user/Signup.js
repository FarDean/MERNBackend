import { Card, TextField, Typography,CardContent,CardActions,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Link } from '@material-ui/core';
import React,{useState,useEffect,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {GlobalContext} from '../context/GlobalContext'
import { create } from "./api-user";


export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {createUser,message} = useContext(GlobalContext) 
    
    const onSubmit = e=>{
      e.preventDefault()

      const newUser = {
        name,
        email,
        password
      }

      createUser(newUser)
    }

    return (
      <>
        {message && <h1>{message}</h1>}
        <form onSubmit={onSubmit}>
            <label htmlFor="name">name</label>
            <input onChange={e=>setName(e.target.value)} type="text"/>
            <label htmlFor="email">email</label>
            <input onChange={e=>setEmail(e.target.value)} type="email"/>
            <label htmlFor="password">password</label>
            <input onChange={e=>setPassword(e.target.value)} type="password" name="password" id="password"/>
            <input type="submit"/>

        </form>
      </>
    )
}

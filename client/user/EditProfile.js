import React,{useContext,useState} from 'react'
import { Redirect } from 'react-router';
import auth from '../auth/auth-helper';
import { GlobalContext } from "./../context/GlobalContext";

export default function EditProfile({match}) {
    const {user,updateUser,setUser} = useContext(GlobalContext)
    let updatedUser = user
    const [newName, setNewName] = useState(user.name)
    const [newEmail, setNewEmail] = useState(user.email)
    const [newPassword, setNewPassword] = useState(user.password)

    const [redirect, setRedirect] = useState(false)

    const jwt = auth.isAuthenticated()
    function onSubmit(e) {
        e.preventDefault()

        updatedUser ={
            name:newName,
            email:newEmail,
            password:newPassword
        }
        setUser(updatedUser)
        updateUser(jwt,match.params,updatedUser)
        setRedirect(true)
    }
    if(redirect){
        return (
            <Redirect to='/users' />
        )
    }
    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input onChange={e=>setNewName(e.target.value)} type="text" name="name"/>
                <label htmlFor="email">Email</label>
                <input onChange={e=>setNewEmail(e.target.value)}  type="email" name="email" id="email"/>
                <label htmlFor="password">password</label>
                <input onChange={e=>setNewPassword(e.target.value)} type="password"/>
                <button>Submit</button>
            </form>
        </div>
    )
}

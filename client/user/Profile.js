import React,{useContext,useEffect,useState} from 'react'
import {GlobalContext} from './../context/GlobalContext'
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'


export default function Profile({match}) {
    const {read,user,message,deleteUser} = useContext(GlobalContext)
    const [modalOpen, setModalOpen] = useState(false)

    const jwt = auth.isAuthenticated();

    
    if(jwt){
        useEffect(() => {

            read(jwt,match.params)
            
        }, [match.params.userId])
    }else{
        
        return (
            <Redirect to='/signIn' />
        )
    }

    function onDelete(){
        deleteUser(jwt,match.params)
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>{user.createdAt}</h3>
            {jwt && user._id === jwt_decode(jwt)._id && 
            <>
                <Link to={`/user/edit/${user._id}`} >
                    <button>Edit</button>
                </Link>
                <button onClick={()=>setModalOpen(!modalOpen)}>Delete</button>
                {modalOpen && (
                    <>
                        <h1>Are you sure u want to delete your account?</h1>
                        <button onClick={onDelete}>Yes!</button><span>-</span><button onClick={()=>setModalOpen(!modalOpen)}>No</button>
                        {message}
                    </>
                )}
            </>
            }
        </div>
    )
}

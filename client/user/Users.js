import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const list = async()=>{
            try {
                let res = await axios({
                    method: 'GET',
                    url: '/api/users'
                })
                setUsers(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        list()
    }, [])
    
    return (
        <>
           {users.map(user=>(
               <h1 key={user._id}><Link to={`/users/${user._id}`}>{user.name}</Link></h1>
           ))}
        </>
    )
}

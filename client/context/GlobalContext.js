import React,{createContext,useReducer} from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'
import { functions } from 'lodash'
const initialState = {
    users:[],
    loading:false,
    message:null,
    error:null,
    token:null,
    user:{},
    setUser:()=>{}
}

// Create Context 
export const GlobalContext = createContext(initialState)


// Provider component
export const GlobalProvider = ({children})=>{
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    async function getUsers(){
        try {
            const res = await axios({
                method:'GET',
                url:'/api/users'
            })

            dispatch({
                type: 'GET_USERS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    async function createUser(user){
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users',user,config)
            console.log(res.data.message);
            dispatch({
                type: 'CREATE_USER',
                payload: user,
                message:res.data.message
            })
        } catch (err) {
            console.log(err)
        }
    }

    // async function getProfile(params,credentials){
    //     const config = {
    //         headers:{
    //             'Content-Type' : 'applocation/json',
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + credentials.t
    //         }
    //     }

    //     try {
    //         loading=true
    //         const res = await axios.get('/api/users/'+params.userId)
            
    //         dispatch({
    //             type: 'GET_USER_PROFILE',
    //             payload:
    //         })
    //     } catch (err) {
            
    //     }
    // }

    async function signIn(user){
        const config = {
            headers:{
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
            },
            withCredentials: true
        }
        try {
            
            const res = await axios.post('/auth/signin',user,config)
            console.log(res)
            dispatch({
                type: 'SIGN_IN',
                payload:res.data.token,
                message:res.data.message
            
            })
        } catch (err) {
            console.log(err)
        }
    }

    async function read(jwt,params) {
        const config = {
            headers : {
                'Authorization' : `Bearer ${jwt}`
            }
        }

        try {
            const res = await axios.get(`/api/users/${params.userId}`,config)
            
            dispatch({
                type: 'READ_USER',
                payload: res.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function updateUser(jwt,params,user){
        const config = {
            headers:{
                'Authorization' : `Bearer ${jwt}`
            }
        }
        try {
            const res = await axios.put(`/api/users/${params.userId}`,user,config)
            console.log(res);
            dispatch({
                type: 'UPDATE_USER',
                payload:res.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteUser(jwt,params){
        const config = {
            headers: {
                'Authorization' : `Bearer ${jwt}`
            }
        }

        try {
            const res = axios.delete(`/api/users/${params.userId}`,config)

            dispatch({
                type: 'DELETE_USER',
                payload: 'acount deleted successfully'
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (<GlobalContext.Provider value={{
        users:state.users,
        loading:state.loading,
        message:state.message,
        createUser,
        getUsers,
        signIn,
        read,
        updateUser,
        deleteUser,
        user:state.user,
        token:state.token,
        setUser:state.setUser
    }}>
        {children}
    </GlobalContext.Provider>)
}


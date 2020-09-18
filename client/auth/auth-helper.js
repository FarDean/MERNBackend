import { signout } from "./api-auth";

const auth = {
    autheticate:(jwt,cb)=>{
        if(typeof window !== 'undefined') sessionStorage.setItem('jwt',JSON.stringify(jwt))
        cb()
    },
    isAuthenticated:()=>{
        if(typeof window == 'undefined')return false
        if(sessionStorage.getItem('jwt'))return JSON.parse(sessionStorage.getItem('jwt'))
        else return false
    },
    cleareJwt:async(cb)=>{
        if(typeof window !== 'undefined') sessionStorage.removeItem('jwt')
        cb()
        // const data = await signout()
        // document.cookie = 't'
    }

}

export default auth
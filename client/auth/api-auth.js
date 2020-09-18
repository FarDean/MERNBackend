import axios from 'axios'

const signing = async(user)=>{
    try {
        let res = await axios({
            method: 'POST',
            url: '/auth/signin',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:user
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

const signout = async()=>{
    try {
        let res = await axios({
            method: 'GET',
            url: '/auth/signout'
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

export {signout,signing}
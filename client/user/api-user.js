import axios from 'axios'

const create = async user=>{
    try {
        let res = await axios({
            method: 'post',
            url:'/api/users',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:user
        })
        console.log(res);
    } catch (err) {
        console.log(err)
    }
}

const list = async()=>{
    try {
        let res = await axios({
            method: 'GET',
            url: '/api/users'
        })
        const items = res.data
        return items
    } catch (err) {
        console.log(err);
    }
}

const read = async(credentials,params)=>{
    try {
        let res = await axios({
            method: 'GET',
            url: '/api/users/' + params.userId,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +credentials
            }
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

const update = async (user,params,credentials)=>{
    try {
        let res = await axios({
            method: 'PUT',
            url:'/api/users' + params.userId,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +credentials.t
            },
            data:user
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

const remove = async (params,credentials)=>{
    try {
        let res = await axios({
            method: 'DELETE',
            url: '/api/users/' + params.userId,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +credentials.t
            }
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

export {create,list,update,remove,read}
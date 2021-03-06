import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

const signin = async (req,res)=>{
    const {email,password} = req.body
    try {
        let user = await User.findOne({email:email})
        if(!user) return res.status(401).json({error:"User not found!"})

        if(!user.authenticate(password)){
            return res.status(401).json({error:"Email and password don't match."})
        }

        const token = jwt.sign({_id:user._id},config.jwtSecret)

        res.cookie('t',token,{expires:new Date(Number(new Date()) + 315360000000)})

        return res.json({
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(401).json({error:"Could not sign in!"})
    }
}

const signout = (req,res)=>{
    res.clearCookie('t')
    return res.status(200).json({
        message: "signed out"
    })
}

const requireSignin = expressJwt({
    secret:config.jwtSecret,
    userProperty:'auth',
    algorithms: ['HS256']
})

const hasAuth=(req,res,next)=> {
    const authorized =req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized!"
        })
    }
    next()
}

export default {signin,signout,hasAuth,requireSignin}
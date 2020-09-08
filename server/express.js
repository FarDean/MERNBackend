import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/',userRouter)
app.use('/auth',authRouter)


app.get('/',(req,res)=>{
    res.status(200).send(Template())
})

// express-jwt error handler
app.use((err,req,res,next)=>{
    if(err.name === 'UnautherizedError'){
        res.status(401).json({
            error: err.name + ": " + err.message
        })
    }else if(err){
        res.status(400).json({
            error: err.name + ': ' + err.message
        })
        console.log(err)
    }
}) 


export default app
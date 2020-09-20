import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import devBundle from './devBundle'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
const StaticRouter =require('react-router-dom').StaticRouter
import MainRouter from './../client/MainRouter'
import { ServerStyleSheets,ThemeProvider } from "@material-ui/styles";
import theme from './../client/theme'
const app = express()
devBundle.compile(app)

const CURRENT_WORKING_DIRECTORY = process.cwd()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('dist',express.static(path.resolve(CURRENT_WORKING_DIRECTORY, 'dist')));

app.use('/',userRouter)
app.use('/',authRouter)

app.get('*',(req,res)=>{
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </StaticRouter>
        )
    )

    if(context.url) {
        return res.redirect(303,context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
        markup:markup,
        css:css
    }))
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
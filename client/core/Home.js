import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import homeImg from './../assets/images/home-image.jpg'
import {Link} from 'react-router-dom'
import auth from './../auth/auth-helper'
const useStyles = makeStyles(theme => ({  card: {    maxWidth: 600,    margin: 'auto',    marginTop: theme.spacing(5)  },  title: {    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,    color: theme.palette.openTitle  },  media: {    minHeight: 400  } }))

export default function Home() {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <Link to="/users">Users</Link> 
            <Link to="/signup">Sign Up</Link> 
            <Link to="/signin">Sign IN</Link> 
            <Typography>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={homeImg} title="social" />
            <CardContent>
                <Typography variant="body2" component='p'>
                    Welcome to FarDean's Social Media
                </Typography>
            </CardContent>
            
        </Card>
    )
}


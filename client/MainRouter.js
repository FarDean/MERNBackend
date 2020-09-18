import React from 'react'
import { Route,Switch } from "react-router-dom";
import { GlobalProvider } from './context/GlobalContext';
import Home from './core/Home'
import Signup from './user/Signup';
import Users from './user/Users';
import Signin from './user/Signin'
import Profile from './user/Profile';

export default function MainRouter() {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users' component={Users} />
            <Route path='/users/:userId' component={Profile} />
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
        </Switch>

    )
}

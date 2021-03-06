import React from 'react'
import { Route,Switch } from "react-router-dom";
import { GlobalProvider } from './context/GlobalContext';
import Home from './core/Home'
import Signup from './user/Signup';
import Users from './user/Users';
import Signin from './user/Signin'
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/EditProfile';

export default function MainRouter() {
    return (
       <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/:userId' component={Profile} />
            <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
        
        </Switch>
    )
}

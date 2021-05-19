import React,{useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import PrivateRoute from './auth/PrivateRoute'; 
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Chat from "./user/Chat";
import ChatDef from "./user/ChatDef";
import logo from './core/b9.jpg'; // with import
import logo1 from './core/bg12.png'; // with import
import { isAuthenticated } from "./auth/Index";
function MainRouter(){
    
 
   const [isauth,setauth] =React.useState(false);


return <div style={{ backgroundImage: isauth ? `url(${logo1})`: `url(${logo})`, paddingBottom:"70%" , paddingTop : "0%", marginLeft :"0%" , marginRight:"0%"}}>
        <Menu f={setauth} />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/chat/:user1Id/:user2Id" component={Chat} />
            <PrivateRoute exact path="/chats/:userId" component={ChatDef} />
        </Switch>
        
    </div> 
    
     
    

}


export default MainRouter;
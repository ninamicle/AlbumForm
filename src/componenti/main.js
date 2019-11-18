import React from 'react';

import {Switch, Route} from 'react-router-dom';
import Pokedex from './pokedex';
import MyProfile from './myprofile';
import Utenti from './utenti';
import LoginForm from './LoginForm';



const Main =()=>(
    <Switch>
    <Route exact path="/" component={LoginForm}/>
    <Route  path="/pokedex" component={Pokedex}/>
    <Route  path="/utenti" component={Utenti}/>
    <Route  path="/myprofile" component={MyProfile}/>
    
    <Route exact path="/LoginForm" component={LoginForm}/>
    </Switch>

)
export default Main;
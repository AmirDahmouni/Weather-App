import './components/styles/App.css';
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./components/styles/App.css"

import SignUp  from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';
import Home from "./components/screens/Home"
import NavBar from "./components/screens/NavBar"
import PortectedRoute from './components/screens/ProtectedRoute';
import AppContext from './AppContext';

function App() {
  return (
    <AppContext>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={SignIn}/>
      <PortectedRoute path="/Home" component={Home}/>
      <Route path="/signUp" component={SignUp}/>
    </Switch>  
    </AppContext>
  );
}

export default App;

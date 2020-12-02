import React , {useState,useEffect} from 'react';
import LabLogin from "./components/LabLogin.js"
import EmployeeLogin from "./components/EmployeeLogin.js"
import Register from "./components/Register.js"
import Navagation from "./components/Navagation.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TestCollection from './components/TestCollection'
import PoolMapping from './components/PoolMapping'
import EmployeeResult from './components/EmployeeResult.js';
import Home from './components/Home'
import LabHome from './components/LabHome'
import WellTesting from './components/WellTesting'


function App() {

  const [loggedIn,setLogIn] = useState("");

  useEffect(()=>{
    console.log("log in is " +loggedIn )
    console.log(localStorage.getItem("user"))
    setLogIn(localStorage.getItem("user"))
  },[loggedIn])

  return (
    <>

      <Router>
      <Navagation user = {loggedIn} setLogIn={setLogIn}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route
           exact path="/labLogin"
           render={(props) => (<LabLogin {...props} setLogIn ={setLogIn} />)}/>
          <Route exact path="/labHome" component={LabHome}/>
          <Route 
            exact path="/employeeLogin" 
            render={(props) => (<EmployeeLogin {...props} setLogIn = {setLogIn} />)}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/poolMapping" component={PoolMapping}/>
          <Route exact path="/employeeResult" component={EmployeeResult}/>
          <Route exact path="/testCollection" component={TestCollection}/>
          <Route exact path="/wellTesting" component={WellTesting}/>
        </Switch>
      </Router>
    </>

  );
}

export default App;

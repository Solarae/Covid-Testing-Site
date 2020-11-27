import React from 'react';
import LabLogin from "./components/LabLogin.js"
import EmployeeLogin from "./components/EmployeeLogin.js"
import Register from "./components/Register.js"
import Navagation from "./components/Navagation.js"
import { Button , Form } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TestCollection from './components/TestCollection'
import PoolMapping from './components/PoolMapping'


function App() {
  return (
    <>
      <Navagation />
      <Router>
        <Switch>
          <Route exact path="/labLogin" component={LabLogin}/>
          <Route exact path="/employeeLogin" component={EmployeeLogin}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/poolMapping" component={PoolMapping}/>
        </Switch>
      </Router>
    </>

  );
}

export default App;

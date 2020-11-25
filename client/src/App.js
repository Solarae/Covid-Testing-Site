
import React from 'react';
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;

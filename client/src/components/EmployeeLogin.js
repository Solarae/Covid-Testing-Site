import React , {useState} from 'react';
import { Button , Form } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

const EmployeeLogin = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        console.log("email :" +email + " password "+password)


        // fetch("http://localhost:5000/api/employees/login", {
        //     method: 'POST',
        //     body:JSON.stringify({email:email,password:password}),
        //     mode:'cors',
            
        //   })



        axios.post("http://localhost:5000/api/employees/login", {
            email: email,
            password: password
          },{withCredentials: true})
          .then(function (response) {
            console.log(response);
            if(response.data){
              history.push("/employeeResult")
            }
              
            else
              console.log("Wrong email or password")
          })
          .catch(function (error) {
            console.log(error);
          });
    }



    return (
        <>


            <h1>Employee Login Page</h1>
        
            <Form onSubmit = {handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email email</Form.Label>
                  <Form.Control onChange = {e => setEmail(e.target.value) }  type="email" placeholder="Enter email" />
                  <Form.Text >
                  Don't have an account? <Link to="/register">Click here to register! </Link>
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange = {e => setPassword(e.target.value) } type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Login Collector
              </Button>

              <Button variant="primary" type="submit">
                Lab login
              </Button>
            </Form>
        </>
    )
}


export default EmployeeLogin;
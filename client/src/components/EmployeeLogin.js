import React , {useState} from 'react';
import { Button , Form, Container } from 'react-bootstrap';
import '../css/Login.css';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";

const EmployeeLogin = (props) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        console.log("email :" +email + " password "+password)

        axios.post("http://localhost:5000/api/employees/login", {
            email: email,
            password: password
          },{withCredentials: true})
          .then(function (response) {
            console.log(response);
            if(response.data){
              
              props.setLogIn([true,"Employee"])
              localStorage.setItem("user",[true,"Employee"])
              history.push("/employeeResult");

            }
              
            else
              console.log("Wrong email or password")
          })
          .catch(function (error) {
            console.log(error);
          });
    }



    return (
        <Container className='text-center'>
           <h1>Employee Login Page</h1>
        
          <Form onSubmit = {handleSubmit}>
            <div className='text-left'>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange = {e => setEmail(e.target.value) }  type="email" placeholder="Enter email" />
                  <Form.Text >
                  Don't have an account? <Link to="/register">Click here to register! </Link>
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange = {e => setPassword(e.target.value) } type="password" placeholder="Password" />
              </Form.Group>
            </div>
            <div className='text-center'>
              <Button variant="primary" type="submit">
                Login Collector
            </Button>
            </div>
          </Form>
          </Container>
      
    )
}


export default EmployeeLogin;
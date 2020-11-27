import React , {useState} from 'react';
import { Button , Form } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';


import {Link} from "react-router-dom";

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e =>{
        e.preventDefault();

        console.log("email :" +email + " password "+password)


        // fetch("http://localhost:5000/api/employees/login", {
        //     method: 'POST',
        //     body:JSON.stringify({email:email,password:password}),
        //     mode:'cors',
            
        //   })



        axios.post("http://localhost:5000/api/labEmployees/login", {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log(response);
            if(response.data)
              localStorage.setItem('user', response.data)
            else
              console.log("Wrong email or password")
          })
          .catch(function (error) {
            console.log(error);
          });




    }



    return (
        <>


            <h1> Lab Technician Login Page</h1>
        
            <Form onSubmit = {handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Lab Technician ID</Form.Label>
                  <Form.Control onChange = {e => setEmail(e.target.value) }  type="email" placeholder="Enter ID" />
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


export default Login;
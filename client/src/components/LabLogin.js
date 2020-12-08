import React , {useState} from 'react';
import { Button , Form, Container } from 'react-bootstrap';
import '../css/Login.css';
import axios from 'axios';
import {useHistory} from "react-router-dom";

import {Link} from "react-router-dom";

const Login = (props) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    const handleSubmit = e =>{
        e.preventDefault();
        console.log("email "+email + " password "+password)
        axios.post("/api/labEmployees/login", {
            email: email,
            password: password
          },{withCredentials:true})
          .then(function (response) {
            console.log(response);
            if(response.data){
              props.setLogIn([true,"LabEmployee"])
              localStorage.setItem("user",[true,"LabEmployee"])
              history.push("/labHome")
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
          <h1> Lab Technician Login Page</h1>
          
          <Form onSubmit = {handleSubmit}>
            <div className='text-left'>
            <Form.Group>
                <Form.Label>Lab Technician ID</Form.Label>
                <Form.Control onChange = {e => setEmail(e.target.value) } placeholder="Enter ID" />
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
              Lab Login
            </Button>
            </div>
          </Form>
        </Container>
    )
}


export default Login;
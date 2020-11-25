import React from 'react';
import { Button , Form } from 'react-bootstrap';
const Register = () => {

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = new FormData(e.target);

    //     console.log("data : "+e.target)
        
    //     fetch("http://localhost:5000/api/employees", {
    //       method: 'POST',
    //       body: {data:"xxx"},
    //     }).then(res=>{
    //         console.log(res);
    //     });
    // }


    return(
            <Form method = "POST" action = "http://localhost:5000/api/employees" >
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control name="firstName" type="text" placeholder="Enter first name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Enter last name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control name="employeeID" type="text" placeholder="Enter ID" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register for employee
                </Button>
                <Button variant="primary" type="submit">
                    Register for lab technician
                </Button>
            </Form>
    )
}



export default Register;
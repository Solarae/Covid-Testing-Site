import React ,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,FormControl,Nav,Navbar,Button} from 'react-bootstrap'
// import './Navagation.css'

const Navagation = () => {
    return (
    <>   
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/employeeLogin">Login Employee</Nav.Link>
                <Nav.Link href="/labLogin">Login Lab Technician</Nav.Link>
            </Nav>
        </Navbar>
    </>
    )
}

export default Navagation;
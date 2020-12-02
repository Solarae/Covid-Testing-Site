import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Form,FormControl,Nav,Navbar,Button} from 'react-bootstrap'
// import './Navagation.css'

const Navagation = (props) => {


    const history = useHistory();
    const logOutUser = async () =>{



        let result = await axios.get('/api/employees/logout',{withCredentials:true})
        console.log(result)


        props.setLogIn([false,""]);
        localStorage.setItem("user",[false,""])
        history.push("/");

    }



    if(props.user === "true,Employee"){
        return (
            <>   
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">About</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/employeeResult">Employee Result</Nav.Link>
                        <Button onClick={logOutUser}>Logout</Button>
                    </Nav>
                </Navbar>
            </>
            )
    }


    else if(props.user==="true,LabEmployee"){
        return(
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">About</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/testCollection">Test Collection</Nav.Link>
                        <Nav.Link href="/poolMapping">Pool Mapping</Nav.Link>
                        <Nav.Link href="/wellTesting">Well Testing</Nav.Link>
                        <Button onClick={logOutUser}>Logout</Button>
                    </Nav>
                </Navbar>
            </>
        )
    }

    



    else{
        return (
            <>   
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">About</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/employeeLogin">Login Employee</Nav.Link>
                        <Nav.Link href="/labLogin">Login Lab Technician</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        )
    }

}

export default Navagation;
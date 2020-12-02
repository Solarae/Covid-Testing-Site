import React from 'react';
import { Button , Form } from 'react-bootstrap';
import {Link} from "react-router-dom";
const LabHome = () =>{
    return(
        <>
            <h1>Welcome Lab Employee!</h1>
            <h1>Choose option</h1>

            <ul>
                <li><Link to= "/testCollection">Test Collection Page</Link></li>
                <li><Link to="/poolMapping">Pool Mapping Page</Link></li>
                <li><Link to="/wellTesting">Well Testing Page</Link></li>
            </ul>


        </>
    )
}


export default LabHome;
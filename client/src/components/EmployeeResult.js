import React , {useState,useEffect} from 'react';
import axios from 'axios'

const EmployeeResult = () =>{

    const [result,setResult] = useState();
    const [user,setUser] = useState({});


    useEffect(() =>{
        getResults();
    })


    const getResults = async () =>{

        let res = await axios.get("/api/employees/getInfo",{withCredentials:true});

        console.log(res);


    }










    return(
        <>
            <h1>Welcome to eomployee result</h1>
        </>
    )
}

export default EmployeeResult;
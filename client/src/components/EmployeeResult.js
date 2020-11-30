import React , {useState,useEffect} from 'react';
import axios from 'axios'
import { Table } from 'reactstrap';

const EmployeeResult = () =>{

    const [result,setResult] = useState();
    const [user,setUser] = useState("");


    useEffect(() =>{
        getResults();
    },[])


    const getResults = async () =>{


        //getting logged in user's info
        let userInfo = await axios.get("/api/employees/getInfo",{withCredentials:true});
        console.log(userInfo);
        setUser(userInfo.data);


        //get all the test barcodes in which this employee has
        let testBarcodes = await axios.get("/api/employeeTests/getTestBarcodes/22342345",{withCredentials:true})
        
        console.log(testBarcodes)

        


    }










    return(
        <>
            <h1>Welcome to employee result</h1>

            <h2>{user.employeeID}</h2>

            <Table>
                <thead>
                    <tr>
                        <th>Collection Date</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>

            </Table>


        </>
    )
}

export default EmployeeResult;
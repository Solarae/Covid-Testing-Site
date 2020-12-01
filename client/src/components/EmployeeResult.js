import React , {useState,useEffect} from 'react';
import axios from 'axios'
import { Table } from 'reactstrap';

const EmployeeResult = () =>{

    const [test,setTest] = useState([]);
    const [user,setUser] = useState("");


    useEffect(() =>{
        getResults();
    },[])


    const getResults = async () =>{


        //getting logged in user's info
        let userInfo = await axios.get("/api/employees/getInfo",{withCredentials:true});
        console.log(userInfo);
        setUser(userInfo.data);


        //get all the tests in which this employee has
        let tests = await axios.get("api/tests/113222636",{withCredentials:true})
        setTest(tests.data)
        console.log(tests.data)
    }










    return(
        <>
            <h1>Welcome to employee result</h1>

            <h2>{user._id}</h2>

            <Table>
                <thead>
                    <tr>
                        <th>Collection Date</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {test.map((element) => 

                        <>
                            <tr>
                                <td>{element.collectionTime}</td>
                                <td>{element.result}</td>
                            </tr>
                        </>
                    )}
                </tbody>

            </Table>


        </>
    )
}

export default EmployeeResult;
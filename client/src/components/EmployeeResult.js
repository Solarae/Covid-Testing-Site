import React , {useState,useEffect} from 'react';
import axios from 'axios'
import { Table } from 'reactstrap';
import '../css/EmployeeResult.css'
import {Link} from "react-router-dom";
const EmployeeResult = () =>{

    const [test,setTest] = useState([]);
    const [user,setUser] = useState({});
    const [isAuthorized,setAuthorized] = useState(true);

    useEffect(() =>{
        getResults();
    },[])


    const getResults = async () =>{


        //getting logged in user's info
        let userInfo = await axios.get("/api/employees/getInfo",{withCredentials:true});
        console.log(userInfo);
        setUser(userInfo.data);

        if(!userInfo.data) setAuthorized(false)


        //get all the tests in which this employee has
        console.log(user)
        let tests = await axios.get(`/api/tests/getTests/${userInfo.data._id}`,{withCredentials:true})
        // if (tests.data) setTest(tests.data)

        console.log(tests)

        //for each test, find the pools they are in and for each pools,find the well and get result
        await Promise.all(tests.data.map(async (element) => {
            await Promise.all(element.pools.map(async (pool)=>{
                console.log("checking for pool "+pool)
                //make api call for the given pool to get the well
                let res = await axios.get(`/api/pools/${pool}`)
                console.log("well that this pool got :")


                if(res.data){
                    console.log(res.data)
                    //with the well we got, find the well and get result
                    let well = await axios.get(`/api/wells/${res.data.well_id}`)
                    let finalResult = well.data ? well.data.result:null
                    console.log(finalResult)


                    //if result is already negative, always assign negative
                    //if the well result is positive , just set positive
                    if(element.result === "negative" || finalResult === "negative") element.result = "negative" ;
                    else element.result = finalResult ? finalResult:"Not assigned";


                }else console.log("No well is found")
        

            }))
        }));

        console.log(tests.data)
        setTest(tests.data)


    }



    if(!isAuthorized){
        return(
            <div className="justify-content-center">
                <h1>You are not authorized to view this page ! Please <Link to="/employeeLogin">login as an Employee </Link></h1>
            </div>
        ) 
    }







    return(
        <>
            <div className="row justify-content-center">
                <h1>Welcome to employee result page ! </h1>
            </div>

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
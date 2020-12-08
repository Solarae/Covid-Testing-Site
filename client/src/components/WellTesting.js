import React ,{useState,useEffect} from 'react';
import axios from 'axios'
import { Table,Modal,ModalHeader,ModalBody,ModalFooter, Container, Row, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Link} from "react-router-dom";
const WellTesting = () =>{

    const [poolBarcode,setPoolBarcode] = useState("");
    const [wellBarcode,setWellBarcode] = useState("");
    const [isAuthorized,setAuthorized] = useState(true);

    const [selected,setSelected] = useState([]);
    const [data,setData] = useState([]);
    const[result,setResult] = useState("inprogress");

    const [poolError,setPoolError] = useState("")
    const [wellError,setWellError] = useState("")
    const [modal, setModal] = useState(false);
  
    const toggle = () => {
        setModal(!modal)

        if(modal){
            setWellBarcode(selected[0])
            setPoolBarcode(selected[1])
        }
    };

    useEffect(()=>{
        getData()
    },[])



    const getData = async () =>{
        let results = await axios.get("/api/wells")
        console.log(results)

        if(results.data) setData(results.data)


        let user = await axios.get('/api/labemployees/getInfo',{withCredentials:true})
        console.log(user)
        if(!user.data) setAuthorized(false)


    }




    const submitForm = async (e) =>{
        e.preventDefault()


        setWellError("")
        setPoolError("")


        //POST a new well


        //get pool

        let pool = await  axios.get(`/api/pools/${poolBarcode}`)

        let well = await  axios.get(`/api/wells`)

        if(well.data){

            well.data.forEach(element => {
                if(element._id === wellBarcode) {
                    setWellError("Error! This well has already been used!")
                }
            });

        }




        if(pool.data && wellError === "" && poolError === "" ){
            console.log(pool)
            await axios.post("/api/wells",{
                _id:wellBarcode,
                pool_id:poolBarcode,
                testingStartTime:new Date(),
                result:result,
    
    
            },{withCredentials:true});
            
    
            //Update the Well ID from Pool 
    
            await axios.put(`/api/pools/${poolBarcode}`,{
                _id:poolBarcode,
                well_id:wellBarcode,
            })

            window.location.reload();
        }

        else{
            console.log(pool.data)
            if(!pool.data) setPoolError("Error! This pool doesn't exist!")
        }



       


    }


    const submitEdit = async (e) =>{
        e.preventDefault();
        console.log("result "+result+" well id "+selected[0])
        await axios.put(`/api/wells/edit/${selected[0]}`,{
            _id:selected[0],
            pool_id:selected[1],
            testingStartTime:new Date(),
            result:result,
        })


        window.location.reload();
    }



    const handleDelete =  () =>{
        //Delete Well
        axios.delete(`/api/wells/${selected[0]}`);

        //Delete Pool connection to Well
        axios.put(`/api/pools/deleteWell/${selected[1]}`);



        window.location.reload();

    }




    if(!isAuthorized){
        return(
            <div className="justify-content-center">
                <h1>You are not authorized to view this page ! Please <Link to="/labLogin">login as a Lab Employee </Link></h1>
            </div>
        ) 
    }


    return(
        <>
            <Container>
                <Row className="row justify-content-center">
                    <h1>Well Testing</h1>
                </Row>
                <div className="form">
                <Form onSubmit = {submitForm}>
                    <Row>
                        <FormGroup>
                            <Label>Well Barcode:</Label>
                            <Input type="text" value={wellBarcode}
                                    onChange={(e) => setWellBarcode(e.target.value)} />
                        </FormGroup>
                    </Row>

                    {wellError != null && <div className="text-center"><p>{wellError}</p></div> }

                    <Row>
                        <FormGroup>
                            <Label>Pool Barcode:</Label>
                            <Input type="text" value={poolBarcode}
                                    onChange={(e) => setPoolBarcode(e.target.value)} />
                        </FormGroup>
                    </Row>


                    {poolError != null && <div className="text-center"><p>{poolError}</p></div> }


                    <Row>
                        <FormGroup>
                            <Label>Results:</Label>
                            <select onChange={(e) => setResult(e.target.value)}>
                                <option value="inprogress">in progress</option>
                                <option value="positive">positive</option>
                                <option value="negative">negative</option>
                            </select>
                        </FormGroup>
                    </Row>


                    

                    <Row className="row justify-content-center">
                        <Button>Add</Button>  
                    </Row>
                </Form>
                </div>


               <Table>
                    <thead>
                        <tr>

                            <th>Well barcode</th>
                            <th>Pool barcode</th>
                            <th>Result</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((element) => 

                            <>
                                <tr key={element._id}>
                                    <td><Input type="radio" id={element._id} onChange={(e)=> setSelected([e.target.id,e.target.getAttribute('poolBarcode')])} name="radioButton"  poolbarcode={element.pool_id}    />{element._id}</td>
                                    <td>{element.pool_id}</td>
                                    <td>{element.result}</td>
                                </tr>
                            </>
                        )}
                    </tbody>

                </Table>
                
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit Result</ModalHeader>
                    <ModalBody>
                            <Form onSubmit = {submitEdit}>
                            <Row>
                                <FormGroup>
                                    <Label>Well Barcode:</Label>
                                    <Input type="text" readOnly value={selected[0]} />
                                </FormGroup>
                            </Row>

                            <Row>
                                <FormGroup>
                                    <Label>Pool Barcode:</Label>
                                    <Input type="text" readOnly value={selected[1]}/>
                                </FormGroup>
                            </Row>


                            <Row>
                                <FormGroup>
                                    <Label>Results:</Label>
                                    <select onChange={(e) => setResult(e.target.value)}>
                                        <option value="inprogress">in progress</option>
                                        <option value="positive">positive</option>
                                        <option value="negative">negative</option>
                                    </select>
                                </FormGroup>
                            </Row>

                        </Form>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={submitEdit}>Submit change</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                


                <div className="row justify-content-center" >
                    <Button variant="primary" onClick={toggle}>
                        Edit
                    </Button>
                



                    <Button onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
                    
               




            </Container>
        </>
    )
}

export default WellTesting
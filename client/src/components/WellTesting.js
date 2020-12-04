import React ,{useState,useEffect} from 'react';
import axios from 'axios'
import { Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Form, FormGroup, Label, Input, Button} from 'reactstrap';
const WellTesting = () =>{

    const [poolBarcode,setPoolBarcode] = useState("");
    const [wellBarcode,setWellBarcode] = useState("");
    const [selected,setSelected] = useState([]);
    const [data,setData] = useState([]);
    const[result,setResult] = useState("inprogress");


    useEffect(()=>{
        getData()
    },[])



    const getData = async () =>{
        let results = await axios.get("/api/wells")
        console.log(results)

        if(results.data) setData(results.data)


    }




    const submitForm = async (e) =>{
        e.preventDefault()
        let response = await axios.post("/api/wells",{
            _id:wellBarcode,
            pool_id:poolBarcode,
            testingStartTime:new Date(),
            result:result,


        },{withCredentials:true});
        
        window.location.reload();

    }



    const handleEdit = () =>{
        console.log(selected)
        setWellBarcode(selected[0])
        setPoolBarcode(selected[1])

        
    }

    const handleDelete =  () =>{
        axios.delete(`/api/wells/${selected[0]}`);
        window.location.reload();

    }








    return(
        <>
            <Container>
                <Row className="row justify-content-center">
                    <h1>Well Testing</h1>
                </Row>
                <Form onSubmit = {submitForm}>
                    <Row>
                        <FormGroup>
                            <Label>Well Barcode:</Label>
                            <Input type="text" value={wellBarcode}
                                    onChange={(e) => setWellBarcode(e.target.value)} />
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Label>Pool Barcode:</Label>
                            <Input type="text" value={poolBarcode}
                                    onChange={(e) => setPoolBarcode(e.target.value)} />
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


                    

                    <Row>
                        <Button>Add</Button>  
                    </Row>
                </Form>


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
                                <tr>
                                    <td><Input type="radio" id={element._id} onChange={(e)=> setSelected([e.target.id,e.target.getAttribute('poolBarcode')])} name="radioButton"  poolbarcode={element.pool_id}    />{element._id}</td>
                                    <td>{element.pool_id}</td>
                                    <td>{element.result}</td>
                                </tr>
                            </>
                        )}
                    </tbody>

                </Table>

                


                <div className="text-center">
                    <Button onClick={handleEdit}>
                        Edit
                    </Button>
                </div>


                <div className="text-center">
                    <Button onClick={handleDelete}>
                        Delete
                    </Button>
                </div>




            </Container>
        </>
    )
}

export default WellTesting
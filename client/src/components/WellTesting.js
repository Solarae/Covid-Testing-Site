import React ,{useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Form, FormGroup, Label, Input, Button} from 'reactstrap';
const WellTesting = () =>{

    const [poolBarcode,setPoolBarcode] = useState("");
    const [wellBarcode,setWellBarcode] = useState("")

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);



    return(
        <>
            <Container>
                <Row className="row justify-content-center">
                    <h1>Well Testing</h1>
                </Row>
                <Form onSubmit = {(e) => this.submitPool(e)}>
                    <Row>
                        <FormGroup>
                            <Label>Well Barcode:</Label>
                            <Input type="text" value = {wellBarcode} 
                                    onChange={(e) => setWellBarcode({ poolBarcode: e.target.value })} />
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Label>Pool Barcode:</Label>
                            <Input type="text" value = {poolBarcode} 
                                    onChange={(e) => setPoolBarcode({ poolBarcode: e.target.value })} />
                        </FormGroup>
                    </Row>


                    <Row>
                        <FormGroup>
                            <Label>Pool Barcode:</Label>
                            <Input type="text" value = {poolBarcode} 
                                    onChange={(e) => setPoolBarcode({ poolBarcode: e.target.value })} />
                        </FormGroup>
                    </Row>


                    <Row>
                        <FormGroup>
                            <Label>Results:</Label>
                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret>
                                    Dropdown
                                    </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem>Some Action</DropdownItem>
                                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Foo Action</DropdownItem>
                                    <DropdownItem>Bar Action</DropdownItem>
                                    <DropdownItem>Quo Action</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Row>


                    

                    <Row>
                        <Button>Add</Button>  
                    </Row>
                </Form>
                <div>
                </div>
                <div className="text-center">
                    <Button >
                        Delete
                    </Button>
                </div>    
            </Container>
        </>
    )
}

export default WellTesting
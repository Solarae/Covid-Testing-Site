import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class TestCollection extends Component {
    state = {
        employeeID: "",
        testBarcode: "",
        isLoading: false,
        tests: [],
        selectedTest: null,
        deleteTestError: null
    }

    componentDidMount() {
        this.getTests();
     }
 
    getTests = () => {
         axios.get('/api/tests').then(res =>
             {
                 this.setState( {
                     isLoading: false,
                     tests: res.data
                 } )
             })
    }
 
    addTest = () => {
         const newTest = {
            testBarcode: this.state.testBarcode,
            employeeID: this.state.employeeID,
            collectionTime: Date.now()
         }
         axios.post('/api/tests', newTest).then(res =>
            {
                if (res.status !== "404") {
                    this.setState( {
                        tests: [...this.state.tests, res.data]
                    } )
                } 
            })
        }
 
    deleteTest = (id) => {
        if (this.state.selectedTest.pools.length === 0) {
            axios.delete(`/api/tests/${id}`).then(res =>
                {
                    this.setState( {tests: this.state.tests.filter(test => test._id !== this.state.selectedTest._id)})
                })
            } else {
                this.setState ({deleteTestError: "Cannot delete a Test that is assigned to a Pool"})
            }
        }

    
    deleteClick = () => {
        if (this.state.selectedTest != null) {
            this.deleteTest(this.state.selectedTest._id)
        }
    }


    changeRadio = (test) => {
        this.setState( { selectedTest: test} )
    }

    handleCheckClick = (id, e) => {
        if (e.target.checked) {
            this.setState( {
                toDelete: [id, ...this.state.toDelete]
            } )
        } else {
            this.setState( {
                toDelete: this.state.toDelete.splice(this.state.toDelete.indexOf(id), 1)
            } )
        }
    }

    renderTableHeader() {
        const header = ["Employee ID", "Test Barcode"]
        return header.map((hd) => {
            return <th key={`Header ${hd}`}>{hd}</th>
        })
    }

    renderTableData() {
        return this.state.tests.map((test) => {
           return (
              <tr key={test._id}>
                <td>
                    <FormGroup check>
                        <Label check>
                        <Input type="radio" checked={this.state.selectedTest !== null && this.state.selectedTest._id === test._id} 
                                        onChange= {() => this.changeRadio(test)}/>{' '}
                        {test.employeeID}
                        </Label>
                    </FormGroup>
                </td>
                 <td>{test._id}</td>
              </tr>
           )
        })
     }

    render() {
        if (this.state.isLoading) {
            return <div className="d-flex justify-content-center">
                        <strong>Loading...</strong>
                        <Spinner color="danger"/>
                    </div>
        }
        return (
            <Container>
                <Row className="row justify-content-center">
                    <h1>Test Collection</h1>
                </Row>
                <Form onSubmit = {this.addTest}>
                    <Row>
                        <FormGroup>
                            <Label>Employee ID:</Label>
                            <Input type="text" value = {this.state.employeeID} 
                                    onChange={(e) => this.setState({ employeeID: e.target.value })} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label>Test Barcode:</Label>
                            <Input type="text" value = {this.state.testBarcode} 
                                onChange={(e) => this.setState({ testBarcode: e.target.value })} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <Button>Add</Button>  
                    </Row>
                </Form>
                <div>
                    <Table bordered className="text-center">
                        <thead><tr>{this.renderTableHeader()}</tr></thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </Table>
                </div>
                <div className="text-center">
                    <Button onClick={this.deleteClick}>
                        Delete
                    </Button>
                </div>
                {this.state.deleteTestError != null && <div className="text-center"><p>{this.state.deleteTestError}</p></div> }
            </Container>
        )
    }
}

export default TestCollection;
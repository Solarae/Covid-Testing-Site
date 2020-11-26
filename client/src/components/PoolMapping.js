import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class PoolMapping extends Component {
    state = {
        pools: [],
        isLoading: false,
        toDelete: []
    }

    componentDidMount() {
        this.getTests();
     }
 
     getPools = () => {
         axios.get('/api/poolMaps').then(res =>
             {
                 this.setState( {
                     isLoading: false,
                     pools: res.data
                 } )
             })
     }
 
     addTest = () => {
         const newTest = {
            testBarcode: this.state.testBarcode,
            employeeID: this.state.employeeID,
            collectionTime: Date.now(),
            collectedBy: "Singwa"
         }
         axios.post('/api/employeeTests', newTest).then(res =>
             {
                 if (res.status !== "404") {
                    this.setState( {
                        tests: [res.data, ...this.state.tests]
                    } )
                 } 
             })
     }
 
     deleteTest = (id, newTests) => {
         axios.delete(`/api/employeeTests/${id}`).then(res =>
             {
                 if (res.status === "404")
                    newTests =   [id, ...newTests]
             })
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

    deleteClick = () => {
        var newTests = this.state.tests;
        this.state.toDelete.forEach(id => {
            newTests = newTests.filter(test => test._id !== id)
            this.deleteTest(id, newTests)
        })
        this.setState( {
            toDelete: [],
            tests: newTests
        } )
    }

    renderTableHeader() {
        const header = ["Checkbox", "Pool Barcode", "Test Barcode"]
        return header.map((hd) => {
            return <th key={`Header ${hd}`}>{hd}</th>
        })
    }

    renderTableData() {
        return this.state.tests.map(({_id, employeeID, testBarcode}, index) => {
           return (
              <tr key={_id}>
                <td>
                    <FormGroup check>
                        <Input type="checkbox" onChange={this.handleCheckClick.bind(this,_id)}/>
                    </FormGroup>
                 </td>
                 <td>{employeeID}</td>
                 <td>{testBarcode}</td>
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
                    <h1>PoolMapping</h1>
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
            </Container>
        )
    }
}

export default PoolMapping;
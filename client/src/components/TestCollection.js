import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class TestCollection extends React.Component {
    state = {
        employeeID: "",
        testBarcode: "",
        tests: [{_id: 1, employeeID: "Ronnie", testBarcode: "123"},
        {_id: 2, employeeID: "Singwa", testBarcode: "456"}],
        isLoading: false,
        toDelete: []
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
        this.state.toDelete.forEach(del => {
            this.setState( {
                tests: this.state.tests.filter(test => test._id !== del)
            } )
        })
    }

    renderTableHeader() {
        const header = ["Checkbox", "Employee ID", "Test Barcode"]
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
                        <Input type="checkbox" defaultChecked = "false" onChange={this.handleCheckClick.bind(this,_id)}/>
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
                    <h1>Test Collection</h1>
                </Row>
                <Form onSubmit = {this.addNewTest()}>
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
                        <Button>Find</Button>  
                    </Row>
                </Form>
                <div>
                    <Table bordered className="text-center">
                        <thead><tr>{this.renderTableHeader()}</tr></thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </Table>
                </div>
                <div className="text-center">
                    <Button onClick={this.deleteClick()}>
                        Delete
                    </Button>
                </div>
            </Container>
        )
    }
}

export default TestCollection;
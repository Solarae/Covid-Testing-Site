import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, ListGroup, ListGroupItem, Form, FormGroup, Input, Button } from 'reactstrap';

class TestCollection extends React.Component {
    state = {
        employeeID: "",
        testBarcode = "",
        tests: [],
        isLoading: true
    }

    componentDidMount() {
        getTests();
    }

    getTests = () => {
        axios.get('/api/employeeTests').then(res =>
            {
                this.setState( {
                    isLoading: false,
                    tests: res.data
                } )
            })
    }

    addNewTest = newTest => {
        axios.post('/api/employeeTests', newTest).then(res =>
            {
                this.setState( {
                    tests: [res.data, ...this.state.tests]
                } )
            })
    }

    deleteNewTest = id => {
        axios.delete(`/api/employeeTests/${id}`).then(res =>
            {
                this.setState( {
                    tests: this.state.tests.filter(test => test._id !== res.data)
                } )
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
                <Form onSubmit = {addNewTest}>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Label>Employee ID:</Label>
                            </Col>
                            <Col>
                                <Input type="text" value = {this.state.employeeID} 
                                    onChange={(e) => this.setState({ employeeID: e.target.value })} />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Label>Test Barcode:</Label>
                            </Col>
                            <Col>
                                <Input type="text" value = {this.state.testBarcode} 
                                    onChange={(e) => this.setState({ testBarcode: e.target.value })} />
                            </Col>
                        </FormGroup>
                    </Row>
                </Form>
            </Container>
        )
    }
}
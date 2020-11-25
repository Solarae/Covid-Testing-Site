import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, ListGroup, ListGroupItem, Form, FormGroup, Input, Button } from 'reactstrap';

class TestCollection extends React.Component {
    state = {
        tests: [],
        isLoading: false
    }

    componentDidMount() {
        getTests();
    }

    getTests = () => {
        axios.get('/api/employeeTests').then(res =>
            {
                this.setState( {
                    isLoading: true,
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
}
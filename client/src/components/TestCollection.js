import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, ListGroup, ListGroupItem, Form, FormGroup, Input, Button } from 'reactstrap';

class TestCollection extends React.Component {
    state = {
        tests: [],
        isLoading: true
    }

    componentDidMount() {
        getTests();
    }

    getTests = () => {
        axios.get('/api/')
    }
}
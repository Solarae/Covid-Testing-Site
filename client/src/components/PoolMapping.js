import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, ListGroup, ListGroupItem, Row, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class PoolMapping extends Component {
    state = {
        poolBarcode: "",
        pools: [],
        isLoading: false,
        selectedPool: null,
        testToAdd: ""
    }

    componentDidMount() {
        this.getPools();
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
 
    updatePool = (id) => {
        var newSelectedPool = JSON.parse(JSON.stringify(this.state.selectedPool))
        newSelectedPool[newSelectedPool.indexOf(this.state.selectedPool._id)].testBarcodes =
                this.state.newSelectedPool.testBarcodes
        axios.patch(`/api/poolMaps/${id}`, { data: { testBarcodes: this.state.selectedPool.testBarcodes}})
                .then(res =>
                    { this.setState( { pools: newSelectedPool } )
                })
    }

    deletePool = (id) => {
        axios.delete(`/api/poolMaps/${id}`).then(res =>
            {
                this.setState( {
                    pools: this.state.pools.filter(pool => pool._id !== id)
                } )
            })
     }

    changeRadio = (pool) => {
        this.setState( { selectedPool: pool } )
    }

    deletePoolClick = () => {
        if (this.state.selectedPool !== null)
            this.deletePool(this.state.selectedPool._id)
    }

    toDelete = (testBarcode) => {
        var newSelectedPool = JSON.parse(JSON.stringify(this.state.selectedPool))
        newSelectedPool.testBarcodes.splice(newSelectedPool.testBarcodes.indexOf(testBarcode),1)
        this.setState ( {
            selectedPool: newSelectedPool
        })
    }

    toAdd = (testBarcode) => {
        var newSelectedPool = JSON.parse(JSON.stringify(this.state.selectedPool))
        newSelectedPool.testBarcodes = [...newSelectedPool.testBarcodes, testBarcode]
        this.setState ( {
            selectedPool: newSelectedPool
        })
    }

    renderTableHeader() {
        const header = ["Pool Barcode", "Test Barcode"]
        return header.map((hd) => {
            return <th key={`Header ${hd}`}>{hd}</th>
        })
    }

    renderTableData() {
        return this.state.pools.map((pool) => {
           return (
              <tr key={pool._id}>
                  <td>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" checked={this.state.selectedPool !== null && this.state.selectedPool._id === pool._id} 
                                        onChange= {() => this.changeRadio(pool)}/>{' '}
                            {pool.poolBarcode}
                        </Label>
                    </FormGroup>
                  </td>
                  <td>{pool.testBarcodes.join(', ')}</td>
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
                <Form onSubmit = {() => this.updatePool(this.state.selectedPool._id)}>
                    <Row>
                        <FormGroup>
                            <Label>Pool Barcode:</Label>
                            <Input type="text" value = {this.state.poolBarcode} 
                                    onChange={(e) => this.setState({ poolBarcode: e.target.value })} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <Label>Test Barcodes:</Label>
                    </Row>
                    <Row>
                    <ListGroup>
                            {this.state.selectedPool !== null ? this.state.selectedPool.testBarcodes.map((testBarcode, index) => (
                        <ListGroupItem key={index}>
                            {testBarcode}
                            <Button className="remove-btn" color="danger" size="sm" 
                                    onClick = {() => this.toDelete(testBarcode)}>&times;</Button>                          
                        </ListGroupItem>
                    )) : <ListGroupItem key= {null}>Empty</ListGroupItem>}
                    </ListGroup>
                    </Row>
                    <Row>
                    <FormGroup>
                        <Label>Test to Add:</Label>
                            <Input type="text" value = {this.state.testToAdd} 
                                    onChange={(e) => this.setState({ testToAdd: e.target.value })} />
                        <Button onClick = {() => this.toAdd(this.state.testToAdd)}>Add Row</Button>
                    </FormGroup>
                    </Row>
                    <Row>
                        <Button>Submit Pool</Button>  
                    </Row>
                </Form>
                <div>
                    <Table bordered className="text-center">
                        <thead><tr>{this.renderTableHeader()}</tr></thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </Table>
                </div>
                <div className="text-center">
                    <Button onClick={this.deletePoolClick}>
                        Delete
                    </Button>
                </div>    
            </Container>
        )
    }
}

export default PoolMapping;
import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, ListGroup, ListGroupItem, Row, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class PoolMapping extends Component {
    state = {
        poolBarcode: "",
        pools: [],
        isLoading: false,
        selectedPool: null,
        testToAdd: "",
        poolTestBarcodes: []
    }

    componentDidMount() {
        this.getPools();
     }
 
    getPools = () => {
         axios.get('/api/pools').then(res =>
             {
                 this.setState( {
                     isLoading: false,
                     pools: res.data
                 } )
             })
     }
 
    submitPool = (e) => {
        e.preventDefault()
        if (this.state.pools.find(pool => pool.poolBarcode === this.state.poolBarcode) !== undefined) {
            this.updatePool()
        } else {
            this.addPool()
        }
    }

    updatePool = () => {
        var newPools = JSON.parse(JSON.stringify(this.state.pools))
        newPools.find((pool) => pool._id === this.state.selectedPool._id)
                .testBarcodes = this.state.poolTestBarcodes
        axios.patch(`/api/poolMaps/${this.state.selectedPool._id}`, 
                { testBarcodes: this.state.poolTestBarcodes } )
                    .then(res => { 
                        this.setState( { pools: newPools } )
                    })
    }

    addPool = () => {
        const newPool = {
            poolBarcode: this.state.poolBarcode,
            testBarcodes: this.state.poolTestBarcodes
         }
        axios.post('/api/poolMaps/', newPool).then(res =>
            {
                this.setState( {
                    pools: [...this.state.pools, res.data]
                } )
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
        this.setState( { selectedPool: pool, poolBarcode: pool.poolBarcode, 
            poolTestBarcodes: pool.testBarcodes } )
    }

    deletePoolClick = () => {
        if (this.state.selectedPool !== null)
            this.deletePool(this.state.selectedPool._id)
    }

    toDelete = (testBarcode) => {
        var newPoolTestBarcodes = [...this.state.poolTestBarcodes]
        newPoolTestBarcodes.splice(newPoolTestBarcodes.indexOf(testBarcode),1)
        this.setState ( {
            poolTestBarcodes: newPoolTestBarcodes
        })
    }

    toAdd = (testBarcode) => {
        var newPoolTestBarcodes = [...this.state.poolTestBarcodes]
        newPoolTestBarcodes = [...newPoolTestBarcodes, testBarcode]
        this.setState ( {
            poolTestBarcodes: newPoolTestBarcodes
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
                <Form onSubmit = {(e) => this.submitPool(e)}>
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
                            {this.state.poolTestBarcodes.map((testBarcode, index) => (
                        <ListGroupItem key={index}>
                            {testBarcode}
                            <Button className="remove-btn" color="danger" size="sm" 
                                    onClick = {() => this.toDelete(testBarcode)}>&times;</Button>                          
                        </ListGroupItem>
                    ))}
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
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
        poolTestBarcodes: [],
        deleteError: null
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
        if (this.state.selectedPool.well_id !== null) {
            this.setState ({deleteError: "Cannot delete a Pool that is assigned to a Well"})
        } else {
            axios.delete(`/api/pools/${id}`).then(res =>
                {
                    this.setState( {
                        pools: this.state.pools.filter(pool => pool._id !== id)
                    } )
                })
        }
     }

    changeRadio = () => {
        this.setState( { deleteError: null } )
    }

    deletePoolClick = () => {
        if (this.state.selectedPool !== null)
            this.deletePool(this.state.selectedPool._id)
    }

    editPoolClick = (pool) => {
        this.setState( { selectedPool: pool, poolBarcode: pool._id, 
            poolTestBarcodes: pool.testBarcodes} )
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
        const header = ["Pool Barcode", "Test Barcodes"]
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
                            {pool._id}
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
                <Row>
                    <Button>Edit Pool</Button>
                    <Button onClick={this.deletePoolClick}>Delete Pool</Button>
                </Row>
                {this.state.deleteError != null && <div className="text-center"><p>{this.state.deleteError}</p></div> }    
            </Container>
        )
    }
}

export default PoolMapping;
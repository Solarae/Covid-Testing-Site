import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, ListGroup, ListGroupItem, Row, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class PoolMapping extends Component {
    state = {
        poolBarcode: "",
        pools: [],
        isLoading: false,
        selectedPool: null,
        addToPool: [],
        deleteFromPool: [],
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
 
    addTest = () => {
         const newTest = {
            testBarcode: this.state.testBarcode,
            employeeID: this.state.employeeID,
            collectionTime: Date.now(),
            collectedBy: "Singwa"
         }
         axios.post('/api/poolMaps', newTest).then(res =>
             {
                 if (res.status !== "404") {
                    this.setState( {
                        tests: [res.data, ...this.state.tests]
                    } )
                 } 
             })
     }
 
    deleteTest = (id) => {
        var oldPools, newPools = this.state.pools
        const poolIndex = newPools.findIndex(pool => pool._id === this.state.poolBarcode)
        newPools[poolIndex].testBarcodes = newPools[poolIndex].testBarcodes
                                        .splice(newPools[poolIndex].testBarcodes.indexOf(id), 1)
        this.setState( {
            pools: newPools
        } )
        axios.delete(`/api/poolMaps/testBarcode/${id}`).then(res =>
            {
                if (res.status === "404") 
                this.setState( {
                    pools: oldPools
                } )
            })

    }

    deletePool = (id) => {
        var oldPools = this.state.pools
        this.setState( {
            selectedPool: null,
            pools: this.state.pools.filter(pool => pool._id !== id)
        } )
        axios.delete(`/api/poolMaps/pool/${id}`).then(res =>
            {
                if (res.status === "404") 
                this.setState( {
                    pools: oldPools
                } )
            })
     }

    handleCheckClick = (pool, e) => {
        if (e.target.checked) {
            this.setState( {
                selectedPool: pool,
                poolBarcode: pool._id
            } )
        } else {
            this.setState( {
                selectedPool: null,
                poolBarcode: 0
            } )
        }
    }

    deletePoolClick = () => {
        if (this.state.selectedPool !== null)
            this.deletePool(this.state.selectedPool._id)
    }

    toDelete = (id) => {
        var newSelectedPool = this.state.selectedPool
        newSelectedPool.testBarcodes.splice(newSelectedPool.testBarcodes.indexOf(id),1)
        this.setState ( {
            deleteFromPool: [...this.state.deleteFromPool, id],
            selectedPool : newSelectedPool
        })
        console.log(newSelectedPool)
    }

    toAdd = (id) => {
        var newSelectedPool = this.state.selectedPool
        newSelectedPool.testBarcodes = [...newSelectedPool.testBarcodes, id ]
        this.setState ( {
            addToPool: [id, ...this.state.addToPool],
            selectedPool: newSelectedPool
        })
    }

    renderTableHeader() {
        const header = ["Checkbox", "Pool Barcode", "Test Barcode"]
        return header.map((hd) => {
            return <th key={`Header ${hd}`}>{hd}</th>
        })
    }

    renderTableData() {
        return this.state.pools.map((pool, index) => {
           return (
              <tr key={pool._id}>
                <td>
                    <FormGroup check>
                        <Input type="checkbox" onChange={this.handleCheckClick.bind(this, JSON.parse(JSON.stringify(pool)))}/>
                    </FormGroup>
                 </td>
                 <td>{pool._id}</td>
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
                <Form onSubmit = {this.addTest}>
                    <Row>
                        <FormGroup>
                            <Label>Pool Barcode:</Label>
                            <Input type="text" value = {this.state.poolBarcode} 
                                    onChange={(e) => this.setState({ poolBarcode: e.target.value })} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <Label>Test Barcode:</Label>
                    </Row>
                    <Row>
                    <ListGroup>
                            {this.state.selectedPool !== null ? this.state.selectedPool.testBarcodes.map((testBarcode, index) => (
                        <ListGroupItem key={index}>
                            {testBarcode}
                            <Button className="remove-btn" color="danger" size="sm" 
                                    onClick = {this.toDelete.bind(this, testBarcode)}>&times;</Button>                          
                        </ListGroupItem>
                    )) : <ListGroupItem key= {null}>Empty</ListGroupItem>}
                    </ListGroup>
                    </Row>
                    <Row>
                    <FormGroup>
                        <Label>Test to Add:</Label>
                            <Input type="text" value = {this.state.testToAdd} 
                                    onChange={(e) => this.setState({ testToAdd: e.target.value })} />
                        <Button onClick = {this.toAdd.bind(this, this.state.testToAdd)}>Add Row</Button>
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
import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Container, ListGroup, ListGroupItem, Table, Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';

class PoolMapping extends Component {
    state = {
        poolBarcode: "",
        pools: [],
        isLoading: false,
        selectedPool: null,
        testToAdd: "",
        poolTestBarcodes: [],
        editPoolMode: false,
        deletePoolError: null,
        editPoolError: null,
        invalidPoolBarcodeError: null,
        invalidTestBarcodeError: null,
        deletedTestBarcodes: [],
        addedTestBarcodes: []
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
 
    submitPool = () => {
        if (this.state.editPoolMode) {
            this.updatePool()
        } else {
            this.addPool()
        }
    }

    updatePool = () => {
        var newPools = JSON.parse(JSON.stringify(this.state.pools))
        var editedPool = newPools.find((pool) => pool._id === this.state.selectedPool._id)
        editedPool.testBarcodes = this.state.poolTestBarcodes
        editedPool._id = this.state.poolBarcode
        axios.patch(`/api/pools/${this.state.selectedPool._id}`, 
                { _id: this.state.poolBarcode, testBarcodes: this.state.poolTestBarcodes, well_id:
                    this.state.selectedPool.well_id, addedTests : this.state.addedTestBarcodes,
                    deletedTests: this.state.deletedTestBarcodes } )
                    .then(() => {
                        this.setState( { pools: newPools, invalidPoolBarcodeError: null, 
                            deletedTestBarcodes: [], addedTestBarcodes: [], editPoolMode: false,
                            poolBarcode: '', poolTestBarcodes: [], selectedPool: null,
                            testToAdd: ''  } )
                    })
                    .catch((error) => {
                        this.setState( { invalidPoolBarcodeError: error.response.data.message } )
                    })
    }

    addPool = () => {
        const newPool = {
            _id: this.state.poolBarcode,
            testBarcodes: this.state.poolTestBarcodes
         }
        axios.post('/api/pools/', newPool).then(res =>
            {
                this.setState( {
                    pools: [...this.state.pools, res.data], deletedTestBarcodes: [], addedTestBarcodes: [], 
                    poolBarcode: '', poolTestBarcodes: [], testToAdd: '', invalidPoolBarcodeError: null
                } )
            })
            .catch((error) => {
                this.setState( { invalidPoolBarcodeError: error.response.data.message } )
            })
    }

    deletePool = (id) => {
        if (this.state.selectedPool.well_id !== null) {
            this.setState ({deletePoolError: "Cannot delete a Pool that is assigned to a Well"})
        } else {
            axios.delete(`/api/pools/${id}`).then(() =>
                {
                    this.setState( {
                        pools: this.state.pools.filter(pool => pool._id !== id)
                    } )
                })
        }
     }

    changeRadio = (pool) => {
        this.setState( { selectedPool: pool, deletePoolError: null, editPoolError: null } )
    }

    deletePoolClick = () => {
        if (this.state.selectedPool !== null)
            this.deletePool(this.state.selectedPool._id)
    }

    editPoolClick = () => {
        if (this.state.selectedPool.well_id !== null) {
            this.setState ({editPoolError: "Cannot edit a Pool that is assigned to a Well"})
        } else {
            this.setState( { poolBarcode: this.state.selectedPool._id, 
                poolTestBarcodes: this.state.selectedPool.testBarcodes, editPoolMode : true} )
        }
    }

    toDelete = (testBarcode) => {
        var newPoolTestBarcodes = [...this.state.poolTestBarcodes]
        newPoolTestBarcodes.splice(newPoolTestBarcodes.indexOf(testBarcode),1)
        var newAddedTestBarcodes = [...this.state.addedTestBarcodes]
        newAddedTestBarcodes = newAddedTestBarcodes.filter(addTest => addTest !== testBarcode)
        if (this.state.addedTestBarcodes.length === newAddedTestBarcodes.length) {
            this.setState ( {
                poolTestBarcodes: newPoolTestBarcodes,
                deletedTestBarcodes: [...this.state.deletedTestBarcodes, testBarcode]
            })
        } else {
            this.setState ( {
                poolTestBarcodes: newPoolTestBarcodes,
                addedTestBarcodes: newAddedTestBarcodes
            })
        }
    }

    toAdd = (testBarcode) => {
        if (!this.state.poolTestBarcodes.includes(testBarcode)) {
            axios.get(`/api/tests/${testBarcode}`)
            .then((res) => {
                if (res.data !== null) {
                    var newPoolTestBarcodes = [...this.state.poolTestBarcodes]
                    newPoolTestBarcodes = [...newPoolTestBarcodes, testBarcode]
                    this.setState ( {
                        poolTestBarcodes: newPoolTestBarcodes,
                        addedTestBarcodes: [...this.state.addedTestBarcodes, testBarcode],
                        invalidTestBarcodeError: null
                    })     
                } else {
                    this.setState( { invalidTestBarcodeError: 'Test with the given barcode does not exist' } )
                }   
            })
        } else {
            this.setState( { invalidTestBarcodeError: 'Test Barcode already exists in the Pool' } )
        }
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
                <div className="text-center">
                    <h1>Pool Mapping</h1>
                </div>
                <div className="form">
                <Form>
                    <div className="text-left">
                    <FormGroup>
                        <Label>Pool Barcode:</Label>
                        <Input type="text" value = {this.state.poolBarcode} 
                                onChange={(e) => this.setState({ poolBarcode: e.target.value })} />
                        {this.state.invalidPoolBarcodeError != null && <FormText>{this.state.invalidPoolBarcodeError}</FormText>}
                    </FormGroup>
                    <Label>Test Barcodes:</Label>
                    <div className='testBarcodeList'>
                    <ListGroup>
                            {this.state.poolTestBarcodes.map((testBarcode, index) => (
                        <ListGroupItem key={index}>
                            {testBarcode}
                            <Button className="remove-btn" color="danger" size="sm" 
                                    onClick = {() => this.toDelete(testBarcode)}>&times;</Button>                          
                        </ListGroupItem>
                    ))}
                    </ListGroup>
                    </div>
                    <FormGroup>
                        <Label>Test to Add:</Label>
                            <Input type="text" value = {this.state.testToAdd} 
                                    onChange={(e) => this.setState({ testToAdd: e.target.value })} />
                        {this.state.invalidTestBarcodeError != null && <FormText>{this.state.invalidTestBarcodeError}</FormText>}
                    </FormGroup>
                    </div>
                    <div className="text-center">
                        <Button onClick = {() => this.toAdd(this.state.testToAdd)}>Add Row</Button>
                    </div>
                    <div className="text-center">
                    <Button onClick={() => this.submitPool()}>Submit Pool</Button>  
                    </div>
                </Form>
                </div>
                <div>
                    <Table bordered className="text-center">
                        <thead><tr>{this.renderTableHeader()}</tr></thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </Table>
                </div>
                <div className="text-center">
                    <Button onClick={this.editPoolClick}>Edit Pool</Button>
                    <Button onClick={this.deletePoolClick}>Delete Pool</Button>
                </div>
                {this.state.deletePoolError != null && <div className="text-center"><p>{this.state.deletePoolError}</p></div> }
                {this.state.editPoolError != null && <div className="text-center"><p>{this.state.editPoolError}</p></div> }     
            </Container>
        )
    }
}

export default PoolMapping;
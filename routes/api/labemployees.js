const express = require('express')
const router = express.Router()

const LabEmployee = require('../../models/LabEmployee')

//@route    GET api/labemployees
//@desc     Get All LabEmployees In LabEmployee
router.get('/', (req, res) => {
    LabEmployee.find()
        .then(labemployees => res.json(labemployees) )
})

//@route    POST api/labemployees
//@desc     Add an labemployee to LabEmployee
router.post('/', (req, res) => {
    const newLabEmployee = new LabEmployee({
        labID: req.body.labID,
        password: req.body.password
    })
    newLabEmployee.save().then(labemployee => res.json(labemployee))
});

//@route    Delete api/labemployees/id
//@desc     Delete a labemployee from LabEmployee
router.delete('/:id', (req, res) => {
    LabEmployee.findById(req.params.id)
        .then(labemployee => labemployee.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router
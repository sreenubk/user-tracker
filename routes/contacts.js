const express = require('express');
const router = express.Router();


// @router      GET '/app/contacts'
// @desc        fetche contact
// @access      Private
router.get('/', (req,res) =>{
    res.send('Get contact')
})


// @router      POST '/app/contacts'
// @desc        creates a contact
// @access      Private
router.post('/', (req,res) =>{
    res.send('Create contacts')
})

// @route      PUT '/app/contacts:id'
// @desc        updates a contact
// @access      Private
router.put('/', (req,res) =>{
    res.send('Updaes a contact')
})

// @route      POST '/app/contacts:id'
// @desc        deletes a contact
// @access      Private
router.delete('/', (req,res) =>{
    res.send('Deltes a contacts')
})

module.exports = router;
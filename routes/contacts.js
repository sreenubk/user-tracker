const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const {check, validationResult} = require('express-validator');


// @router      GET '/app/contacts'
// @desc        fetche contact
// @access      Private
router.get('/', async (req,res) =>{
    try {
        const contacts =  await Contact.find();
        res.send(contacts)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg:err.message});
    }
})

// @router      GET '/app/contacts/:id'
// @desc        fetche contact
// @access      Private
router.get('/:id', async (req,res) =>{
    try {
        const contact =  await Contact.findById(req.params.id);
        res.send(contact)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg:err.message});
    }
})


// @router      POST '/app/contacts'
// @desc        creates a contact
// @access      Private
router.post('/', [
    check('name', 'name is a required field')
    .not()
    .isEmpty(),
    check('email', 'check the value entered is email').isEmail(),
    check('phone', 'Phone should have 12 characters including dashes')
    .isLength({min:12})
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // const rs = db.getDb().execute('select * from booksearch.books');
    // client.connect();
    // const rs = client.execute('select * from booksearch.books');
    const {name, email, phone, type} = req.body;
    try {
        let contact =  await Contact.findOne({email});
        if(contact){
            res.status(400).json({msg:'Contact already exists'});
        }
        contact = new Contact({
            name,
            email,
            phone,
            type
        });
        console.log(contact);
        await contact.save();
        res.send(contact)
    } catch (err) {
        console.error(err.message);
    }
});

// @route      PUT '/app/contacts:id'
// @desc        updates a contact
// @access      Private
router.put('/:id', (req,res) =>{
    res.send('Updaes a contact')
})

// @route      POST '/app/contacts:id'
// @desc        deletes a contact
// @access      Private
router.delete('/:id', async(req,res) =>{

    try {

        const contact =  await Contact.findByIdAndDelete(req.params.id);
        res.send(contact)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg:err.message});

        
    }
    
    
})

module.exports = router;
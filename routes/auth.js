const express = require('express');
const router = express.Router();


// @router      GET '/app/auth'
// @desc        fetches auth
// @access      Private
router.get('/', (req,res) =>{
    res.send('User get')
})


// @router      POST '/app/auth'
// @desc        Authenticate 
// @access      Public
router.post('/', (req,res) =>{
    res.send('Authenticate user')
})

module.exports = router;
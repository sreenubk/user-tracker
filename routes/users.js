const express = require('express');
const router = express.Router();


// @router      GET '/app/users'
// @desc        fetches users
// @access      Private
router.get('/', (req,res) =>{
    res.send('Get User')
});


// @router      POST '/app/users'
// @desc        creates user
// @access      Private
router.post('/', (req,res) =>{
    res.send('Create user')
});

module.exports = router;
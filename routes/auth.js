const express = require('express');
const router = express.Router();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult} = require('express-validator');
const  User = require('../models/User');
const { json } = require('express');
const auth = require('../middleware/auth');


// @router      GET '/app/auth'
// @desc        fetches auth
// @access      Private
router.get('/', auth, async (req,res) =>{

    try {
        const user =  await User.findById(req.user.id).select('-pssword');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'Internal Server Error'})
    }
})


// @router      POST '/app/auth'
// @desc        Authenticate 
// @access      Public
router.post('/',async (req,res) =>{

    const{email, password} = req.body;
    try {

        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({msg:"Invalid credentials"});
        }
        const isMatch =  await bycrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg:"Invalid credentials"});
        }

        const payload = {
            user : {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtsecret'),{
            expiresIn:3600000
        },(err,token) =>{
            if(err) throw err;
            res.json({token});
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;
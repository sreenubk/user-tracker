const express = require('express');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config')
const {check, validationResult} = require('express-validator');
const  User = require('../models/User');
// const {Client} = require('cassandra-driver');
// const client = new Client({
//     cloud: { secureConnectBundle: '/Users/srinivasabokka/workspace/javascript/travesery-course/user-tracker/db/secure-connect-books.zip' },
//     credentials: { username: 'YbQoyGcKotdHxDzYTjbQkZMC', password: 'ZaDM.DH6bgPF2sPyMclZTKPRRHp7TSc.' }
//   });
// const db = require('../db/cassandra');
// const e = require('express');

// @route      GET '/app/users'
// @desc        fetches users
// @access      Private
router.get('/', (rer,res)=>{
    res.send('Under construction');
});


// @route      POST '/app/users'
// @desc        creates user
// @access      Private
router.post('/', [
    check('name', 'name is a required field')
    .not()
    .isEmpty(),
    check('email', 'check the value entered is email').isEmail(),
    check('password', 'Password shoule have 6 or more characters')
    .isLength({min:6})
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // const rs = db.getDb().execute('select * from booksearch.books');
    // client.connect();
    // const rs = client.execute('select * from booksearch.books');
    const {name, email, password} = req.body;
    try {
        let user =  await User.findOne({emial:email});
        if(user){
            res.status(400).json({msg:'User already exists'});
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password,salt);
        console.log(user);
        await user.save();
        // Here we genere the token and send it to user
        const payload ={
            user : {
                id : user.id
            }
        }
        jwt.sign(payload, config.get('jwtsecret'),{
            expiresIn:3600000,
        }, (err, token) =>{
            if(err) throw err;
            res.json({token})
        });
        // res.send('User saved')
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = router;
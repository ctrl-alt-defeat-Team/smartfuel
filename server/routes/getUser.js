const express = require('express');
var router = express.Router();
var verifyToken = require('./verifyToken');
var getUser = require('../functions/getUser');

router.get('/', async (req, res) => {
    try{
        const user = await getUser(req,res);
        user.password = undefined;
        res.json(user);
    }
    catch(error){
        console.log('Error:', error);
        res.status(500).send('Error getting user');
    }
});

module.exports = router;

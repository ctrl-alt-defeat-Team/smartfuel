const express = require('express');
var router = express.Router();
var verifyToken = require('./verifyToken');
var getUser = require('../functions/getUser');

router.get('/', async (req, res) => {
    console.log('get user');
    const user = await getUser(req,res);
    console.log("user");
    user.password = undefined;
    console.log(user);
    res.json(user);
});

module.exports = router;

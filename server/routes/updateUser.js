var express = require("express");
var router = express.Router();
const verifyToken = require('../functions/verifyToken');
const getUser = require('../functions/getUser');
 
router.get('/', verifyToken ,async(req, res) => {
    console.log('update user');
    const user = await getUser(req,res);
    console.log(user);    
});
  

module.exports = router;

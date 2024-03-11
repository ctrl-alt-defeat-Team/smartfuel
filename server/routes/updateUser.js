var express = require("express");
var router = express.Router();
var User = require('../models/user');
const verifyToken = require('../functions/verifyToken');
const getUser = require('../functions/getUser');
var multer = require('multer');
var upload = multer(); 

router.post('/', verifyToken, upload.none() ,async(req, res) => {
   try{
    console.log('update user');
    console.log(req.body);
    const user = await getUser(req,res);
    console.log(user);    
    //user.username = req.body.username || user.username;
 //   user.family = req.body.family || user.family;
    console.log(req.body);
    user.intolerance = req.body.selectedAllergens ;
    user.vegan = req.body.vegan;
    const updatedUser = await user.save();
    console.log('User updated:', updatedUser);

   }catch(error){
    console.log('Error:', error);
    res.status(500).send('Error updating user');}
});
  

module.exports = router;

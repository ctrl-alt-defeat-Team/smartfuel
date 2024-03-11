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
      const user = await getUser(req,res);
      console.log(user);    
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      //user.family = req.body.family || user.family;
      user.intolerance = req.body.selectedAllergens ;
      if(req.vegan == 'true'){
         user.vegan = true;
      }
      else user.vegan = false;
      user.isCompleted = req.body.isCompleted;
      const updatedUser = await user.save();
      console.log('User updated:', updatedUser);
      res.json("ok");

   }catch(error){
    console.log('Error:', error);
    res.status(500).send('Error updating user');}
});
  

module.exports = router;

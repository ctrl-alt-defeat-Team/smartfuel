var express = require("express");
var router = express.Router();
const verifyToken = require('../functions/verifyToken');

router.get('/',verifyToken, (req, res) => {
    //console.log('searching product');
    //console.log(req.params.productQR);
    res.json({ message: 'Token is valid' , valid: true});
});

module.exports = router;

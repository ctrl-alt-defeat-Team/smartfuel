const express = require('express');
var router = express.Router();
const verifyToken = require("../functions/verifyToken");
var Like = require('../models/likes');
var getUser = require('../functions/getUser');

router.post('/', async (req, res) => {
    try {
        const user = await getUser(req);
        console.log(req.body.barcode)
        const like = await Like.findOne({ barcode: req.body.barcode });
        console.log('like:', like);
        if(like == null){
            res.json({likes:0, liked:0});
        }
        else {
            if(user == null){
                res.json({likes:like.userIDs.length, liked:0});
            }
            else {
                res.json({likes:like.userIDs.length, liked:like.userIDs.includes(user._id)});
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

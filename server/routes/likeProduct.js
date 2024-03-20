const express = require('express');
var router = express.Router();
const verifyToken = require("../functions/verifyToken");
var Like = require('../models/likes');
var getUser = require('../functions/getUser');

router.post('/', verifyToken, async (req, res) => {
    try {
        const user = await getUser(req);
        console.log(req.body.barcode)
        const like = await Like.findOne({ barcode: req.body.barcode });
        console.log('like:', like);
        if(like == null){
            const newLike = new Like({
                barcode: req.body.barcode,
                userIDs: [user._id]
            });
            console.log('newLike:', newLike);
            await newLike.save();
            res.json({ message: 'Like added successfully' });
        }
        else {
            if(like.userIDs.includes(user._id)){
                like.userIDs.pull(user._id);
                await like.save();
                res.json({ message: 'Like removed successfully' });
            }
            else {
                like.userIDs.push(user._id);
                await like.save();
                res.json({ message: 'Like added successfully' });
            }
        }
        console.log('like:', like);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const username = await jwt.decode(token);
    const user = await User.findOne({ username: username.username});
    return user;
};



module.exports = getUser;

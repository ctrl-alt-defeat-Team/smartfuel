const jwt = require('jsonwebtoken');

const getUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const user = await jwt.decode(token);
    return user;
};

module.exports = getUser;

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET
    if (!token ) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const verifyToken = jwt.verify(token, secret)
        const user = await userModel.findById(verifyToken.id).select('-password')
        if(!user ||!verifyToken){
            return res.json({messaage: 'Token Invalid'})

        }
        req.user = user;
        next();
    } catch (error) {
       console.log(error)
    }
    return res.status(4001).json({message: ' unauthorized'})
    
}

module.exports = authMiddleware
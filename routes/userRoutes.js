const {Router} = require('express')
const {registerUser, userLogin, logoutUser } = require('../controller/userController')
const Jwtconfig = require('../config/jwtConfig')

const userModel = require ('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole')

const router = Router()
router.post('/signup', registerUser);
router.post('/login',userLogin )
router.post('/logout', logoutUser)


//router.put('/:userId', authMiddleware, profileUpdate);
//router.get('/:userId', getUser)

module.exports = router
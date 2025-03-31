const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');


// Register user
const registerUser = async (req, res) => {
    
        const {username, gmail, password } =req.body; 
        if(! username  || !gmail || !password ){
            return res.json({message: 'Enter all input fields to continue'}).status(404)
        }
        try{
        //Check if user already exists
        const user  = await User.findOne({ gmail})
        if (user) {
            return res.status(400).json({message: 'User already exists'}).status(404)
        }
        //hash the password
        const salt = bcrypt.genSalt(10)
        const hashPassword = bcrypt.hashPassword(password, salt)
        //Create user
        const newUser = new userModel({...req.body, password: hashPassword})

        const userSaved = await newUser.save()

        const{password:_, otheruserDetails} = userSaved.toObject()
        res.json(otheruserDetails).status(200)
}
catch(error) {
    console.log(error)
}
} 
const userLogin = async (req, res)=> {
    const {gmail, password} = req.body
    if(!gmail || !password ) {
        return res.json({message: 'Enter all input fields to continue! '}).status(404)
    } try {
        const user = await userModel.findOne({gmail})

        if(!user){
            return res.status(404).json({mess: 'No existing user found'}) 
        }
        comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const token = tokengenerated({id: user._id})
        const { password:_, ...userData} = user.toObject()
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict'})
        res.json(userData).status(200)
    }
    catch(error){
        console.log(error)
          }
};
//Logout User

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).jsom({message: 'Logout succesful'})
    } catch (error) {
       console.error('Logout error', error)
       res.status(200).json({message: 'Server error during logout'}) 
    }
}
 

module.exports = {registerUser, userLogin, logoutUser}


const mongoose = require('mongoose')
const MongoDBconnect = require('../DB/DBconnect')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('MongoDB conected succesfully!')

    } catch (error) {
        console.error('MongoDB connection failed', error)
        process.exit(1);
    }
}

module.exports = connectDB; 
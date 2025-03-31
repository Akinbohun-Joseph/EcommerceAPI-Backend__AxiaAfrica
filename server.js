const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('./DB/DBconnect')
const authMiddleware = require('./middleware/authMiddleware')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT

//DB connection
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', cartRoutes)

app.get('/', (req, res)=>{
    res.send ('E-commerce API is running!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

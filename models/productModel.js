const mongoose = require('mongoose');
const productModel = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        requiure: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true, 
        min: 0
    },
    description: {
        type: String,
        required: false 
    },
    image: {
        type: String,
        required: false
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    stockQuantity:{
        type: Number,
        min: 0,
        default: 0
    },
},
{timestamps: true}
);

//Enable the searchh functionality
productModel.index({ name: 'text', description: 'text'})

module.exports = mongoose.model('Product', productModel);
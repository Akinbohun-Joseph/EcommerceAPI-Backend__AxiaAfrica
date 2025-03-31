const mongoose = require('mongoose');

//Model for a single order
const orderItemModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
})
//Model for the entire order
const orderModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true,
    },
    items: [orderItemModel], 
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Bank Transfer'], 
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // Order status
        default: 'Pending',
    },
    isPaid: {
        type: Boolean,
        default: false, // Order is not paid by default
    },
    paidAt: {
        type: Date, // Date when order was paid
    },
    isDelivered: {
        type: Boolean,
        default: false, // Order is not delivered by default
    },
    deliveredAt: {
        type: Date, // Date when order was delivered
    },
},
 {
    timestamps: true, 
});


module.exports = mongoose.model('Order', orderModel);
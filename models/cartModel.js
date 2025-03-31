const mongoose = require('mongoose');

const cartItemModel = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be non-negative']
  }
});

const cartModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemModel],
  totalPrice: {
    type: Number, 
    required: true,
    default: 0
  }
},
 {
  timestamps: true
});

// Method to calculate total price
cartModel.methods.calculateTotalPrice = function() {
    this.totalPrice = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    return this.totalPrice;
  };

  module.exports = mongoose.model('Cart', cartModel)

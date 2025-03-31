const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categoryModel);



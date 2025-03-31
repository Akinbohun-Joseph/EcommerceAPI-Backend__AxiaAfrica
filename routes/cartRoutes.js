const express = require('express');
const {
    updateCartItem,
    addToCart,
    getCart,
    clearCart,
    removeCartItem,
} = require('../controller/cartController')

const  authMiddleware  = require('../middleware/authMiddleware')
const authorizeRole = require('../middleware/authorizeRole')

const router = express.Router();


router.post('/', authMiddleware, addToCart) 
router.delete('/', authMiddleware, clearCart)
router.get('/', authMiddleware,authorizeRole('user','admin'), getCart) //Get cart
router.put('/:itemId', authMiddleware, authorizeRole('user'), updateCartItem)// Update cart item
router.delete('/:itemId', authMiddleware, authorizeRole('user'), removeCartItem) 

module.exports = router;
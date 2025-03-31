const express = require('express');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
} = require('../controller/orderController')
const  authMiddleware = require('../middleware/authMiddleware')
const  authorizeRole  = require('../middleware/authorizeRole')

const router = express.Router();

router.post('/order', authMiddleware, createOrder) // Craete order
router.post('/order', authMiddleware, getUserOrders) // Get user's orders
router.get('/orders', authMiddleware, getAllOrders) //Get all order
router.put('/:orderId/status', authMiddleware,updateOrderStatus)// Update order status
router.get('/:orderId', authMiddleware, getOrderById) // Get order by Id

module.exports = router;
const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel')

// Create new order 
const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        // Fetch user's cart with product details
        const cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');

        // Check if cart is empty
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const orderItems = [];

        // Validate stock and prepare order items
        for (const cartItem of cart.items) {
            const product = cartItem.product;

            // Check stock availability
            if (product.stockQuantity < cartItem.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }

            // Reduce product stock
            product.stockQuantity -= cartItem.quantity;
            await product.save();

            // Prepare order item
            orderItems.push({
                product: product._id,
                quantity: cartItem.quantity,
                price: cartItem.price,
            });
        }

        // Create the order
        const order = await orderModel.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice: cart.totalPrice,
        });

        // Clear the cart after order creation
        await cartModel.findOneAndDelete({ user: req.user._id });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        // Find user's orders
        const orders = await orderModel.find({ user: req.user._id })
            .populate('items.product', 'name image') // Populate product details
            .sort({ createdAt: -1 }); // Sort by creation date (newest first)

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Get order by ID
const getOrderById = async (req, res) => {
    try {
        // Find order by ID
        const order = await orderModel.findById(req.params.id)
            .populate('user', 'name email') // Populate user details
            .populate('items.product', 'name image'); // Populate product details

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check authorization
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//    Update order status
const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body; // Get the new status from the request body
  
      // Find the order by its ID
      const order = await orderModel.findById(req.params._id);
  
      // If order not found, return 404
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update the order's status
      order.status = status;
  
      // Update delivery status if the new status is 'Delivered'
      if (status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now(); // Set the delivery timestamp
      }
  
      // Save the updated order
      const updatedOrder = await order.save();
  
      // Send the updated order as a JSON response
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Get all orders
  const getAllOrders = async (req, res) => {
    try {
      const pageSize = 10; // Number of orders per page
      const page = Number(req.query.page) || 1; // Current page number (default: 1)
      const status = req.query.status; // Filter by status
  
      // Build the query object
      let query = {};
  
      // If a status filter is provided, add it to the query
      if (status) {
        query.status = status;
      }
  
      // Count the total number of orders matching the query
      const count = await orderModel.countDocuments(query);
  
      // Find orders matching the query, with pagination and sorting
      const orders = await orderModel.find(query)
        .populate('user', 'name email') // Populate user details
        .populate('items.product', 'name') // Populate product details
        .limit(pageSize) // Limit the number of orders per page
        .skip(pageSize * (page - 1)) // Skip orders from previous pages
        .sort({ createdAt: -1 }); // Sort by creation date (newest first)
  
      // Send the orders and pagination information as a JSON response
      res.json({
        orders,
        page,
        pages: Math.ceil(count / pageSize), // Total number of pages
        totalOrders: count, // Total number of orders
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
module.exports = {createOrder, getAllOrders, getOrderById, getUserOrders, updateOrderStatus}
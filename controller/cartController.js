
const cartModel = require('../models/cartModel');

const productModel = require('../models/productModel');

// Admin role:  Get user cart

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');

        if (!cart) {
            // If no cart exists, create a new empty one
            const newCart = await cartModel.create({
                user: req.user._id,
                items: [],
                totalPrice: 0
            });
        } else {
            // Check if item is already in the cart
            const itemIndex = cart.items.findIndex((items) => item.product.toString() === productId)
            if (itemIndex > -1) {
                //Update quantity if item exists
                cart.items[itemIndex].quantity += quantity;
            } else {
                //Add new item
                cart.items.push({ product: productId, quantity, price: product.price })
            }
            //Recalculate total price
            cart.calculateTotalPrice()
            await cart.save()
        }
        // Return updated cart
        cart = await cartModel.findOne({ user: req.user._id }).populate('items.product')
        res.json(cart).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Admin role:  Add item to cart

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate product
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!product.isAvailable) {
            return res.status(400).json({ message: 'Product is not available' });
        }
        // Check for stock availability
        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        // Find user's cart
        const cart = await cartModel.findOne({ user: req.user._id });
        // Create cart if it doesn't exist
        if (!cart) {

            cart = await cartrModel.create({
                user: req.user._id,
                items: [{
                    product: productId,
                    quantity,
                    price: product.price
                }],
                totalPrice: product.price * quantity
            });
        } else {
            // Check if product already in cart
            const ItemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (ItemIndex > -1) {
                // Update quantity if item exist
                const newQuantity = cart.items[ItemIndex].quantity + quantity;
                //Recheck stock availability after quantity update

                if (product.stockQuantity < newQuantity) {
                    return res.status(400).json({ message: 'Not enough stock available' });
                }

                cart.items[ItemIndex].quantity = newQuantity;
            } else {
                // Add new item
                cart.items.push({ product: productId, quantity, price: product.price });
            }

            // Recalculate total price
            cart.calculateTotalPrice();
            await cart.save();
        }

        // Return updated cart
        cart = await cartModel.findOne({ user: req.user._id })
            .populate('items.product');

        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const itemId = req.params.itemId;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Check stock availability
        const product = await productModel.findById(cart.items[itemIndex].product);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Update item quantity
        cart.items[itemIndex].quantity = quantity;

        // Recalculate total price
        cart.calculateTotalPrice();
        await cart.save();

        // Fetch the updated cart with populated product details
        cart = await Cart.findOne({ user: req.user._id })
            .populate({
                path: 'items.product',
                select: 'name imageUrl price stockQuantity'
            });

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



//  Remove item from cart

const removeCartItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        // Find cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        // Recalculate total price
        cart.calculateTotalPrice();
        await cart.save();

        // Return the updated cart
        cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Clear cart

const clearCart = async (req, res) => {
    try {
        let cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { getCart, updateCartItem, addToCart, removeCartItem, clearCart }


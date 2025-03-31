const express = require('express')
const authMiddleware  = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const router = express.Router();

const {getAllProducts, createProduct, updateProduct, get_A_Product, deleteProduct, createCategory,getCategories, deleteCategory} = require('../controller/productController')

router.get('/:productId', authMiddleware, get_A_Product)
router.post('/product', authMiddleware, createProduct);

  router.get('/categories', getCategories)
  router.post('/category', authMiddleware, authorizeRole('admin', 'user'), createCategory);

  router.put('/:productId', authMiddleware, authorizeRole('admin'), updateProduct)
  router.delete('/:productId', authMiddleware, authorizeRole('admin'), deleteProduct);
  router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteCategory);

module.exports = router;

const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel')

//Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        res.json(products).status(200)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'})
    }
}
//Get a product by ID
const get_A_Product = async (req, res) =>{
    try {
        const product = await productModel.findById(req.params.id);
        if(!product) {
            return res.status(404).json({message: 'Product not found'})
        }res.json(product).status(200)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server error'})
        
    }
}

//Admin roles: Create a product
const createProduct = async (req, res) => {
    try {
        const {name, price,stockQuantity, image, description, isAvailable, category} = req.body
        
    // Verify category exists
    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

        const newProduct = new product({name, price, description, image, isAvailable, stockQuantity, category })
        await newProduct.save()
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(200).json({message: 'Server Error'})
    }
}
//Update a product    
const updateProduct = async(req, res) =>{
    try {
        const {name, description, price, category, image, stockQuantity, isAvailable} = req.body
        const product = await productModel.findById(req.params.id)
        
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // If category is being updated, verify it exists
      if (category && category !== product.category.toString()) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(400).json({ message: 'Invalid category' });
        }
      }
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.category = category || product.category;
      product.imageUrl = image || product.image;
      product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
      product.isAvailable = isAvailable !== undefined ? isAvailable : product.isAvailable;
      
      const updatedProduct = await product.save();
      
      res.json(updatedProduct)
  
    } catch (error) {
        console.error(error)
            res.status(404).json({message: 'Server error'})
        
    }
}
//Delete product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(productId);
      
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  //   Get all categories

  const getCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      res.json(categories).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Create a category
 
  const createCategory = async (req, res) => {
    try {
      const { name, description, image } = req.body;
      
      const categoryExists = await categoryModel.findOne({ name });
      
      if (categoryExists) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      
      const category = await categoryModel.create({
        name,
        description,
        image
      });
      
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  //Delete category

  const deleteCategory = async (req,res)=> {
    try {
        const categoryId = req.params.id
        const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
        if(!deletedCategory){
            return res.status(404).json({message: 'Category not found'})
        }
        res.status(200).json({message: 'Category deleted succesfullyy'})
    } catch(error) {
        res.status(500).json({message: 'Server error'})
    }
  }




module.exports = {updateProduct,getAllProducts,get_A_Product, createProduct, deleteCategory, createCategory, deleteProduct, getCategories }













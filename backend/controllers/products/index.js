const Product = require('../../models/productModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.json(products)
	} catch (error) {
		res.status(500).json({ success: false, message: error.toString() })
	}
}

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (product) {
			res.json(product)
		} else {
			res.status(404).json({ success: false, message: 'Product not found' })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.toString() })
	}
}

module.exports = {
	getProducts,
	getProductById,
}

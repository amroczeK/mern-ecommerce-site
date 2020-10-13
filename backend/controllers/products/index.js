const Product = require('../../models/productModel')

const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.json(products)
	} catch (error) {
		res.status(500).json({ success: false, message: error.toString() })
	}
}

const getProduct = async (req, res) => {
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
	getProduct,
}

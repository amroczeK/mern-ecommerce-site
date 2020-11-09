const Order = require('../../models/orderModel')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
	try {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			subTotal,
		} = req.body

		if (orderItems && !orderItems.length) {
			throw new Error('No order items')
		} else {
			const order = new Order({
				orderItems,
				user: req.user._id,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
				subTotal,
			})
			const createdOrder = await order.save()
			res.status(201).json(createdOrder)
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.toString() })
	}
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderbyId = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			'user',
			'name email'
		)
		if (order) {
			res.json(order)
		} else {
			throw new Error('Order not found')
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.toString() })
	}
}

module.exports = {
	addOrderItems,
	getOrderbyId,
}

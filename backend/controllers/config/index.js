// @desc    Get paypal client id
// @route   GET /api/products
// @access  Public
const getPaypalClientID = async (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID)
}

module.exports = {
	getPaypalClientID,
}

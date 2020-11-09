const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decodedToken.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			res.status(401).json({ success: false, message: error.toString() })
		}
	}
	if (req.cookies && req.cookies.token) {
		try {
			token = req.cookies.token
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decodedToken.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			res.status(401).json({ success: false, message: error.toString() })
		}
	}
	if (!token) {
		res.status(401).json({
			success: false,
			message: 'Unauthorized, no token',
		})
	}
}

module.exports = protect

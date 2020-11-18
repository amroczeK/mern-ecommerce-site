const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { generateToken } = require('../utils/generateToken')

const protect = async (req, res, next) => {
	let token, refreshToken
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]
			const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
			req.user = await User.findById(decodedToken.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			res.status(401).json({ success: false, message: error.toString() })
		}
	}
	if (req.cookies) {
		try {
			if (req.cookies.token) token = req.cookies.token
			if (req.cookies.refreshToken) refreshToken = req.cookies.refreshToken
			else {
				return res.status(401).json({
					success: false,
					message: 'Unauthorized, no token',
				})
			}
			if (token) {
				const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
				req.user = await User.findById(decodedToken.id).select('-password')
				next()
			} else if (refreshToken) {
				const decodedRefreshToken = jwt.verify(
					refreshToken,
					process.env.JWT_REFRESH_TOKEN_SECRET
				)
				console.log('user', decodedRefreshToken)
				req.user = await User.findById(decodedRefreshToken.id).select(
					'-password'
				)
				console.log(req.user)
				if(!req.user) throw new Error("Unauthorized, user doesn't exist")
				let newToken = generateToken(decodedRefreshToken.id)
				res.cookie('token', newToken, {
					maxAge: parseInt(process.env.JWT_TOKEN_EXPIRY), // 5 min
					secure: false, // set to true if your using https
					httpOnly: true,
				})
				next()
			} else {
				throw new Error('Unauthorized, no token or refresh token')
			}
		} catch (error) {
			console.error(error)
			res.status(401).json({ success: false, message: error.toString() })
		}
	}
}

module.exports = protect

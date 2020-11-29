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
			if (!token && !refreshToken) {
				return res.status(401).json({
					success: false,
					message: 'Unauthorized, please login',
				})
			}
			if (token) {
				const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
				req.user = await User.findById(decodedToken.id).select('-password')
				next()
			}
			else {
				throw new Error('Unauthorized, please login')
			}
		} catch (error) {
			// If JsonWebToken is invalid, check refreshToken
			try {
				if (refreshToken) {
					const decodedRefreshToken = jwt.verify(
						refreshToken,
						process.env.JWT_REFRESH_TOKEN_SECRET
					)
					req.user = await User.findById(decodedRefreshToken.id).select(
						'-password'
					)
					if (!req.user) throw new Error("Unauthorized, user doesn't exist")
					let newToken = generateToken(decodedRefreshToken.id)
					res.cookie('token', newToken, {
						maxAge: parseInt(process.env.JWT_TOKEN_EXPIRY), // 5 min
						secure: false, // set to true if your using https
						httpOnly: true,
					})
					next()
				} else {
					throw new Error('Unauthorized, please login')
				}
			} catch (error) {
				console.error(error)
				res.status(401).json({ success: false, message: error.toString() })
			}
		}
	}
}

module.exports = protect

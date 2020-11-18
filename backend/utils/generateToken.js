const jwt = require('jsonwebtoken')

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
		expiresIn: process.env.JWT_TOKEN_EXPIRY, // 5 minutes
	})
}

const generateRefreshToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY, // 24 hours
	})
}

module.exports = { generateToken, generateRefreshToken }

const User = require('../../models/userModel')
const generateToken = require('../../utils/generateToken')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (user && (await user.verifyPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			})
		} else {
			res
				.status(401)
				.json({ success: false, message: 'Invalid email or password' })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.toString() })
	}
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			})
		} else {
			res.status(404).json({ success: false, message: 'User not found' })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.toString() })
	}
}

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
	const { name, email, password } = req.body
	try {
		const userExists = await User.findOne({ email })
		if (userExists) {
			return res
				.status(400)
				.json({ success: false, message: 'User already exists' })
		}
		const user = await User.create({
			name,
			email,
			password,
		})
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			})
		} else {
			res.status(400).json({ success: false, message: 'Invalid user data' })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.toString() })
	}
}

module.exports = {
	authUser,
	registerUser,
	getUserProfile,
}

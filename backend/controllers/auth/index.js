const User = require('../../models/userModel');
const {
  generateToken,
  generateRefreshToken,
} = require('../../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.verifyPassword(password))) {
      let token = generateToken(user._id);
      let refreshToken = generateRefreshToken(user._id);
      res.cookie('access_token', token, {
        maxAge: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY), // 5 min
        secure: false, // set to true if your using https
        httpOnly: true,
        sameSite: 'strict',
      });
      res.cookie('refresh_token', refreshToken, {
        maxAge: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY), // 24 hours
        secure: false, // set to true if your using https
        httpOnly: true,
        sameSite: 'strict',
      });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// @desc    Logout user and clear cookie/token
// @route   GET /api/auth/login
// @access  Private
const logout = async (req, res) => {
  // Clear access and refresh token
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res
    .status(200)
    .json({ success: true, message: 'User logged out successfully' });
};

module.exports = {
  login,
  logout,
};

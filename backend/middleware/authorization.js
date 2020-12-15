const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      let bearer_token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(
        bearer_token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: error.toString() });
    }
  }
  if (req.cookies) {
    let { access_token, refresh_token } = req.cookies;
    try {
      if (!access_token && !refresh_token) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized, please login',
        });
      }
      if (access_token) {
        const decodedToken = jwt.verify(
          access_token,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );
        req.user = await User.findById(decodedToken.id).select('-password');
        next();
      } else {
        throw new Error('Unauthorized, please login');
      }
    } catch (error) {
      // If JsonWebToken is invalid, check refreshToken
      try {
        if (refresh_token) {
          const decodedRefreshToken = jwt.verify(
            refresh_token,
            process.env.JWT_REFRESH_TOKEN_SECRET
          );
          req.user = await User.findById(decodedRefreshToken.id).select(
            '-password'
          );
          if (!req.user) throw new Error("Unauthorized, user doesn't exist");
          let newToken = generateToken(decodedRefreshToken.id);
          res.cookie('token', newToken, {
            maxAge: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY), // 5 min
            secure: false, // set to true if your using https
            httpOnly: true,
            sameSite: 'strict',
          });
          next();
        } else {
          throw new Error('Unauthorized, please login');
        }
      } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: error.toString() });
      }
    }
  }
};

module.exports = protect;

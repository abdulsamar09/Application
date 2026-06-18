const jwt = require('jsonwebtoken');
const db = require('../data/db');

module.exports = async function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'counseling_app_jwt_secret_key_12345');
    const user = await db.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid (user not found)' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

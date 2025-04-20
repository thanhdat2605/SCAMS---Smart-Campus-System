import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export default function auth(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}
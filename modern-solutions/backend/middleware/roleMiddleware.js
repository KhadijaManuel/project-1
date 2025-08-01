const jwt = require('jsonwebtoken');

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }

      req.user = decoded; // Attach user data to request
      next();
    } catch (err) {
      console.error('Token Verification Error:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};

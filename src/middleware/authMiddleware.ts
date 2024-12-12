import jwt from 'jsonwebtoken';

// JWT Secret (same as the one used in login)
const JWT_SECRET = process.env.JWT_SECRET || 'secrettest';

// Authentication middleware
export const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];
  //const token = req.headers.authorization; //set token on direct to headers

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};


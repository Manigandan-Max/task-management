import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../helper/logger';
// JWT Secret (same as the one used in login)
const JWT_SECRET = process.env.JWT_SECRET || 'secrettest';

// Authentication middleware
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1];
  logger.info('Hello again distributed logs');
  
  //const token = req.headers.authorization; //set token on direct to headers
    console.log('res------------->',res)
    // console.log('RES',Response)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {userId : number; email: string };
    req.user = {  userId: decoded.userId, email : decoded.email } // Attach user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};


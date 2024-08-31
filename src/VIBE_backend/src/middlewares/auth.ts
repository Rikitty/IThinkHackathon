import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || "vibe"; // Replace with your secret key or use environment variables

// Middleware to verify the token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey); // Assuming 'Bearer <token>'
    req.user = decoded; // Attach user info to the request object
  } catch (err) {
    return res.status(401).send('Invalid token');
  }

  return next();
};

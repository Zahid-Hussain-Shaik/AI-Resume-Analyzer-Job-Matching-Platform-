import { RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt.js';
export const auth: RequestHandler = (req, res, next) => { try { const header = req.header('authorization'); if (!header?.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'Authentication required' }); const token = verifyToken(header.slice(7)); req.user = { id: token.sub, email: token.email }; next(); } catch { res.status(401).json({ success: false, error: 'Invalid or expired token' }); } };

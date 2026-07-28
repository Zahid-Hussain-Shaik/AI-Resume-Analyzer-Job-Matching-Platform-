import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export function signToken(user: { id: string; email: string }) { return jwt.sign({ email: user.email }, env.JWT_SECRET, { subject: user.id, expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }); }
export function verifyToken(token: string) { return jwt.verify(token, env.JWT_SECRET) as { sub: string; email: string }; }

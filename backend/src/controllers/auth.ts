import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma.js';
import { signToken } from '../utils/jwt.js';
import { loginSchema, registerSchema } from '../validations/schemas.js';
export const register: RequestHandler = async (req, res, next) => { try { const input = registerSchema.parse(req.body); if (await prisma.user.findUnique({ where: { email: input.email } })) return res.status(409).json({ success: false, error: 'Email already registered' }); const user = await prisma.user.create({ data: { name: input.name, email: input.email, passwordHash: await bcrypt.hash(input.password, 12) } }); res.status(201).json({ success: true, data: { token: signToken(user), user: { id: user.id, name: user.name, email: user.email } } }); } catch (e) { next(e); } };
export const login: RequestHandler = async (req, res, next) => { try { const input = loginSchema.parse(req.body); const user = await prisma.user.findUnique({ where: { email: input.email } }); if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) return res.status(401).json({ success: false, error: 'Invalid email or password' }); res.json({ success: true, data: { token: signToken(user), user: { id: user.id, name: user.name, email: user.email } } }); } catch (e) { next(e); } };

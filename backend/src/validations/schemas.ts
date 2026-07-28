import { z } from 'zod';
export const registerSchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().email().transform(v => v.toLowerCase()), password: z.string().min(8).max(128) });
export const loginSchema = z.object({ email: z.string().email().transform(v => v.toLowerCase()), password: z.string().min(1) });
export const analysisSchema = z.object({ resumeId: z.string().min(1), jobDescription: z.string().trim().min(30).max(30000), jobTitle: z.string().trim().max(200).optional() });

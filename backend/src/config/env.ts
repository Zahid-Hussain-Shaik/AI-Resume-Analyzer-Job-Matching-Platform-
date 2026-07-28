import 'dotenv/config';
import { z } from 'zod';
const schema = z.object({ PORT: z.coerce.number().default(5000), DATABASE_URL: z.string().min(1), JWT_SECRET: z.string().min(16), JWT_EXPIRES_IN: z.string().default('7d'), UPLOAD_DIR: z.string().default('uploads'), MAX_FILE_SIZE_MB: z.coerce.number().default(5), OPENAI_API_KEY: z.string().optional(), OPENAI_MODEL: z.string().default('gpt-4o-mini'), CLIENT_ORIGIN: z.string().default('http://localhost:5173') });
export const env = schema.parse(process.env);

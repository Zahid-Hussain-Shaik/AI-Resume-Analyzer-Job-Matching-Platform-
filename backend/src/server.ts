import { app } from './app.js'; import { env } from './config/env.js'; import { prisma } from './utils/prisma.js';
const server = app.listen(env.PORT, () => console.log(`Resume Analyzer API listening on http://localhost:${env.PORT}`));
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, async () => { await prisma.$disconnect(); server.close(() => process.exit(0)); });

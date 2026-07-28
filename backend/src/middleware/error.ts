import { ErrorRequestHandler } from 'express';
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => { console.error(err); const status = err?.statusCode ?? (err?.code === 'LIMIT_FILE_SIZE' ? 413 : 500); res.status(status).json({ success: false, error: status === 500 ? 'Internal server error' : err.message }); };

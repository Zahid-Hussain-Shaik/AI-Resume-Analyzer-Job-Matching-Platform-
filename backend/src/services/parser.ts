import fs from 'node:fs/promises';
import path from 'node:path';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
export async function extractText(filePath: string, mimeType: string) { const buffer = await fs.readFile(filePath); if (mimeType === 'application/pdf') return (await pdf(buffer)).text.trim(); if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return (await mammoth.extractRawText({ buffer })).value.trim(); throw new Error('Only PDF and DOCX files are supported'); }
export async function removeFile(filePath: string) { await fs.rm(path.resolve(filePath), { force: true }); }

declare module 'bcryptjs' {
  export function hash(value: string, rounds: number): Promise<string>;
  export function compare(value: string, hash: string): Promise<boolean>;
}
declare module 'pdf-parse' {
  interface PdfData { text: string }
  function parse(buffer: Buffer): Promise<PdfData>;
  export default parse;
}

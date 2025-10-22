
import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const src = join(__dirname, 'files', 'fileToRead.txt');

  let readableStream = createReadStream(src, 'utf8');
  readableStream.pipe(stdout)
};

await read();

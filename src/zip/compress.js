import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const src = join(__dirname, 'files', 'fileToCompress.txt');
  const archive = join(__dirname, 'files', 'archive.gz');

  const gzip = createGzip();
  const input = createReadStream(src);
  const output = createWriteStream(archive);

  input.pipe(gzip).pipe(output)
};

await compress();

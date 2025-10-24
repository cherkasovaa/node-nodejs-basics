import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const src = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');
  const stream = createReadStream(src);

  stream.on('data', (chunk) => hash.update(chunk));
  stream.on('end', () => {
    console.log(hash.digest('hex'))
  })

  stream.on('error', (err) => {
    console.error(err.message)
  })
};

await calculateHash();

import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const write = async () => {
  const path = join(__dirname, 'files', 'fileToWrite.txt');

  const writeStream = createWriteStream(path);

  stdin.pipe(writeStream);
};

await write();

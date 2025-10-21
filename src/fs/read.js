import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`FS operation failed: ${err}`)
    } else {
      throw err;
    }
  }
  
};

await read();

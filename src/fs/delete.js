
import { unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  try {
    const fileName = join(__dirname, 'files', 'fileToRemove.txt');

    await unlink(fileName);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`FS operation failed: ${err}`)
    } else {
      throw err
    }
  }
};

await remove();

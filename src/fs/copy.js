
import { constants } from 'node:fs';
import { access, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    const filesFolder = join(__dirname, 'files');
    const copyFilesFolder = join(__dirname, 'files_copy');

    await access(filesFolder, constants.F_OK);

    try {
      await access(copyFilesFolder, constants.F_OK);

      throw new Error(`FS operation failed: files_copy exists`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  
    await cp(filesFolder, copyFilesFolder, { recursive: true });
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`FS operation failed: ${err}`)
    } else {
      throw err;
    }
  }
};

await copy();

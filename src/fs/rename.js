import { access, constants, rename as renameAsync } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const wrongFileName = join(__dirname, 'files', 'wrongFilename.txt');
  const correctFileName = join(__dirname, 'files', 'properFilename.md');

  try {
    await access(wrongFileName, constants.F_OK);

    try {
      await access(correctFileName, constants.F_OK)

      throw new Error(`FS operation failed: properFilename.md exist`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await renameAsync(wrongFileName, correctFileName);

  } catch (err) {
      throw new Error(`FS operation failed: ${err}`)
  }
};

await rename();

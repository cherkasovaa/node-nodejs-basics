import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
  
const create = async () => {
  const content = 'I am fresh and young';
  const filePath = join(__dirname, 'files', 'fresh.txt');

  try {
    await writeFile(filePath, content, {
      flag: 'wx'
    });
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error(`FS operation failed: ${err}`)
    } else {
      throw err;
    }
  }
};

await create();

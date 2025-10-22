import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const src = join(__dirname, 'files');
  const result = []

  try {
    const files = await readdir(src, {withFileTypes: true})
    
    for (const file of files) {
      if (file.isFile()) {
        result.push(file.name)
      }
    }
    console.log(result)
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`FS operation failed: ${err}`)
    }

    throw err;
  }
    
};

await list();

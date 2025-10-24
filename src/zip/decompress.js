import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const decompress = async () => {
  const archiveName = 'archive.gz';
  const outputFileName = 'fileToCompress.txt';

  const archivePath = join(__dirname, 'files', archiveName);
  const outputFilePath = join(__dirname, 'files', outputFileName);

  const gunzip = createGunzip();
  const input = createReadStream(archivePath);
  const output = createWriteStream(outputFilePath);

  input.pipe(gunzip).pipe(output)
};

await decompress();

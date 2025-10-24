import { createServer as createServerHttp } from 'node:http';
import { release, version } from 'node:os';
import { dirname, sep } from 'node:path';

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

await import ('./files/c.cjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadJSON = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url)));
const random = Math.random();

const unknownObject = random > 0.5
  ? loadJSON('./files/a.json')
  : loadJSON('./files/b.json');

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { myServer, unknownObject };


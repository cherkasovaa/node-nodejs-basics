import { fork } from 'node:child_process';
import { dirname, join } from 'node:path';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const childScriptPath = join(__dirname, 'files', 'script.js');

  const child = fork(childScriptPath, [...args], {
    stdio: ['pipe', 'pipe', 'inherit', 'ipc']
  });

  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);
};

// Put your arguments in function call to test this functionality
const args = ['someArgument1', 'someArgument2'];
spawnChildProcess( args );

import { cpus } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

const cpuCount = cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFilePath = join(__dirname, 'worker.js')

const performCalculations = async () => {
  const promises = [];

  for (let i = 0; i < cpuCount; i++) {
    promises.push(runWorker(10 + i))
  }

  const results = await Promise.all(promises);

  console.log(results);
};

const runWorker = async (workerNumber) => {
  return new Promise((resolve) => {
    const worker = new Worker(workerFilePath, { workerData: workerNumber });

    worker.on('message', data => resolve({status: 'resolved', data}));
    worker.on('error', () => resolve({status: 'error', data: null}));
    worker.on('exit', (code) => {
      if (code !== 0) {
        resolve({status: 'error', data: null})
      }
    })
  })
}

await performCalculations();

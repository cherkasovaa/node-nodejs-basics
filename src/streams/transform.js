
import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join(''))
      callback();
    }
  })

  stdin.pipe(reverseStream).pipe(stdout);
};

await transform();

'use strict';
import { readFile } from 'fs/promises';
import { start } from 'repl';

const day = process.argv[2];
const inputFileUrl = `./input-files/day${day}.raw`;

async function readInput(mapFn = String) {
  const input = await readFile(inputFileUrl, { encoding: 'utf-8' });
  const splitInput = input.split('\n');

  splitInput.length -= 1;
  return splitInput.map(mapFn);
}

const funcs = await import(`./solutions/day${day}.mjs`);

if (!funcs.main || typeof funcs.main !== 'function') {
  throw new Error('Create a valid main function to run!');
}

const fileReader = funcs.readInput?.bind(null, [inputFileUrl]) || readInput;

const stopHiResStopwatch = startHiResStopwatch();
console.log('Result: ', funcs.main(await fileReader(funcs.map || String)));
console.log('Speed: %s', stopHiResStopwatch('ms'));

function startHiResStopwatch(unit = 'ns') {
  const time = process.hrtime.bigint();
  if (!this) {
    return startHiResStopwatch.bind(time);
  } else {
    let div = 1;
    let uni = 'ns';
    switch (unit) {
      case 's':
        div = 1000000000;
        uni = 's';
        break;
      case 'ms':
        div = 1000000;
        uni = 'ms';
        break;
      case 'micros':
        div = 1000;
        uni = 'µs';
        break;
    }
    return Number(time - this) / div + uni;
  }
}

import { readFile } from 'fs/promises';

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

console.log('Result: ', funcs.main(await fileReader(funcs.map || String)));

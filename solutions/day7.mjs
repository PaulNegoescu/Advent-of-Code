export async function map(url) {
  const input = await readFile(url, { encoding: 'utf-8' });
  return input.split(',').map(Number);
}

export function main(input) {
  const min = Math.min(...input);
  const max = Math.max(...input);
  const fuels = {};
  let minFuel = +Infinity;
  for (let distance = min; distance < max; ++distance) {
    let totalFuel = 0;
    for (const crab of input) {
      const d = Math.abs(crab - distance);
      totalFuel += (d * (d + 1)) / 2;
    }
    fuels[distance] = totalFuel;
    if (totalFuel < minFuel) {
      minFuel = totalFuel;
    }
  }

  return minFuel;
}

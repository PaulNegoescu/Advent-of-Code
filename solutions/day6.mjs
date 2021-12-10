export function day6(input) {
  let res = { ...input };
  for (let day = 0; day < 256; ++day) {
    const newArr = {};
    for (let i = 0; i <= 8; i++) {
      newArr[i] = res[i + 1] ?? 0;
    }
    newArr[8] = res[0] ?? 0;
    newArr[6] += res[0] ?? 0;

    res = { ...newArr };
  }

  let sum = 0;
  for (let index in res) {
    sum += res[index];
  }
  return sum;
}

export async function readInput(url) {
  const input = await readFile(url, { encoding: 'utf-8' });
  const inputArr = input.split(',').map(Number);

  const res = {};
  for (const num of inputArr) {
    if (!res[num]) {
      res[num] = 1;
    } else {
      res[num]++;
    }
  }

  return res;
}

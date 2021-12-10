export function map(item) {
  const splitItem = item.split(' ');
  return [splitItem[0], Number(splitItem[1])];
}

export function main(input) {
  let x = 0;
  let z = 0;
  let aim = 0;

  for (let com of input) {
    const [dir, num] = com;
    console.log({ dir, num });

    switch (dir) {
      case 'up':
        aim -= num;
        break;
      case 'down':
        aim += num;
        break;
      case 'forward':
        x += num;
        z += aim * num;
        break;
    }
  }
  return x * z;
}

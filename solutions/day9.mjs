export function main(input) {
  // const lowest = [];
  // let danger = 0;
  let largest3 = [-Infinity, -Infinity, -Infinity];
  function moveValue(i) {
    const [one, two] = largest3;
    if (i <= 1) {
      largest3[2] = two;
    }

    if (i === 0) {
      largest3[1] = one;
    }
  }
  const findBasin = generateBasinFinder(input);
  for (let y = 0; y < input.length; ++y) {
    const line = input[y];
    for (let x = 0; x < line.length; ++x) {
      const height = line[x];
      if (isLowest(height, input, x, y)) {
        const basinSize = findBasin(x, y, true);
        // lowest.push(height + 1);
        // danger += height + 1;
        console.log(basinSize);
        for (let i = 0; i < 3; ++i) {
          if (basinSize > largest3[i]) {
            moveValue(i);
            largest3[i] = basinSize;
            break;
          }
        }
      }
    }
  }
  return [largest3.reduce((p, b) => p * b, 1), largest3];
}

export function map(line) {
  return line.split('').map(Number);
}

function isLowest(num, mat, x, y) {
  //check left
  if (x > 0 && num >= mat[y][x - 1]) {
    return false;
  }
  //check right
  if (x < mat[0].length - 1 && num >= mat[y][x + 1]) {
    return false;
  }
  //check above
  if (y > 0 && num >= mat[y - 1][x]) {
    return false;
  }
  //check below
  if (y < mat.length - 1 && num >= mat[y + 1][x]) {
    return false;
  }
  return true;
}

function generateBasinFinder(mat) {
  let acc = 0;
  const checkedPoints = [];

  function findBasin(x, y, resetAcc = false) {
    if (
      checkedPoints[y]?.[x] ||
      x < 0 ||
      y < 0 ||
      x > mat[0].length - 1 ||
      y > mat.length - 1 ||
      mat[y][x] === 9
    ) {
      return;
    }
    if (resetAcc) {
      acc = 0;
    }

    if (!checkedPoints[y]) {
      checkedPoints[y] = [];
    }
    checkedPoints[y][x] = true;

    findBasin(x, y - 1);
    findBasin(x, y + 1);
    findBasin(x + 1, y);
    findBasin(x - 1, y);

    acc += 1;
    return acc;
  }

  return findBasin;
}

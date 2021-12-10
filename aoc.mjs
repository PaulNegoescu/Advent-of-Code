import { readFile } from 'fs/promises';

const url = `./day10.raw`;

async function readInputDay4() {
  const input = await readFile(url, { encoding: 'utf-8' });
  const splitInput = input.split('\n');

  const numbers = splitInput[0].split(',').map(Number);

  const boards = [];
  for (let i = 2; i < splitInput.length; i += 6) {
    const board = [];
    for (let j = 0; j < 5; ++j) {
      board[j] = splitInput[i + j]
        .split(' ')
        .filter((num) => num !== '')
        .map(Number);
    }
    boards.push(board);
  }

  return { numbers, boards };
}

async function readInput(mapFn = String) {
  const input = await readFile(url, { encoding: 'utf-8' });
  const splitInput = input.split('\n');

  splitInput.length -= 1;
  return splitInput.map(mapFn);
}

async function readInputDay6() {
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

async function readInputDay7() {
  const input = await readFile(url, { encoding: 'utf-8' });
  return input.split(',').map(Number);
}

(function day1(input) {
  let prev = input[0] + input[1] + input[2];
  let sum = 0;
  for (let i = 1; i < input.length; i += 1) {
    const num = input[i] + input[i + 1] + input[i + 2];
    if (num > prev) {
      sum += 1;
    }
    prev = num;
  }

  console.log(sum);
}); //((await readInput(Number));

function day2Map(item) {
  const splitItem = item.split(' ');
  return [splitItem[0], Number(splitItem[1])];
}
//test
(function day2(input) {
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
  console.log(x * z);
}); //(await readInput(day2Map));

(function day3(input) {
  function isOneMost(arr, index) {
    const ones = arr.reduce((acc, num) => {
      if (num[index] === '1') {
        return acc + 1;
      }
      return acc;
    }, 0);

    return ones >= arr.length / 2;
  }
  const res = { o: [...input], c: [...input] };

  for (let i = 0; i < input[0].length; i++) {
    //o2 keep most or ones
    if (res.o.length > 1) {
      const oneIsMost = isOneMost(res.o, i);

      res.o = res.o.filter((item) => item[i] === (oneIsMost ? '1' : '0'));
    }

    //co2 keep least or zeroes
    if (res.c.length > 1) {
      const oneIsMost = isOneMost(res.c, i);
      res.c = res.c.filter((item) => item[i] === (oneIsMost ? '0' : '1'));
    }
  }

  console.log(res, parseInt(res.o[0], 2) * parseInt(res.c[0], 2));
}); //(await readInput());

(function day4(input) {
  const { numbers, boards } = input;

  function isWin(board, index, line) {
    let winLine = true;
    for (const num of line) {
      if (num !== 'M') {
        winLine = false;
        break;
      }
    }

    let winCol = true;
    for (const line of board) {
      if (line[index] !== 'M') {
        winCol = false;
        break;
      }
    }
    return winLine || winCol;
  }

  function calculateSum(board) {
    let sum = 0;
    for (const line of board) {
      for (const num of line) {
        if (num === 'M') {
          continue;
        }
        sum += num;
      }
    }
    return sum;
  }

  let winningBoards = {};
  let winningBoard = [];
  let winningNum = NaN;

  out: for (const num of numbers) {
    for (let boardIndex = 0; boardIndex < boards.length; ++boardIndex) {
      if (winningBoards[boardIndex]) {
        continue;
      }

      const board = boards[boardIndex];
      for (const line of board) {
        for (let posIndex = 0; posIndex < line.length; ++posIndex) {
          const pos = line[posIndex];
          if (pos === num) {
            line[posIndex] = 'M';
            if (isWin(board, posIndex, line)) {
              winningBoards[boardIndex] = board;
              winningBoard = board;
              winningNum = num;
            }
          }
        }
      }
    }
  }
  const sum = calculateSum(winningBoard);
  console.log({ sum, winningNum, winningBoard }, sum * winningNum);
}); //(await readInputDay4());

function day5Map(line) {
  const [point1, , point2] = line.split(' ');
  const p1 = point1.split(',').map(Number);
  const p2 = point2.split(',').map(Number);
  return [p1, p2];
}
(function day5(input) {
  const mat = [];
  for (const line of input) {
    const [p1, p2] = line;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const maxX = Math.max(x1, x2);
    const minX = Math.min(x1, x2);
    const maxY = Math.max(y1, y2);
    const minY = Math.min(y1, y2);
    if (x1 === x2) {
      for (let y = minY; y <= maxY; ++y) {
        if (!mat[y]) {
          mat[y] = [];
          mat[y][x1] = 1;
        } else {
          if (!mat[y][x1]) {
            mat[y][x1] = 1;
          } else {
            mat[y][x1] += 1;
          }
        }
      }
    } else if (y1 === y2) {
      if (!mat[y1]) {
        mat[y1] = [];
      }
      for (let x = minX; x <= maxX; ++x) {
        if (!mat[y1][x]) {
          mat[y1][x] = 1;
        } else {
          mat[y1][x] += 1;
        }
      }
    } else {
      // trebuie aflat daca x-ul corespunzator lui minY este maxX sau minX
      // trebuie sa aflam care e x-ul corespunzator lui minY si sa-l comparam cu maxX
      //trebuie sa aflam daca minY este in p1 sau in p2
      let dir = 'desc';
      if ((y1 === minY && x1 === minX) || (y1 === maxY && x1 === maxX)) {
        dir = 'asc';
      }
      for (let y = minY; y <= maxY; ++y) {
        if (!mat[y]) {
          mat[y] = [];
        }
        let x = maxX - (y - minY);
        if (dir === 'asc') {
          x = minX + (y - minY);
        }
        if (!mat[y][x]) {
          mat[y][x] = 1;
        } else {
          mat[y][x] += 1;
        }
      }
    }
  }
  let sum = 0;

  for (const line of mat) {
    if (!line) continue;
    for (const num of line) {
      if (num >= 2) {
        sum += 1;
      }
    }
  }
  console.log(sum);
}); //(await readInput(day5Map));
(function day6(input) {
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
  console.log(sum);
}); //(await readInputDay6());

(function day7(input) {
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

  console.log(minFuel);
}); //(await readInputDay7());

function day8Map(line) {
  const [input, output] = line.split('|');
  const inputNum = input?.trim().split(' ');
  const outputNum = output?.trim().split(' ');

  return [inputNum, outputNum];
}
(function day8(input) {
  const uniqueLengths = { 2: 1, 4: 4, 3: 7, 7: 8 };

  let sum = 0;
  for (const [inputNum, outputNum] of input) {
    let pat = [];
    pat[1] = inputNum.find((n) => n.length === 2);
    pat[4] = inputNum.find((n) => n.length === 4);
    pat[7] = inputNum.find((n) => n.length === 3);
    pat[8] = inputNum.find((n) => n.length === 7);

    const zeroSixNine = inputNum.filter((i) => i.length === 6);

    pat[9] = zeroSixNine.find((n) => isIncludedIn(pat[4], n));
    pat[6] = zeroSixNine.find((n) => !isIncludedIn(pat[1], n) && n !== pat[9]);
    pat[0] = zeroSixNine.find((n) => n !== pat[9] && n !== pat[6]);

    const threeTwoFive = inputNum.filter((i) => i.length === 5);

    pat[5] = threeTwoFive.find((n) => isIncludedIn(n, pat[6]));
    pat[3] = threeTwoFive.find((n) => isIncludedIn(pat[1], n));
    pat[2] = threeTwoFive.find((n) => n !== pat[3] && n !== pat[5]);
    pat = pat.map((p) => [...p].sort().join(''));

    let number = '';
    for (const o of outputNum) {
      // if (uniqueLengths[o.length]) {
      //   sum += 1;
      // }
      const p = [...o].sort().join('');

      number += pat.indexOf(p);
    }

    sum += Number(number);
  }
  console.log(sum);
}); //(await readInput(day8Map));

function isIncludedIn(small, big) {
  return [...small].every((letter) => big.includes(letter));
}

(function day9(input) {
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
  console.log(
    largest3.reduce((p, b) => p * b, 1),
    largest3
  );
}); //(await readInput((line) => line.split('').map(Number)));

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

(function day10(input) {
  const score = [3, 57, 1197, 25137];

  // let sum = 0;
  const sums = [];
  top: for (const line of input) {
    let sum = 0;
    const chunks = [];
    for (const paren of line) {
      if (isClosingParen(paren)) {
        const lastChunk = chunks.pop();
        if (lastChunk === undefined || lastChunk + paren !== 0) {
          // this line is corrupted
          // sum += score[Math.abs(paren) - 1];
          continue top;
        }
      } else {
        chunks.push(paren);
      }
    }

    for (let i = chunks.length - 1; i >= 0; --i) {
      // console.log(sum, chunks[i]);
      sum = sum * 5 + chunks[i];
    }
    // break;

    sums.push(sum);
  }

  sums.sort((a, b) => a - b);
  console.log(sums, sums[Math.floor(sums.length / 2)]);
})(await readInput((line) => line.split('').map(mapParensToNum)));

function mapParensToNum(paren) {
  const opening = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
    ')': -1,
    ']': -2,
    '}': -3,
    '>': -4,
  };
  return opening[paren];
}

function isClosingParen(paren) {
  return paren < 0;
}

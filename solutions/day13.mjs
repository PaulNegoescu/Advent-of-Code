export function main(input) {
  const folds = input.slice(input.length - 12);
  const dots = input.slice(0, input.length - 13);

  //   console.log([dots[dots.length - 1], folds]);
  const dotMap = [];
  let largestX = 0;
  let largestY = 0;
  for (const [x, y] of dots) {
    if (y > largestY) {
      largestY = y;
    }
    if (x > largestX) {
      largestX = x;
    }
    if (!dotMap[y]) {
      dotMap[y] = [];
    }
    dotMap[y][x] = 1;
  }

  for (const [foldAxis, foldCoord] of folds) {
    const len = foldCoord * 2;
    if (foldAxis === 'y') {
      for (let i = foldCoord + 1; i <= len; ++i) {
        const lineToIndex = len - i;
        const lineFrom = dotMap[i];

        if (lineFrom === undefined) {
          continue;
        }

        let lineTo = dotMap[lineToIndex];
        if (lineTo === undefined) {
          dotMap[lineToIndex] = [];
          lineTo = dotMap[lineToIndex];
        }

        // console.log({ lineFromIndex: i, foldCoord, lineToIndex, largestY });

        for (let j = 0; j <= largestX; ++j) {
          const dot = lineFrom[j] ?? 0;

          lineTo[j] = (lineTo[j] ?? 0) + dot;
        }
      }
      dotMap.splice(foldCoord);
      largestY = foldCoord - 1;
    }

    if (foldAxis === 'x') {
      for (let i = foldCoord + 1; i <= len; ++i) {
        for (const line of dotMap) {
          if (line === undefined) {
            continue;
          }

          const dot = line[i] ?? 0;

          const leftCoord = len - i;
          line[leftCoord] = (line[leftCoord] ?? 0) + dot;
          if (i === len) {
            line.splice(foldCoord);
          }
        }
      }
      largestX = foldCoord - 1;
    }
  }

  display(dotMap, largestX, largestY, ' ');
  return countDots(dotMap);
}

export function map(line) {
  const coords = [];
  if (line.length > 1) {
    if (!line.includes('fold')) {
      return line.split(',').map(Number);
    } else {
      const fold = line.split('=');
      return [fold[0][11], Number(fold[1])];
    }
  }
  return [];
}

function display(map, x, y, emptyChar = '.') {
  for (const line of map) {
    // let line = map[i];
    let dLine = '';
    if (!line) {
      console.log(emptyChar.repeat(x + 1));
      continue;
    }
    for (const dot of line) {
      //   const dot = line[j];
      if (dot) {
        dLine += '#';
      } else {
        dLine += emptyChar;
      }
    }
    console.log(dLine);
  }
  console.log('====================================');
}

function countDots(map) {
  let sum = 0;
  for (const line of map) {
    if (line === undefined) {
      continue;
    }
    for (const dot of line) {
      if (dot) {
        sum += 1;
      }
    }
  }

  return sum;
}

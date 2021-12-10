export function map(line) {
  const [point1, , point2] = line.split(' ');
  const p1 = point1.split(',').map(Number);
  const p2 = point2.split(',').map(Number);
  return [p1, p2];
}

export function main(input) {
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
  return sum;
}

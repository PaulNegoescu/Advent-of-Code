export function main(input) {
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
  return [sums, sums[Math.floor(sums.length / 2)]];
}

export function map(line) {
  return line.split('').map(mapParensToNum);
}

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

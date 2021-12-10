export function main(input) {
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
}

export async function readInput(url) {
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

export function map(line) {
  const [input, output] = line.split('|');
  const inputNum = input?.trim().split(' ');
  const outputNum = output?.trim().split(' ');

  return [inputNum, outputNum];
}
export function day8(input) {
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
  return sum;
}

function isIncludedIn(small, big) {
  return [...small].every((letter) => big.includes(letter));
}

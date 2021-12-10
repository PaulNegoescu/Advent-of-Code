export function main(input) {
  let prev = input[0] + input[1] + input[2];
  let sum = 0;
  for (let i = 1; i < input.length; i += 1) {
    const num = input[i] + input[i + 1] + input[i + 2];
    if (num > prev) {
      sum += 1;
    }
    prev = num;
  }

  return sum;
}

export const map = Number;

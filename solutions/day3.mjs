export function main(input) {
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

  return [res, parseInt(res.o[0], 2) * parseInt(res.c[0], 2)];
}

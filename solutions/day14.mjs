export function main(input) {
  const initial = input.shift();
  input.shift();
  // const mappings = createMappings(input);

  const nextPairs = input.reduce((acc, [pair, letter]) => {
    const [f, l] = pair;
    // PK -> P
    // {'PK': ['PP', 'PK']}
    acc[pair] = [f + letter, letter + l];
    return acc;
  }, {});

  // const absCount = {};
  // for (let i = 0; i < initial.length - 1; i += 1) {
  //   const pair = [initial[i], initial[i + 1]];
  //   console.log(pair);
  //   const count = calculateEvolution(pair, mappings, 18);
  //   mergeCounts(absCount, count);
  // }

  // const { highest, lowest } = calculateExtremes(absCount);
  // return highest - lowest;

  let pairCounts = {};
  for (let i = 0; i < initial.length - 1; ++i) {
    const pair = initial[i] + initial[i + 1];
    // {'PK': 3}
    pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
  }

  const evolutionSteps = 40;
  for (let i = 0; i < evolutionSteps; ++i) {
    const nextCounts = {};

    // console.log(nextPairs);
    for (const pair in pairCounts) {
      for (const nextPair of nextPairs[pair]) {
        // {'PK': ['PP', 'PK']}
        // nextPair === 'PP' apoi 'PK'
        // pentru fiecare pereche adunam cate perechi parinte existau in polymer plus de cate ori apare perechea curenta
        // in exemplul de mai sus pentru ca in parinte avem si P si K atat pentru PP cat si pentru PK trebuie sa adunam
        // cate PK au fot cu cate PP respectiv PK sunt ca sa stim cate P (index [1] din pereche) respectiv cate K (tot
        // index [1] din pereche) sunt
        nextCounts[nextPair] = (nextCounts[nextPair] ?? 0) + pairCounts[pair];
      }
    }
    pairCounts = nextCounts;
  }

  let letterCounts = {
    // ne trebuie prima litera din input numarata odata ca in iteratia de jos nu consideram ca prima pereche ever avea litera aia
    [initial[0]]: 1,
  };

  //acum adunam toti indicii [1] pe care i-am numarat mai sus cu numarul de perechi in care apar
  for (const pair in pairCounts) {
    letterCounts[pair[1]] = (letterCounts[pair[1]] ?? 0) + pairCounts[pair];
  }

  const { highest, lowest } = calculateExtremes(letterCounts);
  return highest - lowest;
}

export function map(line) {
  if (line.includes('->')) {
    return line.split(' -> ');
  }
  return line.split('');
}

function createMappings(input) {
  return input.reduce((acc, line) => {
    acc[line[0]] = line[1];
    return acc;
  }, {});
}

function calculateEvolution(polymer, map, steps) {
  const count = {};
  for (let letter of polymer) {
    addLetter(letter, count);
  }

  for (let i = 0; i < steps; ++i) {
    const newPolymer = [...polymer];
    for (let j = 0; j < polymer.length - 1; ++j) {
      const pair = polymer[j] + polymer[j + 1];
      const letter = map[pair];
      addLetter(letter, count);
      newPolymer.splice(j + j + 1, 0, map[pair]);
    }

    polymer = newPolymer;
  }

  return count;
}

function addLetter(letter, count, increment = 1) {
  if (!count[letter]) {
    count[letter] = 0;
  }
  count[letter] += increment;
}

function mergeCounts(dest, source) {
  for (const letter in source) {
    addLetter(letter, dest, source[letter]);
  }
}

function calculateExtremes(count) {
  let lowest = +Infinity;
  let highest = -Infinity;
  for (const letter in count) {
    if (count[letter] < lowest) {
      lowest = count[letter];
    }

    if (count[letter] > highest) {
      highest = count[letter];
    }
  }

  return { highest, lowest };
}

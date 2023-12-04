const fs = require("fs");

const data1 = ["part-1-test-data.txt", "part-1-data.txt"];

const data2 = ["part-2-test-data.txt", "part-2-data.txt"];

data1.forEach((fileName) => {
  const result = part1(fileName);
  console.log(result);
});

data2.forEach((fileName) => {
  const result = part2(fileName);
  console.log(result);
});

function part1(fileName) {
  const lines = fs.readFileSync(fileName, "utf-8").split("\n");
  return {
    fileName,
    result: lines.map(mapToNumbers).reduce(sum, 0),
  };
}

function part2(fileName) {
  const lines = fs.readFileSync(fileName, "utf-8").split("\n");
  return {
    fileName,
    result: lines.map(mapToSpelledNumbers).reduce(sum),
  };
}

function sum(acc, curr) {
  return acc + curr;
}

function isDigit(x) {
  return !isNaN(x);
}

function mapToNumbers(line) {
  const numbers = line.split("").map(Number).filter(isDigit);
  const first = numbers[0];
  const last = numbers[numbers.length - 1];
  return Number(`${first}${last}`);
}

function mapToSpelledNumbers(line) {
  const numberRegEx = /(one|two|three|four|five|six|seven|eight|nine|\d)/gi;
  const lastRegExp = /(enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|\d)/gi;

  const x = line.match(numberRegEx);
  const y = line.split("").reverse().join("").match(lastRegExp);
  const first = toDigit(x[0]);
  const last = toDigit(y[0]);
  console.log(line, first, last, y);
  return Number(`${first}${last}`);
}

function toDigit(x) {
  const dict = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    enin: 9,
    thgie: 8,
    neves: 7,
    xis: 6,
    evif: 5,
    ruof: 4,
    eerht: 3,
    owt: 2,
    eno: 1,
  };
  return !isNaN(x) ? x : dict[x];
}

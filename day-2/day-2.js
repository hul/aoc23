const fs = require("fs");

const data1 = ["data-1-test.txt", "data-1.txt"];

const data2 = ["data-2-test.txt", "data-2.txt"];

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
  const games = lines.map(processLine);
  return {
    fileName,
    games,
    sum: games
      .filter((x) => x.isOk)
      .map((x) => x.id)
      .reduce((a, b) => a + b),
  };
}

function part2(fileName) {
  const lines = fs.readFileSync(fileName, "utf-8").split("\n");
  const games = lines.map(processLine);
  return {
    fileName,
    games,
    sum: games.map((x) => x.power).reduce((acc, curr) => acc + curr),
  };
}

function processLine(line) {
  const [gamePart, cubesPart] = line.split(": ");
  const id = parseInt(gamePart.replace(/\D/g, ""), 10);
  const cubes = getCubes(cubesPart);
  return {
    id,
    cubes: JSON.stringify(cubes),
    isOk: checkCubes(cubes),
    power: cubes.red * cubes.green * cubes.blue,
  };
}

function checkCubes({ red, green, blue }) {
  const max = { red: 12, green: 13, blue: 14 };
  return red <= max.red && green <= max.green && blue <= max.blue;
}

function getCubes(cubes) {
  return cubes
    .split("; ")
    .map((x) => x.split(", "))
    .flat()
    .map((x) => x.split(" "))
    .reduce((acc, curr) => {
      const [count, type] = curr;
      if (!acc[type]) {
        acc[type] = Number(count);
      } else {
        acc[type] = Math.max(acc[type], Number(count));
      }
      return acc;
    }, {});
}

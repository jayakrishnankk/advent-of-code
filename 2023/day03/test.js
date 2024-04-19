import { partSum } from "./solutions.js";
import { schematics } from "./input.js";

const testInput =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

console.assert(partSum(testInput) == 4361);

console.log(partSum(schematics));

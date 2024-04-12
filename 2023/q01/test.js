import { sumOfCalibrations } from './solution.js';
import { input } from './input.js';

const testInput = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet",
];

console.assert(sumOfCalibrations(testInput) === 142);

console.log(sumOfCalibrations(input));


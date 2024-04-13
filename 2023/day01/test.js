import { sumOfCalibrations, sumOfCalibrationsV2 } from './solution.js';
import { input } from './input.js';

const testInput1 = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet",
];

console.assert(sumOfCalibrations(testInput1) === 142);

console.log(sumOfCalibrations(input));

const testInput2 = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen"
];

console.assert(sumOfCalibrationsV2(testInput2) === 281);

console.log(sumOfCalibrationsV2(input));

import { measurements } from "./input.js";

let prev = measurements[0];
let larger = 0;
for (let i = 1; i < measurements.length; i++) {
    if (measurements[i] > prev) larger++;
    prev = measurements[i];
}
console.log(`Part1: measurements are larger than the previous measurement = ${larger}`)

prev = measurements[0] + measurements[1] + measurements[2];
larger = 0;
for (let i = 3; i < measurements.length; i++) {
    let current = measurements[i-2] + measurements[i-1] + measurements[i];
    if (current > prev) larger++;
    prev = current;
}
console.log(`Part2: measurements are larger than the previous measurement = ${larger}`)

import { ages as input } from "./input.js";

const nextDay = (ages) => [ages[1], ages[2], ages[3], ages[4], ages[5], ages[6], ages[7] + ages[0], ages[8], ages[0]];

function fishCountInDays(x) {
    let fishAges = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    input.forEach(age => { fishAges[age] += 1; });
    for (let i = 1; i <= x; i++) {
        fishAges = nextDay(fishAges);
    }
    return fishAges.reduce((sum, count) => sum + count, 0);
}

console.log(`Part 1: Fish count after 80 days: ${fishCountInDays(80)}`)
console.log(`Part 2: Fish count after 256 days: ${fishCountInDays(256)}`)

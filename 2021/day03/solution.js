import { diagnostics } from "./input.js";

const ones = (report, position) => report.reduce((sum, measure) => sum + parseInt(measure.charAt(position)), 0);
let mostCommonBit = (report, position) => ones(report, position) > Math.ceil(report.length / 2) ? 1 : 0;
let leastCommonBit = (report, position) => ones(report, position) < Math.floor(report.length / 2) ? 1 : 0;

let [gamma, epsilon] = ["", ""];
for (let position = 0; position < diagnostics[0].length; position++) {
    gamma += mostCommonBit(diagnostics, position);
    epsilon += leastCommonBit(diagnostics, position);
}

console.log( `Part1: Power consumption = ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`);

// slight logic modification for Most Common Bit for second part
mostCommonBit = (report, position) => ones(report, position) >= Math.ceil(report.length / 2) ? 1 : 0;
leastCommonBit = (report, position) => ones(report, position) < Math.ceil(report.length / 2) ? 1 : 0;

const rating = (report, position, maxLength, commonFunction) => {
    let common = commonFunction(report, position);
    let subset = report.filter(measure => parseInt(measure.charAt(position)) === common);
    if (subset.length === 1) return parseInt(subset[0], 2);
    else if (position === maxLength - 1) throw Error("cannot find a unique result");
    else return rating(subset, position+1, maxLength, commonFunction)
}

const o2 = rating([...diagnostics], 0, diagnostics[0].length, mostCommonBit);
const co2 = rating([...diagnostics], 0, diagnostics[0].length, leastCommonBit);

console.log( `Part2: Lift Support Rating = ${o2 * co2}`);

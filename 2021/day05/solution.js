import { input } from "./input.js";

const lines = input.map(entry => {
    let [from, to] = entry.split(" -> ");
    let [x1, y1] = from.split(",");
    let [x2, y2] = to.split(",");
    return {x1: parseInt(x1), y1: parseInt(y1), x2: parseInt(x2), y2: parseInt(y2)};
});

const max = lines.reduce((prev, line) => ({x: Math.max(prev.x, line.x1, line.x2), y: Math.max(prev.y, line.y1, line.y2)}), {x: 0, y: 0});

let plane = Array(max.y).fill(0).map(_ => Array(max.x).fill(0));
const straightLines = lines.filter(line => line.x1 === line.x2 || line.y1 === line.y2);
const diagonalLines = lines.filter(line => Math.abs((line.x1 - line.x2) / (line.y1 - line.y2)) === 1);
const redrawCoordinates = line => ( {
    x1: Math.min(line.x1, line.x2), y1: Math.min(line.y1, line.y2),
    x2: Math.max(line.x1, line.x2), y2: Math.max(line.y1, line.y2)}
);
const forwardLine = line => line.x1 <= line.x2 ? line : {x1: line.x2, y1: line.y2, x2: line.x1, y2: line.y1};

for (const _line of straightLines) {
    const line = redrawCoordinates(_line);
    for (let x = line.x1; x <= line.x2; x++) {
        for (let y = line.y1; y <= line.y2; y++) {
            plane[x][y] += 1;
        }
    }
}

const partOneOverlapping = plane.reduce((prevRowSum, row) => prevRowSum + row.reduce((prevCellSum, cell)=> prevCellSum + (cell > 1 ? 1 : 0) , 0), 0);
console.log(`Part 1: Overlapping lines: ${partOneOverlapping}`)

for (const _line of diagonalLines) {
    let slope = (_line.x1 - _line.x2) / (_line.y1 - _line.y2);
    const line = forwardLine(_line);
    let y = line.y1;
    for (let x = line.x1; x <= line.x2; x++) {
        plane[x][y + (x - line.x1) * slope] += 1;
    }
}

const partTwoOverlapping = plane.reduce((prevRowSum, row) => prevRowSum + row.reduce((prevCellSum, cell)=> prevCellSum + (cell > 1 ? 1 : 0) , 0), 0);
console.log(`Part 2: Overlapping lines: ${partTwoOverlapping}`)

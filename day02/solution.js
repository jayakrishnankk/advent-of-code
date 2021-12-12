import { commands } from "./input.js";

let [height , depth, aim] = [0, 0, 0];

commands.forEach(command => {
    let [direction, _dist] = command.split(" ");
    let distance = parseInt(_dist);
    if (direction === "forward") height += distance;
    else if (direction === "down") depth += distance;
    else if (direction === "up") depth -= distance;
})

console.log(`Part1: Answer = ${height * depth}`)

height = depth = aim = 0;
commands.forEach(command => {
    let [direction, _dist] = command.split(" ");
    let distance = parseInt(_dist);
    if (direction === "forward") {
        height += distance;
        depth += distance * aim;
    } else if (direction === "down") aim += distance;
    else if (direction === "up") aim -= distance;
})

console.log(`Part2: Answer = ${height * depth}`)

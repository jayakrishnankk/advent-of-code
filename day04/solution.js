import { draws, boards as input } from "./input.js";

const mark = (board, draw) => board.map(row => row.map(cell => cell === draw ? -1 : cell));
const isRowBingo = board => board.filter(row => row.reduce((a, b) => a + b, 0) === -5).length > 0;
const isColBingo = board => board.reduce((colSums, row) => row.map((_, i) => colSums[i] + row[i]), [0,0,0,0,0]).filter(colSum => colSum === -5).length > 0;
const isBingo = board => isRowBingo(board) || isColBingo(board);
const boardSum = board => board.reduce((prevRowSum, row) => prevRowSum + row.reduce((sum, cell) => cell === -1 ? sum : sum + cell, 0), 0);

function win() {
    let [boards, theBoard] = [input, undefined];
    for (let draw of draws) {
        boards = boards.map(board => mark(board, draw));
        for (let board of boards) {
            if (isBingo(board)) { theBoard = board; break; }
        }
        if (theBoard) return draw * boardSum(theBoard);
    }
}

function lose() {
    let [boards, lastDraw, theBoard] = [input, undefined, undefined];
    for (let draw of draws) {
        boards = boards.map(board => mark(board, draw)).filter(board => !isBingo(board));
        if (boards.length === 1)  theBoard = boards[0];
        else if (boards.length === 0) { lastDraw = draw; break; }
    }
    return lastDraw * (boardSum(theBoard) - lastDraw);
}

console.log( `Part1: Win strategy score = ${win()}`);
console.log( `Part2: Lost strategy score = ${lose()}`);

export const partSum = (schematics) => {
    const lines = schematics.split("\n");
    const numbersRe = /(\d+)/g; // find numbers
    const partNums = lines.map((line, index) => {
        const numbers = line.matchAll(numbersRe);
        return [...numbers].map(numMatch => {
            const min = Math.max(numMatch.index - 1, 0);
            const max = Math.min(numMatch.index + numMatch[0].length, line.length - 1);
            const vicinity = [index - 1, index, index + 1]
                .filter(i => i >= 0 && i < lines.length)
                .map(i => lines[i].substring(min, max + 1))
                .join("");
            // test for the presence of non-"numeric and dot"s
            const isPart = !/^[\d\.]+$/.test(vicinity);
            return isPart ? Number.parseInt(numMatch[0]) : 0;
        });
    }).flat();
    return partNums.reduce((acc, val) => acc + val, 0);
}
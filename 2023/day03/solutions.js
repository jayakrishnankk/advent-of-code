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

export const gearRatioSum = (schematics) => {
    const lines = schematics.split("\n");
    const numbersRe = /(\d+)/g; // find numbers
    const starRe = /(\*)/g; // find stars
    const numMap = lines.map(line =>
        [...line.matchAll(numbersRe)].map(numMatch => (
            {min: numMatch.index, max: numMatch.index + numMatch[0].length - 1, val: +numMatch[0]}
        ))
    );
    const gearRatios = lines.map((line, index) => {
        const stars = [...line.matchAll(starRe)];
        return stars.map(star => [index - 1, index, index + 1]
            .filter(i => i >= 0 && i < lines.length)
            .map(i => numMap[i].filter(num => star.index >= num.min - 1 && star.index <= num.max + 1))
            .flat()
        ).filter(nums => nums.length === 2)
            .reduce((acc, [a, b]) => acc + a.val * b.val, 0)
    });
    return gearRatios.reduce((acc, ratio) => acc + ratio, 0);
}

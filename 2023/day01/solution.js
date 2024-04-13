const nums = "0123456789";
export const sumOfCalibrations = (values) => {
    const numExtracts = values.map(value => value.split("").filter(char => nums.includes(char)).join(""));
    const twoDigits = numExtracts.map(value => Number.parseInt(value[0]+value[value.length-1]));
    return twoDigits.reduce((total, val) => total + val, 0);
};

const numbers = nums.split("");
const textNums = "zero,one,two,three,four,five,six,seven,eight,nine".split(",");
export const sumOfCalibrationsV2 = (values) => {
    const numReplaced = values.map(value => {
        let initial = {
            minIndex: Number.MAX_VALUE,
            min: null,
            maxIndex: Number.MIN_VALUE,
            max: null
        };
        let minMax = [...numbers, ...textNums].reduce((acc, num, index) => {
            const re = new RegExp(num, "gi");
            const matches = [...value.matchAll(re)];
            if (matches.length) {
                const [min, max] = [matches[0].index, matches[matches.length - 1].index];
                if (acc.minIndex > min) {
                    acc.minIndex = min;
                    acc.min = index % 10;
                }
                if (acc.maxIndex < max) {
                    acc.maxIndex = max;
                    acc.max = index % 10;
                }
            }
            return acc;
        }, initial);
        return "" + minMax.min + minMax.max;
    });
    return sumOfCalibrations(numReplaced);
}
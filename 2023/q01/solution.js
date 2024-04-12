const nums = "0123456789";
export const sumOfCalibrations = (values) => {
    const numExtracts = values.map(value => value.split("").filter(char => nums.includes(char)).join(""));
    const twoDigits = numExtracts.map(value => Number.parseInt(value[0]+value[value.length-1]));
    return twoDigits.reduce((total, val) => total + val, 0);
};

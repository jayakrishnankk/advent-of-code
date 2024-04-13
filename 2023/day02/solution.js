export const possibleGamesIdSum = (games, config) => {
    // filter possible games only
    return games.map(game => {
        const partsRe = /Game (\d+): (.*)/g
        const [_, gameId, draws] = [...game.matchAll(partsRe)][0];
        const impossibleDraws = draws.split("; ").find(draw => {
            const cubes = draw.split(", ");
            const impossibleCubes = cubes.find(cube => {
                const [count, color] = cube.split(" ");
                return count > config[color];
            });
            return !!impossibleCubes;
        })
        return impossibleDraws ? 0 : Number.parseInt(gameId);
    }).reduce((total, id) => total + id, 0);
};

export const powerSum = (games) => {
    const powers = games.map(game => {
        const partsRe = /Game \d+: (.*)/g
        const [_, draws] = [...game.matchAll(partsRe)][0];
        const minPossible = draws.split("; ").reduce(
            (acc, draw) => {
                const cubes = draw.split(", ");
                acc = cubes.reduce((acc, cube) => {
                    const [count, color] = cube.split(" ");
                    acc[color] = Math.max(acc[color], Number.parseInt(count));
                    return acc;
                }, acc);
                return acc;
            },
            {blue: 0, red: 0, green: 0}
        );
        return minPossible.red * minPossible.blue * minPossible.green;
    });
    return powers.reduce((total, power) => total + power, 0);
};

export const solution = (games, config) => {
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

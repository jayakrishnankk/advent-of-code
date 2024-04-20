const processCardsString = (cardsString) => cardsString
    .split("\n")
    .map(c => c.replace(/Card +\d+: +/, ""))
    .map(c => c.split(/ +\| +/))
    .map(([winning, mine]) => ({
        winning: winning.split(/ +/).map(n => +n),
        mine: mine.split(/ +/).map(n => +n)
    }))

const countMatches = (card) => card.mine.filter(num => card.winning.includes(num)).length;

export const cardsTotal = (cardsString) => {
    const cards = processCardsString(cardsString);
    const points = cards.map(card => {
        const matchCount = countMatches(card);
        return matchCount ? Math.pow(2, matchCount - 1) : 0;
    });
    return points.reduce((acc, point) => acc + point, 0);
};

export const totalCardsCount = (cardsString) => {
    const cards = processCardsString(cardsString);
    const points = cards.map(card => countMatches(card));
    let cardCounts = Array(cards.length).fill(1);
    points.forEach((matchCount, index) => {
        cardCounts = cardCounts.map(
            (cardCount, cardIndex) =>
                cardIndex > index && cardIndex <= index + matchCount ? cardCount + cardCounts[index] : cardCount
        )
    });
    return cardCounts.reduce((acc, val) => acc + val, 0);
};

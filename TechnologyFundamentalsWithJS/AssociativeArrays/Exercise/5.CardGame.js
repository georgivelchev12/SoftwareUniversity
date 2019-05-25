function solve(input) {
    let power = {
        '2': 2, '3': 3, '4': 4,
        '5': 5, '6': 6, '7': 7,
        '8': 8, '9': 9, '10': 10, 'J': 11,
        'Q': 12, 'K': 13, 'A': 14
    }
    let type = {
        'S': 4, 'H': 3,
        'D': 2, 'C': 1
    }
    let players = {};
    for (const line of input) {
        let splited = line.split(': ');
        let name = splited[0];
        let cards = splited[1].split(', ');
        for (const card of cards) {
            let p = card.slice(0, card.length - 1)
            let t = card[card.length - 1]
            cards.splice(cards.indexOf(card), 1, power[p] * type[t])
        }
        if (!players.hasOwnProperty(name)) {
            players[name] = [];
        }
        players[name] = players[name]
            .concat(cards)
            .filter((card, index, deck) => index == deck.indexOf(card))
    }
    for (const player in players) {
        let deckValue = players[player].reduce((a, b) => a + b, 0)
        console.log(`${player}: ${deckValue}`)
    }
}


solve(['Peter: 2C, 4H, 9H, AS, QS',
    'Tomas: 3H, 10S, JC, KD, 5S, 10S',
    'Andrea: QH, QC, QS, QD',
    'Tomas: 6H, 7S, KC, KD, 5S, 10C',
    'Andrea: QH, QC, JS, JD, JC',
    'Peter: JD, JD, JD, JD, JD, JD']);
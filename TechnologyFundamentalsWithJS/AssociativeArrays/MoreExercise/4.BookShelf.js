solve = (arr) => {
    let result = {};
    arr.forEach(elem => {
        if (elem.includes('->')) {
            let [shelfId, shelfGenre] = elem.split(' -> ');
            if (!(shelfId in result)) {
                result[shelfId] = {};
                result[shelfId][shelfGenre] = [];
            }
        } else {
            let [titleAndAutor, genre] = elem.split(', ');
            for (const key in result) {
                if (result[key].hasOwnProperty(genre)) {
                    result[key][genre].push(titleAndAutor)
                }
            }
        }
    });
    Object.entries(result)
        .sort((a, b) => Object.entries(b[1])[0][1].length - Object.entries(a[1])[0][1].length)
        .forEach(a => {
            console.log(`${a[0]} ${Object.entries(a[1])[0][0]}: ${Object.entries(a[1])[0][1].length}`)

            Object.entries(a[1])[0][1]
                .map(e => e.split(': '))
                .sort((a, b) => a[0].localeCompare(b[0]))
                .forEach(e => console.log(`--> ${e.join(': ')}`))
        })
}
solve(['1 -> history',
    '1 -> action',
    'Death in Time: Criss Bell, mystery',
    '2 -> mystery',
    '3 -> sci-fi',
    'Child of Silver: Bruce Rich, mystery',
    'Hurting Secrets: Dustin Bolt, action',
    'Future of Dawn: Aiden Rose, sci-fi',
    'Lions and Rats: Gabe Roads, history',
    '2 -> romance',
    'Effect of the Void: Shay B, romance',
    'Losing Dreams: Gail Starr, sci-fi',
    'Name of Earth: Jo Bell, sci-fi',
    'Pilots of Stone: Brook Jay, history']);
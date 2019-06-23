solve = (arr) => {
    let result = {};

    arr.forEach(elem => {
        if (elem !== 'END') {
            let [country, name, points] = elem.split(' -> ');
            points = Number(points);
            if (!(country in result)) {
                result[country] = [{
                    'name': name,
                    'points': points
                }]
            }
            else if (result[country].find(x => x.name === name)) {
                let found = result[country].findIndex(x => x.name === name)
                result[country][found].points += points
            }
            else {
                result[country].push({
                    'name': name,
                    'points': points
                })
            }
        }
    })
    for (const key in result) {

        let sum = result[key].reduce((a, b) => a['points'] + b['points']);
        if (isNaN(sum)) {
            sum = sum['points']
        }
        result[key].push(sum)

    }
    Object.entries(result)
        .sort((a, b) => b[1][b[1].length - 1] - a[1][a[1].length - 1])
        .forEach(x => {
            console.log(x[0] + ': ' + x[1][x[1].length - 1])
            x[1].pop()
            x[1].forEach(e => {
                console.log(` -- ${e['name']} -> ${e['points']}`)
            })
        })
}


solve(['Bulgaria -> Ivan Ivanov -> 25',
    'Germany -> Otto Muller -> 4',
    'England -> John Addams -> 10',
    'Bulgaria -> Georgi Georgiev -> 18',
    'England -> Valteri Bottas -> 8',
    'Bulgaria -> Georgi Georgiev -> 6',
    'END'])
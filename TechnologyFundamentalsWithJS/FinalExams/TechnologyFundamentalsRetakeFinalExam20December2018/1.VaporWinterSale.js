function solve(input) {
    let games = [];
    let gamesWithDLC = [];
    let gamesWithoutDLC = [];

    let inputArr = input[0].split(', ');

    for (const string of inputArr) {
        let obj = {};

        if (!string.includes(':')) {
            let [name,price] = string.split('-')
            price = +price;
            if (!games.find(x => x.name === name)) {
                obj['name'] = name;
                obj['price']= price;
                games.push(obj);
            }
        }
        else {
            let [name,dlc] = string.split(':');
            let gameToAddDLC = games.find(e => e['name'] == name);
            if (gameToAddDLC) {
                gameToAddDLC['dlc'] = dlc;
                gameToAddDLC['price']= gameToAddDLC['price']+ (gameToAddDLC['price']*0.2)
            }
        }
    }
    
    for (const obj of games) {
        if (obj.hasOwnProperty('dlc')) {
            obj['price'] = obj['price']- (obj['price'] * 0.5);
            gamesWithDLC.push(obj);
        }
        else {
            obj['price'] = obj['price'] - (obj['price']*0.2);
            gamesWithoutDLC.push(obj);
        }
    }

    gamesWithDLC.sort((a,b) => a['price'] -b['price']);
    gamesWithoutDLC.sort((a,b) => b['price'] - a['price']);

    for (const obj of gamesWithDLC) {
        console.log(`${obj['name']} - ${obj['dlc']} - ${obj['price'].toFixed(2)}`);
    }
    for (const obj of gamesWithoutDLC) {
        console.log(`${obj['name']} - ${obj['price'].toFixed(2)}`);
  
        
    }
    

}
solve([ 'WitHer 3-50, FullLife 3-60, WitHer 3:Blood and Beer, Cyberfunk 2077-120, League of Leg Ends-10, League of Leg Ends:DoaT' ])
function solve(input) {
    let gameNames = input[0].split(' ');

    for (let i = 1; i < input.length; i++) {
        let currentGame = input[i].split(' ');
        let newGame = currentGame[1];
        let command = currentGame[0];

        if (command === 'Play!') {
            break;
        }
        if (command === 'Install') {
            let counter = 0;
            for (let i = 0; i < gameNames.length; i++) {
                if (gameNames[i] === newGame) { 
                    counter++;
                    break;
                }
            }
            if (counter === 0) {
                gameNames.push(newGame);
            }
        }
        else if(command === 'Uninstall'){
            for (let i = 0; i < gameNames.length; i++) {
                if (gameNames[i] === newGame) {
                    gameNames.splice(i,1);
                    break;
                }
            }
        }
        else if(command === 'Update'){
            for (let i = 0; i < gameNames.length; i++) {
                if (gameNames[i] === newGame) {
                    gameNames.splice(i,1);
                    gameNames.push(newGame);
                }
            }
        }
        else if (command === 'Expansion') {
            let expansion = newGame.split('-');
            let game = expansion[0];

            for (let i = 0; i < gameNames.length; i++) {
                if (gameNames[i] === game) {
                    let expandedGame = expansion.join(':');
                    gameNames.splice(i+1,0,expandedGame);
                    break;
                }
            }
        }
    }
    console.log(gameNames.join(' '));
    
}
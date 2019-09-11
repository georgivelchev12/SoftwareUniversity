solve = (arr) => {
    let frogs = arr.shift().split(' ');

    for (let arrElement of arr) {
        let [command, variableOne, variableTwo] = arrElement.split(' ');

        switch (command) {

            case 'Join':
                if(!frogs.includes(variableOne)){
                    frogs.push(variableOne);
                }
                break;
            case 'Jump':
                variableTwo = +variableTwo;
                if(variableTwo >= 0 && variableTwo <= frogs.length){
                    frogs.splice(variableTwo,0,variableOne);
                }
                break;
            case 'First':
                variableOne = +variableOne;
                let output = '';
                if(variableOne >=0 ){
                    if(variableOne > frogs.length){ //care
                        variableOne = frogs.length;
                    }
                    for (let i = 0; i < variableOne; i++) {
                        output += frogs[i] + ' ';
                    }
                    console.log(output);
                }
                break;
            case 'Dive':
                variableOne = +variableOne;
                if(variableOne >= 0 && variableOne <= frogs.length){ //CARE!
                    frogs.splice(variableOne,1);
                }
                break;
            case 'Last':
                variableOne = +variableOne;
                let output1 = '';
                if(variableOne >=0){
                    if(variableOne > frogs.length){ //care
                        variableOne = frogs.length;
                    }
                    for (let i = variableOne; i > 0; i--) {
                        output1 += frogs[frogs.length-i] + ' ';
                    }
                    console.log(output1);
                }
                break;
            case 'Print':
                if(variableOne =='Normal'){
                 console.log(`Frogs: ` + frogs.join(' '));
                }
                else if(variableOne == 'Reversed'){
                    console.log('Frogs: ' + frogs.reverse().join(' '))
                }
                break;
        }
    }
};
solve([ 'A B C D E F',
    'Join G',
    'Jump Q 3',
    'Last 3',
    'Dive 2',
    'Print Normal' ]

);
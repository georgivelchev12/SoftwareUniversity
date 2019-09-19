solve = (arr) => {
    let result = {};
    for (let line of arr) {
        let [command, value1, value2, value3] = line.split(':');
        if (command == 'Results') {
            let resultEntries =  Object.entries(result);
            console.log('People count: ' + resultEntries.length);
             resultEntries
             .sort((a,b) => b[1].health - a[1].health || a[0].localeCompare(b[0]))
             .map(e => console.log(`${e[0]} - ${e[1].health} - ${e[1].energy}`))
         
             
         
        }
        else {
            switch (command) {

                case 'Add':
                    value2 = +value2;
                    value3 = +value3;
                    if (!(value1 in result)) {
                        result[value1] = { 'health': value2, 'energy': value3 };
                    }
                    else {
                        result[value1].health += value2;
                    }
                    break;

                case 'Attack':
                    
                    if ((value1 in result) && (value2 in result)) {
                        result[value2].health -= value3;
                        result[value1].energy -= 1
                        if (result[value2].health <= 0) {
                            console.log(`${value2} was disqualified!`);
                            delete result[value2]
                            
                        }
                        if(result[value1].energy ==0){
                            console.log(`${value1} was disqualified!`);
                            delete result[value1]
                        }
                        

                    }
                    break;

                case 'Delete':
                    if(value1 == 'All'){
                        for (let member in result){
                            delete result[member];
                        } 
                    }
                    else{
                        if((value1 in result)){
                            delete result[value1];
                        }
                    }
                break;
            }

        }
    }


};
solve([ 'Add:Bonnie:3000:5',
'Add:Johny:4000:10',
'Delete:All',
'Add:Bonnie:3333:3',
'Results' ]
);
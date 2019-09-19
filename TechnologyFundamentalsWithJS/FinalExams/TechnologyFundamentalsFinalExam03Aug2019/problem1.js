solve = (arr) => {
    let str = arr.shift();

    for (let line of arr) {
        let [command, value1, value2] = line.split(' ');
       if(command == 'Done'){
           break;
       }
       else{
        switch (command) {
            case 'Change':
                let re = new RegExp(value1,'g');
                   str = str.replace(re,value2)
                   console.log(str);
                break;
            case 'Includes':
            if(str.includes(value1)){
                console.log('True')
            }
            else{
                console.log('False');
            }
                break;
            case 'End':
                if(str.split(" ").splice(-1) == value1){ 
                    console.log('True');     
                }
                else{
                    console.log('False');   
                }
                break;
            case 'Uppercase':
                str = str.toUpperCase();
                console.log(str);
                
                break;
            case 'FindIndex':
                console.log(str.indexOf(value1));   
                break;
            case 'Cut':
                str = str.split('');

                str = str.splice(value1,value2);
                console.log(str.join(''));
                

                break;
        }
       }
    }
    
};
solve(['//Th1s 1s my str1ng!//',
    'Change 1 i',
    'Includes string',
    'End my',
    'Uppercase',
    'FindIndex I',
    'Cut 5 5',
    'Done']);
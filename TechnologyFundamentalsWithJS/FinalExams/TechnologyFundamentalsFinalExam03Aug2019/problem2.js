solve = (arr) =>{
    let number = +arr.shift()
    let pattern = /([*@])(?<name>[A-Z][a-z]{2,})\1: (?<letters>(\[[A-Za-z]\]\|)+)/g;

    for (let i = 0; i < number; i++) {
        if((valid = pattern.exec(arr[i])) !== null){
            let name = valid.groups.name;
            let letters = valid.groups.letters
            .split(/[\[\]\|]/g)
            .join('')
            .split('').map(elem => {
                return elem.charCodeAt(0);
            });
            if(letters.length > 3){
                console.log('Valid message not found!');
            }
            else{
   
                console.log(name + ': '+ letters.join(' '));
            }
         
            
        }
        else{
            console.log('Valid message not found!');
            
        }
       
    }
    
};
solve([ '3',
'@Taggy@: [i]|[n]|[v]|[a]|[l]|[i]|[d]| this shouldn�t be valid',
'*tAGged*: [i][i][i]|',
'Should be invalid @Taggy@: [v]|[a]|[l]|[l]|[l]|' ]

);
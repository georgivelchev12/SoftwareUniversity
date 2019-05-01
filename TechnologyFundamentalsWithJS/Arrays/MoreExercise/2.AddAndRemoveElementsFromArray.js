function solve(arr) {
    let result = [];
    let output = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]=='add') {
            result[i] = i + 1;
        }
        else{
            result.pop();
        }
    }
    if (result.length <=0) {
        console.log('Empty');
        return;
    }
    for (let i = 0; i < result.length; i++) {
        if (result[i] === undefined || result[i] == '') {
            
        }
        else{
            output += result[i]+ " ";
            
        }
    }
    console.log(output);
    
}
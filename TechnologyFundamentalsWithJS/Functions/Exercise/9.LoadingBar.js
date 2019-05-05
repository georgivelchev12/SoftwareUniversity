function LoadingBar(number) {
    let firstNum = number/10;
    let holderfirstNum = firstNum;
    let max = 10;
    let min =1;
    let output = '';
    while (firstNum < max) {
        while (min <= holderfirstNum) {
            output += '%';
            min++;
        }
        if (min==11) {
            break;
        }
        
        firstNum++;
        output += '.';
    }
    if (number!=100) {
        console.log(`${number}% [${output}]`);
        console.log(`Still loading...`);
        
    }
    else {
        console.log(`${100}% Complete!`);
        console.log(`[${output}]`);
        
    }
}
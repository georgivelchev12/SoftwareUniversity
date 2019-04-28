function solve(str,useChar,result) {
    let modificatedString = str.replace('_',useChar);
    //let output = modificatedString === result ? 'Matched' : 'Not Matched';
    if (modificatedString === result) {
        console.log(`Matched`);
    }
    else {
        console.log(`Not Matched`);
    }
    
    
}
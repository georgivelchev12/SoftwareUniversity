function solve(arr) {
    let pattern = /([#$%*&])\w*\1=\d+!!.+\b/g;
    for (let element of arr) {
        let [name,line] = element.split('=');
        if (line == undefined) {
            console.log(`Nothing found!`);
            continue;
        }
        let indexOfExcMark = line.indexOf('!!');
        let geohashCode = line.substring(indexOfExcMark+2,line.length);
        let lengthOfGeohashCode = line.substring(0,indexOfExcMark);
        if (element.match(pattern)
        && lengthOfGeohashCode == geohashCode.length){
            name = name.substring(1,name.length-1);
            let coordinates = symbolIncrease(geohashCode);
            console.log(`Coordinates found! ${name} -> ${coordinates}`);
            break;
        }
        else {
            console.log('Nothing found!');
        }
    }
    function symbolIncrease(code) {
        let splitedCode = code.split('');
       let output = '';
        for (let i = 0; i < splitedCode.length; i++) {
            let currSymbolNum = splitedCode[i].charCodeAt(0) + splitedCode.length;
            let currSymbol = String.fromCharCode(currSymbolNum);
            output+=currSymbol;
        }
        return output;
    }
}
solve([ 'Ian6Hutchinson=7!!\\(58ycb4',
    '#MikeHailwood#!!\'gfzxgu6768=11',
    'slop%16!!plkdek/.8x11ddkc',
    '$Steve$=9Hhffjh',
    '*DavMolyneux*=15!!efgk#\'_$&UYV%h%',
    'RichardQ^uayle=16!!fr5de5kd' ]);

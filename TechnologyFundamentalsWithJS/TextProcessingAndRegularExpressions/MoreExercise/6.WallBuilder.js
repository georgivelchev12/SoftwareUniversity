function solve(input) {
    let separator = input.length / 3;
    let firstStagePattern = /\b[A-Z]{1,}[0-9]{4,}?([A-Z]{1,}[0-9]{4,})*\b/g;
    let secondStagePattern = /^[a-z]{3}[a-z#@$%]+[#@$%]$/gi;
    let thirdStagePattern = /\b0+([a-z]{0,5}[0])+\1+[a-z]{1,5}\b/g;
    for (let index in input) {
        index=+index
        if ((index + 1) / separator <= 1) {
            if (input[index].match(firstStagePattern)) {
                console.log('SOLID BASE!');
            } else {
                console.log('WEAK BASE!');
            }
        } else if ((index + 1) / separator <= 2) {
            if (input[index].match(secondStagePattern)) {
                console.log('SOLID MIDDLE!');
            } else {
                console.log('WEAK MIDDLE!');
            }
        } else if ((index + 1) / separator <= 3) {
            if (input[index].match(thirdStagePattern)) {
                console.log('SOLID TOP!');
            } else {
                console.log('WEAK TOP!');
            }
        }
    }
}
solve([
    'SO9000STRONG10WALL7000', 'YES345345345PLEASEHAHA999999',
    'xaXAxa###MiDDlE%%$##', 'mM%%%%ImRichGuy$$$$$',
    '00000cant0do000that', '0sorry00happy000saaaad'
]
);
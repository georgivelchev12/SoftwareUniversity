function solve(input) {
 
    let output = new Map();
    output.set("VIP", []);
    output.set("regular", [])
    let gestComming = false;
 
    for (let currentOperation of input) {
        if (currentOperation === 'PARTY') {
            gestComming = true;
        } else {
            if (gestComming === false) {
                if (48 <= currentOperation.charCodeAt(0) && currentOperation.charCodeAt(0) <= 57) {
                    output.get('VIP').push(currentOperation);
                } else {
                    output.get('regular').push(currentOperation);
                }
            } else {
                if (48 <= currentOperation.charCodeAt(0) && currentOperation.charCodeAt(0) <= 57) {
                    output.get('VIP').splice(output.get('VIP').indexOf(currentOperation), 1);
                } else {
                    output.get('regular').splice(output.get('regular').indexOf(currentOperation), 1);
                }
            }
        }
    }
    let sorted=output.get('VIP').concat(output.get('regular'));
 
    console.log(sorted.length);
    for (let guest of sorted){
        console.log(guest);
    }
}

solve(['7IK9Yo0h',
    '9NoBUajQ',
    'Ce8vwPmE',
    'SVQXQCbc',
    'tSzE5t0p',
    'PARTY',
    '9NoBUajQ',
    'Ce8vwPmE',
    'SVQXQCbc']);
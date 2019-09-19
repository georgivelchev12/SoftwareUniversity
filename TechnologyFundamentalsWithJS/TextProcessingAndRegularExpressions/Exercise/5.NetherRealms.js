correct = (arr) => {
    arr[0].split(/[, ]+/).sort().forEach(elem => {
        let name = elem.match(/[^, ]+/g).join('');
        let health = elem.match(/[^\+\-\*\/\.]/g) !== null ? elem.match(/[^0-9+\-\*\/\.]/g).map(elem => elem.charCodeAt()).reduce((a, b) => a + b) : 0;
        let multy = [];
        let dmg =0;

        let dmgRegex = /[+-]*[\d]+\.[\d]*|[-+]*[\d]+|[*/]/g
        elem.match(dmgRegex) !== null ? elem.match(dmgRegex).forEach((e, ind) => {
            if (e !== '*' && e !== '/') {
                dmg += Number(e)
            } else {
                multy.push(e)
            }
            if (ind === elem.match(dmgRegex).length - 1) {
                multy.forEach(el => el === '*' ? dmg *= 2 : dmg /= 2)
            }
        }) : void (0)
        console.log(`${name} - ${health} health, ${dmg.toFixed(2)} damage`)

    });
}
correct([ 'M3ph1st0**, Azazel' ]);

wrong = (arr) => {
    arr[0].split(', ').sort().forEach(elem => {

        let health = elem.match(/[^\-\*\/\.]/g) !== null ? elem.match(/[^0-9+\-\*\/\.]/g).map(elem => elem.charCodeAt()).reduce((a, b) => a + b) : 0;
        let multiplySign = elem.match(/\*/g) !== null ? elem.match(/\*/g).length * 2 : 0;
        let divideSign = elem.match(/\//g) !== null? elem.match(/\//g).length * 2 : 1;
        let damage = elem.match(/-?[0-9]+(\.[0-9]+)?/g) !== null ? 
        (elem.match(/-?[0-9]+(\.[0-9]+)?/g).map(Number).reduce((a, b) => a + b) * multiplySign) / divideSign : 0;

        console.log(`${elem} - ${health} health, ${damage.toFixed(2)} damage`)

    });
}
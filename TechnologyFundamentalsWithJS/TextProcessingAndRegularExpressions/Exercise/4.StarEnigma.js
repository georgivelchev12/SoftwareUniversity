starEnigma = (arr) => {
    arr.shift()

    let mainPattern = /[^m@\-!:>]*@(?<name>[A-Za-z]+)[^m@\-!:>]*:[0-9]+[^m@\-!:>]*!(?<attackType>[AD])![^m@\-!:>]*->[0-9]+[^m@\-!:>]*/g;
    let starPattern = /[star]/gi;

    let attackedPlanets = [];
    let destroyedPlanets = [];

    arr.forEach(elem => {
        let key = elem.match(starPattern) !== null ? elem.match(starPattern).length : 0;
        let decoded = elem.split('').map(e => String.fromCharCode(e.charCodeAt() - key)).join('')
        while ((valid = mainPattern.exec(decoded)) !== null) {
            let name = valid.groups.name;
            valid.groups.attackType === 'A' ? attackedPlanets.push(name) : destroyedPlanets.push(name);
        }
    })
    console.log(`Attacked planets: ${attackedPlanets.length}`);
    attackedPlanets.sort((a, b) => a.localeCompare(b)).forEach(e => console.log(`-> ${e}`))
    
    console.log(`Destroyed planets: ${destroyedPlanets.length}`);
    destroyedPlanets.sort((a, b) => a.localeCompare(b)).forEach(e => console.log(`-> ${e}`))
};
starEnigma(['2',
    'STCDoghudd4=63333$D$0A53333',
    'EHfsytsnhf?8555&I&2C9555SR']);